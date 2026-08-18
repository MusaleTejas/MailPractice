import Groq from 'groq-sdk';
import { EvaluationRequest, EvaluationResult } from '../types/index.js';
import { evaluateWithFallbackEngine } from './fallbackEvaluator.js';

// Retrieve all available Groq API keys for redundant failover
function getGroqApiKeys(): string[] {
  const keys: string[] = [];

  if (process.env.GROQ_API_KEYS) {
    const split = process.env.GROQ_API_KEYS.split(',').map((k) => k.trim()).filter(Boolean);
    keys.push(...split);
  }
  if (process.env.GROQ_API_KEY && !keys.includes(process.env.GROQ_API_KEY.trim())) {
    keys.unshift(process.env.GROQ_API_KEY.trim());
  }
  if (process.env.GROQ_API_KEY_BACKUP && !keys.includes(process.env.GROQ_API_KEY_BACKUP.trim())) {
    keys.push(process.env.GROQ_API_KEY_BACKUP.trim());
  }

  return keys.filter((k) => k && k !== 'YOUR_GROQ_API_KEY_HERE' && k !== 'YOUR_GROQ_API_KEY');
}

export async function evaluateEmailWithGroq(req: EvaluationRequest): Promise<EvaluationResult> {
  const apiKeys = getGroqApiKeys();

  if (apiKeys.length === 0) {
    console.log('[Groq Service] No valid GROQ_API_KEY found. Utilizing built-in expert evaluator engine.');
    return evaluateWithFallbackEngine(req);
  }

  const systemPrompt = `You are MailPractice's Senior Corporate Communication Coach & Executive Evaluator.
Your job is to objectively, rigorously, and constructively evaluate a user's professional email writing attempt.

CRITICAL GIBBERISH & ANTI-CHEAT RULES:
1. If the user submits keyboard mashing, repeated characters (e.g. 'asdf ;lkj', 'qwerty', 'aaaa'), random filler, or incoherent non-English text, YOU MUST STRICTLY assign an overall score of 0 to 10 out of 100. Set all breakdown dimensions (grammar, spelling, clarity, professionalism, requirementCompletion, businessJudgment) to 0-10. Flag a Major Mistake: "Incoherent Text: Keyboard mashing / random characters detected."
2. "Don't let AI write for you. Let AI teach you."
3. NEVER award free scores to empty, incomplete, or gibberish submissions.
4. RATED STAKEHOLDER MANAGEMENT:
   - Evaluate whether the user correctly entered the primary recipient in 'To' (Score 0-10).
   - Evaluate whether the user properly configured 'CC' for stakeholders who need operational visibility (Score 0-10).
   - Evaluate whether the user appropriately leveraged 'BCC' for confidential oversight, legal protection, or distribution privacy (Score 0-10).
   - Evaluate the Subject Line for action-orientation, specificity, and searchable tags (Score 0-10).
5. Evaluate Business Judgment & Decision-Making (0-100): diplomacy, avoiding unconstructive blaming, data justification, ROI framing, and deadline clarity.
6. Return ONLY a valid JSON object conforming exactly to the specified structure. No markdown wrappers or preamble.`;

  const userPrompt = `EVALUATE THIS WRITING PRACTICE ATTEMPT:

--- SCENARIO CONTEXT ---
Title: ${req.scenario.title}
Category: ${req.scenario.category}
Difficulty: ${req.scenario.difficulty}
Target Primary Recipient (To): ${req.scenario.recipient} (${req.scenario.recipientEmail || ''})
Target CC (Visibility): ${req.scenario.targetCc || 'Optional / Team visibility'}
Target BCC (Confidential Oversight): ${req.scenario.targetBcc || 'Optional / Legal / Executive oversight'}
Objective: ${req.scenario.objective}
Context & Backstory: ${req.scenario.context}
Requirements to Address:
${req.scenario.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

--- USER SUBMISSION ---
Time Spent: ${req.timeSpentSeconds} seconds
Writing Speed (WPM): ${req.wpm}
User Entered To Field: "${req.toField || ''}"
User Entered CC Field: "${req.ccField || ''}"
User Entered BCC Field: "${req.bccField || ''}"
Subject Line: "${req.subject}"

Email Body:
"""
${req.body}
"""

--- REQUIRED JSON OUTPUT FORMAT ---
{
  "overallScore": number (0-100),
  "breakdown": {
    "grammar": number (0-100),
    "spelling": number (0-100),
    "clarity": number (0-100),
    "professionalism": number (0-100),
    "structure": number (0-100),
    "vocabulary": number (0-100),
    "requirementCompletion": number (0-100),
    "conciseness": number (0-100),
    "businessJudgment": number (0-100)
  },
  "stakeholderEvaluation": {
    "toScore": number (0-10),
    "ccScore": number (0-10),
    "bccScore": number (0-10),
    "subjectScore": number (0-10),
    "totalRoutingScore": number (0-40),
    "feedback": "Analysis of recipient routing accuracy and stakeholder etiquette",
    "targetToAdvice": "Feedback on whether the right person was targeted in To",
    "targetCcAdvice": "Feedback on CC visibility selection",
    "targetBccAdvice": "Feedback on BCC confidential oversight usage"
  },
  "mistakes": [
    {
      "original": "exact text from user email with error",
      "correction": "corrected version",
      "explanation": "clear rule or grammatical reasoning",
      "severity": "Minor" | "Medium" | "Major",
      "type": "Grammar" | "Spelling" | "Tone" | "Vocabulary" | "Structure" | "Clarity"
    }
  ],
  "requirementChecks": [
    {
      "requirement": "Requirement text",
      "met": boolean,
      "explanation": "how it was addressed or why it was missed",
      "matchedSnippet": "relevant quote or snippet from user email if met"
    }
  ],
  "completionPercentage": number (0-100),
  "tone": {
    "primary": "Professional" | "Formal" | "Friendly" | "Informal" | "Confident" | "Passive" | "Aggressive",
    "secondary": ["string"],
    "confidence": number (0-100),
    "explanation": "analysis of tone and emotional resonance",
    "suggestions": ["specific tips to calibrate tone"]
  },
  "vocabulary": [
    {
      "original": "weak or informal word",
      "suggested": "strong professional alternative",
      "reason": "why this improves business impact",
      "type": "weak" | "informal" | "repetitive"
    }
  ],
  "improvedVersion": {
    "subject": "Polished, compelling subject line",
    "body": "Expertly rewritten email keeping user intent intact while demonstrating ideal structure, tone, and conciseness",
    "whatChanged": [
      "Itemized key improvement 1",
      "Itemized key improvement 2",
      "Itemized key improvement 3"
    ]
  },
  "actionableTakeaways": [
    "Personalized actionable rule 1 for user's next practice",
    "Personalized actionable rule 2",
    "Personalized actionable rule 3"
  ]
}`;

  const modelsToTry = [
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-20b',
    'groq/compound',
    'groq/compound-mini'
  ];

  // Try each API key in order (Primary -> Backup)
  for (let keyIdx = 0; keyIdx < apiKeys.length; keyIdx++) {
    const key = apiKeys[keyIdx];
    const keyLabel = keyIdx === 0 ? 'Primary Key' : `Backup Key #${keyIdx}`;

    try {
      const groq = new Groq({ apiKey: key });

      for (const modelName of modelsToTry) {
        try {
          console.log(`[Groq Service] Attempting evaluation using ${keyLabel} with model: ${modelName}`);

          const completion = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            model: modelName,
            temperature: 0.2,
            response_format: { type: 'json_object' }
          });

          const rawResponse = completion.choices[0]?.message?.content;
          if (rawResponse) {
            const parsed = JSON.parse(rawResponse);
            console.log(`[Groq Service] Evaluation succeeded using ${keyLabel} (${modelName})`);
            return {
              ...parsed,
              evaluationSource: 'groq-ai'
            };
          }
        } catch (modelErr: any) {
          console.warn(`[Groq Service] Model ${modelName} on ${keyLabel} failed:`, modelErr?.message || modelErr);
        }
      }
    } catch (keyErr: any) {
      console.warn(`[Groq Service] ${keyLabel} failed, switching to next key...`, keyErr?.message || keyErr);
    }
  }

  console.log('[Groq Service] All Groq API keys and models exhausted. Activating expert fallback engine.');
  return evaluateWithFallbackEngine(req);
}

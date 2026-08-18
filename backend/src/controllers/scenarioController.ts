import { Request, Response } from 'express';
import Groq from 'groq-sdk';
import { PracticeScenario } from '../types/index.js';

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

// Generate realistic mock names & personas for local fallback
function generateRichLocalScenario(topic: string, category: string, difficulty: string): PracticeScenario {
  const isSchool = category === 'Academic & School' || /school|teacher|principal|exam|college|university|leave for school/i.test(topic);
  const isHR = category === 'Leave Request' || category === 'Resignation & HR' || /leave|resignation|sick|vacation/i.test(topic);

  let recipientName = 'Vikram Malhotra';
  let recipientRole = 'Director of Product Operations';
  let recipientEmail = 'vikram.malhotra@techscale.io';
  let recipientExpectations = 'Values concise bottom-line upfront (BLUF) formatting and data-backed rationale.';
  let senderRole = 'Senior Project Lead';
  let targetCc = 'operations-leads@techscale.io';
  let ccContext = 'Keep cross-functional delivery team synchronized.';
  let targetBcc = 'dept-oversight@techscale.io';
  let bccContext = 'Confidential departmental leadership record.';

  if (isSchool) {
    recipientName = 'Dr. Meenakshi Sundaram';
    recipientRole = 'Dean of Academic Affairs & Program Director';
    recipientEmail = 'meenakshi.sundaram@stmarys-edu.org';
    recipientExpectations = 'Requires explicit formal etiquette, official roll number, exact date ranges, and verified reason.';
    senderRole = 'Postgraduate Student / Research Scholar';
    targetCc = 'academics-records@stmarys-edu.org';
    ccContext = 'Academic attendance desk.';
    targetBcc = 'faculty-advisor@stmarys-edu.org';
    bccContext = 'Advisor confidential copy.';
  } else if (isHR) {
    recipientName = 'Priya Sharma';
    recipientRole = 'Engineering Manager & Team Lead';
    recipientEmail = 'priya.sharma@cloudforge.tech';
    recipientExpectations = 'Needs immediate task coverage details, emergency reachability, and sprint milestone reassurance.';
    senderRole = 'Software Engineer / Analyst';
    targetCc = 'hr-attendance@cloudforge.tech';
    ccContext = 'Sync HR leave management tracker.';
    targetBcc = 'dept-head@cloudforge.tech';
    bccContext = 'Management record.';
  }

  const cleanTopic = topic && topic.trim().length > 3 ? topic.trim() : 'Quarterly Priority Alignment & Resource Planning';

  return {
    id: `custom-${Date.now()}`,
    title: `${cleanTopic}`,
    category: (category as any) || 'Business Communication',
    difficulty: (difficulty as any) || 'Intermediate',
    senderName: 'Alex Morgan',
    senderEmail: 'alex.morgan@workspace.com (You)',
    senderRole,
    recipient: recipientName,
    recipientEmail,
    recipientRole,
    recipientExpectations,
    targetCc: difficulty === 'Advanced' || difficulty === 'Expert' ? targetCc : undefined,
    ccContext: difficulty === 'Advanced' || difficulty === 'Expert' ? ccContext : undefined,
    targetBcc: difficulty === 'Expert' ? targetBcc : undefined,
    bccContext: difficulty === 'Expert' ? bccContext : undefined,
    objective: `Communicate regarding "${cleanTopic}" with clear context, timeline accountability, and diplomatic poise.`,
    context: `You are reaching out to ${recipientName} (${recipientRole}) concerning "${cleanTopic}". This matter requires immediate alignment because upcoming delivery deadlines and organizational priorities depend directly on a clear resolution. You need to establish the background context, outline specific requirements, explain operational impact, and propose a seamless path forward without creating administrative friction.`,
    backstoryDetails: {
      triggerEvent: `Immediate requirement arose regarding "${cleanTopic}".`,
      stakes: 'Ensuring seamless workplace continuity, maintaining executive trust, and preventing schedule slippage.',
      keyPointsToCover: [
        'Clear, professional opening with specific context',
        'Specific dates, deliverables, or arrangements',
        'Mitigation strategy and coverage of pending commitments',
        'Courteous closing offering follow-up availability'
      ]
    },
    requirements: [
      `Address the email directly to ${recipientName} (${recipientEmail})`,
      'State the exact reason and timeline in the opening paragraph',
      'Detail the coverage plan or specific supporting arguments',
      'Provide contact reachability and request formal acknowledgment'
    ],
    timeLimitMinutes: difficulty === 'Advanced' ? 8 : difficulty === 'Expert' ? 7 : 10,
    tips: [
      'Write a specific, action-oriented subject line rather than a generic heading',
      'Address stakeholder expectations outlined in the profile pane'
    ]
  };
}

export async function handleGenerateScenario(req: Request, res: Response): Promise<void> {
  const { topic, difficulty = 'Intermediate', category = 'Business Communication' } = req.body;
  const apiKeys = getGroqApiKeys();

  if (apiKeys.length === 0) {
    const localScenario = generateRichLocalScenario(topic, category, difficulty);
    res.json(localScenario);
    return;
  }

  const prompt = `You are MailPractice's Expert Workplace Scenario Architect.
Generate a highly realistic, in-depth professional email writing scenario for:
- Category: "${category}"
- Difficulty: "${difficulty}"
- Specific Topic / User Prompt: "${topic || 'Executive Project Coordination'}"

CRITICAL INSTRUCTIONS:
1. Provide REALISTIC human names, real-sounding company/school email addresses, and detailed executive titles (NEVER use generic placeholders like 'Direct Supervisor' or 'John Doe').
2. Create a rich, 3-4 sentence workplace/academic backstory detailing the trigger event, stakes, and operational nuance.
3. If difficulty is Advanced or Expert, provide targetCc and targetBcc with realistic contexts.
4. Output STRICTLY a JSON object matching this schema without markdown wrappers:

{
  "title": "Clear descriptive title",
  "category": "${category}",
  "difficulty": "${difficulty}",
  "senderName": "Alex Morgan",
  "senderEmail": "alex.morgan@corpdomain.com (You)",
  "senderRole": "Professional role matching context",
  "recipient": "Specific Realistic Name (e.g. Vikram Malhotra / Dr. Elena Rostova)",
  "recipientEmail": "realistic.email@domain.com",
  "recipientRole": "Specific corporate/academic title",
  "recipientExpectations": "What this specific person cares about (e.g. Data justification, zero drama, specific timelines)",
  "targetCc": "optional-stakeholder@domain.com",
  "ccContext": "Reason why CC is needed",
  "targetBcc": "optional-confidential@domain.com",
  "bccContext": "Reason why BCC is needed",
  "objective": "Concise 1-sentence strategic objective",
  "context": "Rich, multi-sentence real-world workplace backstory explaining why this email must be sent and what is at stake.",
  "backstoryDetails": {
    "triggerEvent": "Specific catalyst event",
    "stakes": "Financial, operational, or relational stakes",
    "keyPointsToCover": ["Point 1", "Point 2", "Point 3"]
  },
  "requirements": [
    "Requirement 1",
    "Requirement 2",
    "Requirement 3",
    "Requirement 4"
  ],
  "timeLimitMinutes": ${difficulty === 'Advanced' ? 8 : difficulty === 'Expert' ? 7 : 10},
  "tips": [
    "Actionable tip 1 for this scenario",
    "Actionable tip 2"
  ]
}`;

  const modelsToTry = [
    'qwen/qwen3.6-27b',
    'openai/gpt-oss-20b',
    'groq/compound',
    'groq/compound-mini'
  ];

  for (let keyIdx = 0; keyIdx < apiKeys.length; keyIdx++) {
    const key = apiKeys[keyIdx];
    try {
      const groq = new Groq({ apiKey: key });

      for (const model of modelsToTry) {
        try {
          const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model,
            temperature: 0.7,
            response_format: { type: 'json_object' }
          });

          const raw = completion.choices[0]?.message?.content;
          if (raw) {
            const parsed = JSON.parse(raw);
            res.json({
              id: `generated-${Date.now()}`,
              ...parsed
            });
            return;
          }
        } catch (err: any) {
          console.warn(`[Scenario Generator] Model ${model} on Key ${keyIdx} failed:`, err?.message || err);
        }
      }
    } catch (keyErr) {
      console.warn(`[Scenario Generator] Key ${keyIdx} failed:`, keyErr);
    }
  }

  // Fallback to rich scenario template if Groq is unavailable
  console.log('[Scenario Generator] Generating rich local scenario template.');
  const richFallback = generateRichLocalScenario(topic, category, difficulty);
  res.json(richFallback);
}

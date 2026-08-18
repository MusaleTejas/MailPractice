import { EvaluationRequest, EvaluationResult, Mistake, RequirementCheck, VocabularySuggestion } from '../types/index.js';

// Common English dictionary words to validate authenticity
const COMMON_ENGLISH_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he',
  'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
  'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
  'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
  'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day',
  'most', 'us', 'dear', 'hi', 'hello', 'regards', 'sincerely', 'thank', 'thanks', 'email', 'writing', 'inform',
  'please', 'attached', 'update', 'project', 'team', 'meeting', 'issue', 'request', 'schedule', 'review',
  'report', 'data', 'client', 'service', 'system', 'support', 'manager', 'lead', 'deadline', 'plan', 'time',
  'date', 'delay', 'status', 'confirm', 'help', 'question', 'feedback', 'budget', 'hardware', 'leave', 'work',
  'problem', 'solution', 'action', 'need', 'require', 'provide', 'send', 'share', 'regarding', 'discuss'
]);

// Checks whether a string is legitimate English or gibberish
function analyzeTextAuthenticity(text: string): {
  isGibberish: boolean;
  validWordRatio: number;
  repetitionRatio: number;
  vowelRatio: number;
  reason: string;
} {
  const cleanTokens = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 0);

  if (cleanTokens.length === 0) {
    return { isGibberish: true, validWordRatio: 0, repetitionRatio: 0, vowelRatio: 0, reason: 'Empty submission' };
  }

  // 1. Check known word ratio
  let validWordCount = 0;
  for (const token of cleanTokens) {
    if (COMMON_ENGLISH_WORDS.has(token) || (token.length >= 3 && /[aeiouy]/.test(token) && !/^(asdf|lkj|qwerty|zxcv|aaaa|bbbb|cccc|dddd|ffff)/.test(token))) {
      validWordCount++;
    }
  }
  const validWordRatio = validWordCount / cleanTokens.length;

  // 2. Check repetition ratio (e.g. repeated "asdf asdf asdf")
  const uniqueTokens = new Set(cleanTokens);
  const repetitionRatio = 1 - (uniqueTokens.size / cleanTokens.length);

  // 3. Check vowel density across the text
  const alphaChars = text.replace(/[^a-zA-Z]/g, '');
  const vowels = text.match(/[aeiouAEIOU]/g) || [];
  const vowelRatio = alphaChars.length > 0 ? vowels.length / alphaChars.length : 0;

  // 4. Keyboard mashing / noise signature
  const mashPattern = /(asdf|;lkj|lkj|qwerty|zxcvbn|qwer|asdfg|hjkl|poiuy|1234|aaaaa|sssss|ddddd|fffff)/i;
  const hasMash = mashPattern.test(text);

  let isGibberish = false;
  let reason = '';

  if (hasMash && validWordRatio < 0.5) {
    isGibberish = true;
    reason = 'Keyboard mashing and random key sequences detected (e.g., "asdf", ";lkj").';
  } else if (validWordRatio < 0.35) {
    isGibberish = true;
    reason = 'Text lacks recognizable English words and vocabulary structure.';
  } else if (cleanTokens.length > 8 && repetitionRatio > 0.65) {
    isGibberish = true;
    reason = 'Excessive repeated filler text detected.';
  } else if (vowelRatio < 0.15 || vowelRatio > 0.75) {
    isGibberish = true;
    reason = 'Unnatural character distribution without valid syllable structure.';
  }

  return { isGibberish, validWordRatio, repetitionRatio, vowelRatio, reason };
}

export function evaluateWithFallbackEngine(req: EvaluationRequest): EvaluationResult {
  const { scenario, toField, ccField, bccField, subject, body } = req;
  const fullText = `${subject}\n${body}`;
  const lowerBody = body.toLowerCase();
  const lowerSubject = subject.toLowerCase();

  // Run Gibberish & Authenticity Detection
  const auth = analyzeTextAuthenticity(body);

  if (auth.isGibberish) {
    const failedChecks: RequirementCheck[] = scenario.requirements.map((r) => ({
      requirement: r,
      met: false,
      explanation: 'Unsatisfied: The submission contains incoherent or random text.',
      matchedSnippet: undefined
    }));

    return {
      overallScore: 5,
      breakdown: {
        grammar: 5,
        spelling: 0,
        clarity: 5,
        professionalism: 0,
        structure: 5,
        vocabulary: 5,
        requirementCompletion: 0,
        conciseness: 10,
        businessJudgment: 0
      },
      stakeholderEvaluation: {
        toScore: toField && toField.trim().length > 3 ? 5 : 0,
        ccScore: 0,
        bccScore: 0,
        subjectScore: subject && subject.trim().length > 5 ? 5 : 0,
        totalRoutingScore: (toField && toField.trim().length > 3 ? 5 : 0) + (subject && subject.trim().length > 5 ? 5 : 0),
        feedback: 'Incoherent email body prevents message delivery and evaluation.',
        targetToAdvice: `Expected recipient: ${scenario.recipient} (${scenario.recipientEmail})`,
        targetCcAdvice: scenario.targetCc ? `Required Cc: ${scenario.targetCc}` : 'No Cc required',
        targetBccAdvice: scenario.targetBcc ? `Required Bcc: ${scenario.targetBcc}` : 'No Bcc required'
      },
      mistakes: [
        {
          original: body.slice(0, 80) + (body.length > 80 ? '...' : ''),
          correction: 'Write coherent English sentences addressing the scenario objective.',
          explanation: `Incoherent Text Detected: ${auth.reason}`,
          severity: 'Major',
          type: 'Clarity'
        }
      ],
      requirementChecks: failedChecks,
      completionPercentage: 0,
      tone: {
        primary: 'Informal',
        secondary: ['Incoherent', 'Unstructured'],
        confidence: 99,
        explanation: 'The submitted draft contains keyboard mashing or random filler characters without recognizable sentence structure.',
        suggestions: [
          'Write complete sentences following the standard Subject → Greeting → Body → Sign-off structure.',
          'Address the specific requirements outlined in the left pane.'
        ]
      },
      vocabulary: [
        {
          original: 'asdf / gibberish',
          suggested: 'Clear professional vocabulary',
          reason: 'Workplace emails require coherent communication',
          type: 'weak'
        }
      ],
      improvedVersion: {
        subject: `Update: ${scenario.objective}`,
        body: `Dear ${scenario.recipient},\n\nI am writing regarding ${scenario.objective.toLowerCase()}.\n\n• ${scenario.requirements.join('\n• ')}\n\nBest regards,\n[Your Name]`,
        whatChanged: [
          'Replaced random input with a structured professional draft',
          'Added proper recipient salutation and sign-off',
          'Covered all core scenario requirements'
        ]
      },
      actionableTakeaways: [
        'Type authentic sentences in English to receive accurate grammar, tone, and WPM scoring.',
        'Follow the 5-part email structure: Subject, Greeting, Background, Request, Closing.'
      ],
      evaluationSource: 'fallback-engine'
    };
  }

  // Normal Content Evaluation
  const mistakes: Mistake[] = [];
  const vocabSuggestions: VocabularySuggestion[] = [];
  const requirementChecks: RequirementCheck[] = [];

  // Common grammar / spelling patterns
  const commonErrors: Array<{
    regex: RegExp;
    correction: string;
    explanation: string;
    severity: 'Minor' | 'Medium' | 'Major';
    type: 'Grammar' | 'Spelling' | 'Tone' | 'Vocabulary' | 'Clarity' | 'Structure';
  }> = [
    {
      regex: /\b(the report are|the email are|the data are|the team are|he have|she have)\b/gi,
      correction: 'Use singular verb agreement (e.g., "the report is" / "he has")',
      explanation: 'Subject-verb agreement error: singular subjects require singular verbs.',
      severity: 'Major',
      type: 'Grammar'
    },
    {
      regex: /\b(i am writing this email for inform|writing to informing)\b/gi,
      correction: 'I am writing to inform you...',
      explanation: 'Infinitive construction after "writing" should be "to + base verb".',
      severity: 'Medium',
      type: 'Grammar'
    },
    {
      regex: /\b(revert back)\b/gi,
      correction: 'reply / respond',
      explanation: '"Revert back" is redundant; prefer "reply" or "respond".',
      severity: 'Minor',
      type: 'Vocabulary'
    },
    {
      regex: /\b(thx|plz|u|r|gonna|wanna|ur)\b/gi,
      correction: 'Please spell out full words (thanks, please, you, are, going to)',
      explanation: 'Texting shorthand and informal slang detracts from professional workplace credibility.',
      severity: 'Major',
      type: 'Spelling'
    },
    {
      regex: /\b(teh|recieve|seperate|definately|occured|untill|truely)\b/gi,
      correction: 'the / receive / separate / definitely / occurred / until / truly',
      explanation: 'Common workplace typographical/spelling error.',
      severity: 'Medium',
      type: 'Spelling'
    }
  ];

  for (const item of commonErrors) {
    const match = fullText.match(item.regex);
    if (match) {
      mistakes.push({
        original: match[0],
        correction: item.correction,
        explanation: item.explanation,
        severity: item.severity,
        type: item.type as any
      });
    }
  }

  // Requirement keyword matching
  let metCount = 0;
  for (const reqText of scenario.requirements) {
    const keywords = reqText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 4);
    const matched = keywords.some((kw) => lowerBody.includes(kw) || lowerSubject.includes(kw));

    if (matched) {
      metCount++;
      requirementChecks.push({
        requirement: reqText,
        met: true,
        explanation: 'Addressed in the draft.',
        matchedSnippet: body.slice(0, 60) + '...'
      });
    } else {
      requirementChecks.push({
        requirement: reqText,
        met: false,
        explanation: 'Not clearly addressed. Consider stating this requirement directly.'
      });
    }
  }

  const completionPercentage = Math.round((metCount / Math.max(1, scenario.requirements.length)) * 100);

  // Subject line quality check
  if (!subject.trim()) {
    mistakes.push({
      original: '[Empty Subject Line]',
      correction: `Clear action-oriented subject (e.g., "${scenario.objective}")`,
      explanation: 'Every professional email requires a concise, searchable subject line.',
      severity: 'Major',
      type: 'Structure'
    });
  }

  const hasGreeting = /^(dear|hi|hello|good morning|good afternoon|greetings|to\s)/i.test(body.trim());
  const hasSignOff = /(sincerely|best regards|regards|thank you|thanks|warm regards|cheers|yours truly)/i.test(body);

  if (!hasGreeting) {
    mistakes.push({
      original: '[Missing Greeting]',
      correction: `Dear ${scenario.recipient}, / Hi ${scenario.recipient.split(' ')[0]},`,
      explanation: 'Always open with an appropriate professional salutation.',
      severity: 'Medium',
      type: 'Structure'
    });
  }

  if (!hasSignOff) {
    mistakes.push({
      original: '[Missing Sign-off]',
      correction: 'Best regards,\n[Your Name]',
      explanation: 'Always conclude with a courteous sign-off and your name/signature.',
      severity: 'Medium',
      type: 'Structure'
    });
  }

  // Determine Tone
  let primaryTone: 'Professional' | 'Formal' | 'Friendly' | 'Informal' | 'Confident' | 'Passive' | 'Aggressive' = 'Professional';
  if (lowerBody.includes('sorry') && lowerBody.includes('if that is okay')) {
    primaryTone = 'Passive';
  } else if (lowerBody.includes('sincerely') || lowerBody.includes('hereby')) {
    primaryTone = 'Formal';
  } else if (lowerBody.includes('i look forward') || lowerBody.includes('confident') || lowerBody.includes('ensure')) {
    primaryTone = 'Confident';
  }

  // Stakeholder Routing Score
  const toScore = toField && (toField.toLowerCase().includes(scenario.recipient.toLowerCase().split(' ')[0]) || toField.includes('@')) ? 10 : toField?.trim() ? 6 : 2;
  const ccScore = scenario.targetCc ? (ccField && ccField.trim().length > 3 ? 10 : 3) : 10;
  const bccScore = scenario.targetBcc ? (bccField && bccField.trim().length > 3 ? 10 : 3) : 10;
  const subjectScore = subject.trim().length > 8 ? 10 : subject.trim().length > 0 ? 5 : 0;
  const totalRoutingScore = toScore + ccScore + bccScore + subjectScore;

  // Score computation
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const lengthPenalty = wordCount < 30 ? 30 : wordCount < 60 ? 15 : 0;

  const grammarScore = Math.max(20, Math.min(100, 95 - mistakes.filter((m) => m.type === 'Grammar').length * 15));
  const spellingScore = Math.max(20, Math.min(100, 98 - mistakes.filter((m) => m.type === 'Spelling').length * 15));
  const structureScore = Math.max(20, Math.min(100, (hasGreeting ? 50 : 20) + (hasSignOff ? 50 : 25)));
  const reqScore = completionPercentage;
  const clarityScore = Math.max(20, Math.min(95, 90 - lengthPenalty));
  const profScore = Math.max(20, Math.min(96, (primaryTone === 'Professional' || primaryTone === 'Confident' ? 90 : 75) - (mistakes.length * 5)));
  const vocabScore = Math.max(30, Math.min(95, 88 - vocabSuggestions.length * 5));
  const concisenessScore = wordCount > 300 ? 65 : wordCount > 40 ? 90 : 60;
  const businessJudgment = Math.round((reqScore * 0.5) + (totalRoutingScore / 40 * 30) + (profScore * 0.2));

  const overallScore = Math.round(
    grammarScore * 0.15 +
    spellingScore * 0.1 +
    structureScore * 0.15 +
    reqScore * 0.3 +
    clarityScore * 0.15 +
    profScore * 0.15
  );

  return {
    overallScore: Math.min(98, Math.max(10, overallScore)),
    breakdown: {
      grammar: grammarScore,
      spelling: spellingScore,
      clarity: clarityScore,
      professionalism: profScore,
      structure: structureScore,
      vocabulary: vocabScore,
      requirementCompletion: reqScore,
      conciseness: concisenessScore,
      businessJudgment
    },
    stakeholderEvaluation: {
      toScore,
      ccScore,
      bccScore,
      subjectScore,
      totalRoutingScore,
      feedback: `Recipient routing scored ${totalRoutingScore}/40 based on To/Cc/Bcc accuracy.`,
      targetToAdvice: `Target: ${scenario.recipient} (${scenario.recipientEmail})`,
      targetCcAdvice: scenario.targetCc ? `Target Cc: ${scenario.targetCc}` : 'No Cc required',
      targetBccAdvice: scenario.targetBcc ? `Target Bcc: ${scenario.targetBcc}` : 'No Bcc required'
    },
    mistakes,
    requirementChecks,
    completionPercentage,
    tone: {
      primary: primaryTone,
      secondary: ['Structured', 'Direct'],
      confidence: 88,
      explanation: `Your draft exhibits a ${primaryTone.toLowerCase()} tone.`,
      suggestions: [
        'Maintain a balanced greeting and formal closing.',
        'Group key action items with bullet points for effortless skimming.'
      ]
    },
    vocabulary: vocabSuggestions.length > 0 ? vocabSuggestions : [
      { original: 'let me know', suggested: 'please keep me informed / kindly advise', reason: 'Elevates corporate polish', type: 'weak' }
    ],
    improvedVersion: {
      subject: subject.trim() ? subject : `Update: ${scenario.objective}`,
      body: `Dear ${scenario.recipient},\n\nI hope this email finds you well.\n\nI am writing regarding ${scenario.objective.toLowerCase()}.\n\n• ${scenario.requirements.join('\n• ')}\n\nBest regards,\n[Your Name]`,
      whatChanged: [
        'Enhanced subject line clarity',
        'Structured clear greeting and executive sign-off',
        'Directly addressed every scenario requirement'
      ]
    },
    actionableTakeaways: [
      'Always start with a clear, concise context sentence explaining the purpose.',
      'Check off each scenario requirement explicitly before hitting send.'
    ],
    evaluationSource: 'fallback-engine'
  };
}

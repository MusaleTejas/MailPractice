export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';

export type EmailCategory =
  | 'Business Communication'
  | 'Job Application'
  | 'Internship'
  | 'Client Communication'
  | 'Complaint Email'
  | 'Apology Email'
  | 'Meeting Request'
  | 'Leave Request'
  | 'Project Update'
  | 'Resignation & HR'
  | 'Academic & School'
  | 'Personal & Informal'
  | 'Customer Support'
  | 'Technical Communication';

export interface ScenarioRequirement {
  id: string;
  text: string;
}

export interface PracticeScenario {
  id: string;
  title: string;
  category: EmailCategory;
  difficulty: DifficultyLevel;
  senderEmail?: string;
  senderName?: string;
  senderRole?: string;
  recipient: string;
  recipientEmail?: string;
  recipientRole?: string;
  targetCc?: string;
  targetBcc?: string;
  objective: string;
  context: string;
  requirements: string[];
  timeLimitMinutes: number;
  tips?: string[];
}

export interface Mistake {
  original: string;
  correction: string;
  explanation: string;
  severity: 'Minor' | 'Medium' | 'Major';
  type: 'Grammar' | 'Spelling' | 'Tone' | 'Vocabulary' | 'Structure' | 'Clarity';
}

export interface RequirementCheck {
  requirement: string;
  met: boolean;
  explanation: string;
  matchedSnippet?: string;
}

export interface ScoreBreakdown {
  grammar: number;
  spelling: number;
  clarity: number;
  professionalism: number;
  structure: number;
  vocabulary: number;
  requirementCompletion: number;
  conciseness: number;
  businessJudgment?: number;
  stakeholderRouting?: {
    toScore: number; // 0-10
    ccScore: number; // 0-10
    bccScore: number; // 0-10
    subjectScore: number; // 0-10
    feedback: string;
  };
}

export interface VocabularySuggestion {
  original: string;
  suggested: string;
  reason: string;
  type: 'weak' | 'informal' | 'repetitive';
}

export interface EvaluationResult {
  overallScore: number;
  breakdown: ScoreBreakdown;
  stakeholderEvaluation?: {
    toScore: number; // /10
    ccScore: number; // /10
    bccScore: number; // /10
    subjectScore: number; // /10
    totalRoutingScore: number; // /40
    feedback: string;
    targetToAdvice: string;
    targetCcAdvice: string;
    targetBccAdvice: string;
  };
  mistakes: Mistake[];
  requirementChecks: RequirementCheck[];
  completionPercentage: number;
  tone: {
    primary: 'Professional' | 'Formal' | 'Friendly' | 'Informal' | 'Confident' | 'Passive' | 'Aggressive';
    secondary: string[];
    confidence: number;
    explanation: string;
    suggestions: string[];
  };
  vocabulary: VocabularySuggestion[];
  improvedVersion: {
    subject: string;
    body: string;
    whatChanged: string[];
  };
  actionableTakeaways: string[];
  evaluationSource: 'groq-ai' | 'fallback-engine';
}

export interface EvaluationRequest {
  scenario: PracticeScenario;
  toField?: string;
  ccField?: string;
  bccField?: string;
  subject: string;
  body: string;
  timeSpentSeconds: number;
  wpm: number;
}

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
  | 'Follow-Up Email'
  | 'Customer Support'
  | 'Technical Communication'
  | 'Sales Communication'
  | 'Academic Communication'
  | 'Resignation & HR'
  | 'Academic & School'
  | 'Personal & Informal';

export interface PracticeScenario {
  id: string;
  title: string;
  category: EmailCategory;
  difficulty: DifficultyLevel;
  senderEmail: string;
  senderName: string;
  senderRole: string;
  recipient: string;
  recipientEmail: string;
  recipientRole?: string;
  recipientExpectations?: string;
  targetCc?: string;
  targetCcRole?: string;
  ccContext?: string;
  targetBcc?: string;
  targetBccRole?: string;
  bccContext?: string;
  ccDefault?: string;
  objective: string;
  context: string;
  backstoryDetails?: {
    triggerEvent: string;
    stakes: string;
    keyPointsToCover: string[];
  };
  requirements: string[];
  timeLimitMinutes: number;
  tips?: string[];
  sampleAnswer?: {
    subject: string;
    body: string;
    whyItWorks: string;
  };
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
    toScore: number; // 0-10
    ccScore: number; // 0-10
    bccScore: number; // 0-10
    subjectScore: number; // 0-10
    totalRoutingScore: number; // 0-40
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
  evaluationSource?: 'groq-ai' | 'fallback-engine';
}

export interface PracticeAttempt {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  scenarioCategory: EmailCategory;
  difficulty: DifficultyLevel;
  toField?: string;
  ccField?: string;
  bccField?: string;
  subject: string;
  body: string;
  timeSpentSeconds: number;
  wpm: number;
  wordCount: number;
  charCount: number;
  evaluation: EvaluationResult;
  timestamp: string; // ISO string
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
  category: 'milestone' | 'speed' | 'accuracy' | 'streak';
}

export interface UserStats {
  totalSessions: number;
  averageScore: number;
  bestScore: number;
  averageWpm: number;
  totalWordsWritten: number;
  grammarAccuracy: number;
  writingStreak: number;
  lastPracticeDate?: string;
}

import { PracticeScenario, EmailCategory, DifficultyLevel } from '../types';

export type LearningLevelId = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';

export interface LearningStage {
  id: string;
  stageNumber: number;
  title: string;
  category: EmailCategory;
  description: string;
  scenario: PracticeScenario;
  targetSkills: string[];
}

export interface LearningLevel {
  id: LearningLevelId;
  levelNumber: number;
  name: string;
  tagline: string;
  goal: string;
  targetScoreToUnlockNext: number;
  timeLimitMinutes: number;
  timePressureDesc: string;
  stages: LearningStage[];
}

export interface UserLearningProgress {
  unlockedLevels: LearningLevelId[];
  completedStageIds: string[];
  stageScores: Record<string, number>; // stageId -> best score
  stageAttemptsCount: Record<string, number>;
  currentStageId: string;
}

export const INITIAL_LEARNING_PROGRESS: UserLearningProgress = {
  unlockedLevels: ['beginner'],
  completedStageIds: [],
  stageScores: {},
  stageAttemptsCount: {},
  currentStageId: 'beg-stage-01',
};

import React, { useState } from 'react';
import { 
  CheckCircle2, Lock, Unlock, Star, ArrowRight, Award, Zap, 
  Target, Sparkles, BookOpen, Clock, AlertCircle, ChevronDown, ChevronUp, Play
} from 'lucide-react';
import { LEARNING_LEVELS } from '../../data/learningPathData';
import { LearningLevel, LearningStage, UserLearningProgress } from '../../types/learningPath';
import { PracticeScenario } from '../../types';

interface LearningPathViewProps {
  progress: UserLearningProgress;
  onSelectStageScenario: (stage: LearningStage) => void;
  recentAttemptsCount: number;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectStageScenario,
  recentAttemptsCount
}) => {
  const [expandedLevelId, setExpandedLevelId] = useState<string>(
    progress.unlockedLevels[progress.unlockedLevels.length - 1] || 'beginner'
  );

  // Calculate overall stats
  const totalStages = LEARNING_LEVELS.reduce((acc, lvl) => acc + lvl.stages.length, 0);
  const completedCount = progress.completedStageIds.length;
  const overallPercentage = Math.round((completedCount / totalStages) * 100);

  // Calculate scores per level
  const getLevelStats = (level: LearningLevel) => {
    const stageIds = level.stages.map((s) => s.id);
    const completedInLevel = stageIds.filter((id) => progress.completedStageIds.includes(id));
    const scores = completedInLevel.map((id) => progress.stageScores[id] || 0);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const isUnlocked = progress.unlockedLevels.includes(level.id);
    const isFullyCompleted = completedInLevel.length === level.stages.length && level.stages.length > 0;
    const pct = Math.round((completedInLevel.length / level.stages.length) * 100);

    return {
      completedCount: completedInLevel.length,
      totalCount: level.stages.length,
      avgScore,
      isUnlocked,
      isFullyCompleted,
      pct
    };
  };

  // Find next recommended stage
  const findNextStage = (): LearningStage => {
    for (const level of LEARNING_LEVELS) {
      if (progress.unlockedLevels.includes(level.id)) {
        for (const stage of level.stages) {
          if (!progress.completedStageIds.includes(stage.id)) {
            return stage;
          }
        }
      }
    }
    return LEARNING_LEVELS[0].stages[0];
  };

  const nextStage = findNextStage();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Header & Concept */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Progressive Learning Journey</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Master Email Writing
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Start with the fundamentals. Build your communication skills step by step. Progress from simple emails to complex business communication.
        </p>
      </div>

      {/* Adaptive Learning Next Action Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-950/80 via-slate-900 to-purple-950/80 border border-brand-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Recommended Next Lesson</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {nextStage.stageNumber}. {nextStage.title}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            {nextStage.description}
          </p>
        </div>

        <button
          onClick={() => onSelectStageScenario(nextStage)}
          className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-sm font-bold shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2 shrink-0 transition-all hover:scale-105"
        >
          <span>Start Lesson →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Mastery</span>
          <div className="text-2xl font-bold text-white font-mono">{overallPercentage}%</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Lessons</span>
          <div className="text-2xl font-bold text-brand-400 font-mono">
            {completedCount} <span className="text-xs text-slate-500">/ {totalStages}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Unlocked Tiers</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {progress.unlockedLevels.length} <span className="text-xs text-slate-500">/ 5</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Practice Attempts</span>
          <div className="text-2xl font-bold text-amber-400 font-mono">{recentAttemptsCount}</div>
        </div>
      </div>

      {/* Vertical Learning Path Progression */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Curriculum Roadmap
          </h2>
          <span className="text-xs text-slate-400">Complete each tier with qualifying score to unlock</span>
        </div>

        <div className="space-y-6">
          {LEARNING_LEVELS.map((level, idx) => {
            const stats = getLevelStats(level);
            const isExpanded = expandedLevelId === level.id;

            return (
              <div
                key={level.id}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  stats.isUnlocked
                    ? stats.isFullyCompleted
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-emerald-500/5'
                      : 'bg-slate-900/90 border-brand-500/40 shadow-xl'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Level Card Top Bar */}
                <div
                  onClick={() => stats.isUnlocked && setExpandedLevelId(isExpanded ? '' : level.id)}
                  className={`p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer select-none ${
                    !stats.isUnlocked ? 'cursor-not-allowed' : 'hover:bg-slate-850/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                        stats.isFullyCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : stats.isUnlocked
                          ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                          : 'bg-slate-900 text-slate-600 border-slate-800'
                      }`}
                    >
                      {stats.isFullyCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : stats.isUnlocked ? (
                        <Star className="w-6 h-6" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                          Tier {level.levelNumber}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">{level.timePressureDesc}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                        <span>{level.name}</span>
                        {!stats.isUnlocked && (
                          <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                            Locked (Requires prior tier avg ≥ {level.targetScoreToUnlockNext})
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xl">{level.tagline}</p>
                    </div>
                  </div>

                  {/* Right: Progress Badge & Toggle */}
                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-white">
                        {stats.completedCount} / {stats.totalCount} Lessons
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {stats.avgScore > 0 ? `Avg Score: ${stats.avgScore}/100` : 'Not started'}
                      </div>
                    </div>

                    {stats.isUnlocked && (
                      <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full bg-slate-950 h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stats.isFullyCompleted ? 'bg-emerald-500' : 'bg-brand-500'
                    }`}
                    style={{ width: `${stats.pct}%` }}
                  />
                </div>

                {/* Expandable Stages List */}
                {isExpanded && stats.isUnlocked && (
                  <div className="p-5 sm:p-6 bg-slate-950/60 border-t border-slate-800 space-y-3">
                    <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                      Stages & Lessons ({level.stages.length})
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {level.stages.map((stage) => {
                        const isCompleted = progress.completedStageIds.includes(stage.id);
                        const score = progress.stageScores[stage.id];

                        return (
                          <div
                            key={stage.id}
                            className={`p-4 rounded-2xl border text-xs space-y-3 transition-all ${
                              isCompleted
                                ? 'bg-emerald-950/20 border-emerald-500/30'
                                : 'bg-slate-900/90 border-slate-800 hover:border-brand-500/50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1.5">
                                  <span className="font-mono text-brand-400 font-bold">
                                    Stage {stage.stageNumber}
                                  </span>
                                  <span className="text-slate-600">•</span>
                                  <span className="text-slate-400">{stage.category}</span>
                                </div>
                                <h4 className="font-bold text-white text-sm">
                                  {stage.title}
                                </h4>
                              </div>

                              {isCompleted ? (
                                <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono font-bold shrink-0 border border-emerald-500/30">
                                  {score}/100
                                </div>
                              ) : (
                                <div className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 font-mono shrink-0">
                                  Pending
                                </div>
                              )}
                            </div>

                            <p className="text-slate-400 text-xs leading-relaxed">
                              {stage.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {stage.targetSkills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                              <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{stage.scenario.timeLimitMinutes} min limit</span>
                              </span>

                              <button
                                onClick={() => onSelectStageScenario(stage)}
                                className={`px-4 py-1.5 rounded-xl font-semibold text-xs flex items-center space-x-1.5 transition-all ${
                                  isCompleted
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                    : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20'
                                }`}
                              >
                                <span>{isCompleted ? 'Practice Again' : 'Start Stage →'}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

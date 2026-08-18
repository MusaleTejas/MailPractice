import { useState, useEffect } from 'react';
import { PracticeAttempt, UserStats, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import confetti from 'canvas-confetti';

const STORAGE_KEYS = {
  ATTEMPTS: 'mailpractice_attempts_v1',
  STATS: 'mailpractice_stats_v1',
  ACHIEVEMENTS: 'mailpractice_achievements_v1',
  DRAFT_PREFIX: 'mailpractice_draft_',
};

const DEFAULT_STATS: UserStats = {
  totalSessions: 0,
  averageScore: 0,
  bestScore: 0,
  averageWpm: 0,
  totalWordsWritten: 0,
  grammarAccuracy: 0,
  writingStreak: 0,
  lastPracticeDate: undefined,
};

export function useStorage() {
  const [attempts, setAttempts] = useState<PracticeAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [recentUnlockedAchievement, setRecentUnlockedAchievement] = useState<Achievement | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
    } catch (e) {
      console.error('Failed saving attempts', e);
    }
  }, [attempts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed saving stats', e);
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (e) {
      console.error('Failed saving achievements', e);
    }
  }, [achievements]);

  // Record a new practice attempt
  const recordAttempt = (attempt: PracticeAttempt) => {
    const updatedAttempts = [attempt, ...attempts];
    setAttempts(updatedAttempts);

    // Calculate streak
    const today = new Date().toISOString().split('T')[0];
    let newStreak = stats.writingStreak;
    if (!stats.lastPracticeDate) {
      newStreak = 1;
    } else {
      const lastDate = stats.lastPracticeDate.split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }
    }

    // Recompute stats
    const totalSessions = updatedAttempts.length;
    const totalScore = updatedAttempts.reduce((acc, a) => acc + a.evaluation.overallScore, 0);
    const avgScore = Math.round(totalScore / totalSessions);
    const bestScore = Math.max(...updatedAttempts.map((a) => a.evaluation.overallScore));
    const totalWpm = updatedAttempts.reduce((acc, a) => acc + a.wpm, 0);
    const avgWpm = Math.round(totalWpm / totalSessions);
    const totalWords = updatedAttempts.reduce((acc, a) => acc + a.wordCount, 0);
    const totalGrammarScore = updatedAttempts.reduce((acc, a) => acc + a.evaluation.breakdown.grammar, 0);
    const avgGrammar = Math.round(totalGrammarScore / totalSessions);

    const updatedStats: UserStats = {
      totalSessions,
      averageScore: avgScore,
      bestScore,
      averageWpm: avgWpm,
      totalWordsWritten: totalWords,
      grammarAccuracy: avgGrammar,
      writingStreak: newStreak,
      lastPracticeDate: new Date().toISOString(),
    };
    setStats(updatedStats);

    // Evaluate achievements
    checkAchievements(updatedAttempts, updatedStats, attempt);
  };

  const checkAchievements = (
    allAttempts: PracticeAttempt[],
    currentStats: UserStats,
    latestAttempt: PracticeAttempt
  ) => {
    const updated = achievements.map((ach) => {
      if (ach.unlocked) return ach;

      let shouldUnlock = false;
      let progress = ach.progress;

      switch (ach.id) {
        case 'first_email':
          progress = allAttempts.length >= 1 ? 100 : 0;
          shouldUnlock = allAttempts.length >= 1;
          break;
        case 'streak_7':
          progress = Math.min(100, Math.round((currentStats.writingStreak / 7) * 100));
          shouldUnlock = currentStats.writingStreak >= 7;
          break;
        case 'speed_40_wpm':
          progress = Math.min(100, Math.round((latestAttempt.wpm / 40) * 100));
          shouldUnlock = latestAttempt.wpm >= 40;
          break;
        case 'speed_60_wpm':
          progress = Math.min(100, Math.round((latestAttempt.wpm / 60) * 100));
          shouldUnlock = latestAttempt.wpm >= 60;
          break;
        case 'practice_10':
          progress = Math.min(100, Math.round((allAttempts.length / 10) * 100));
          shouldUnlock = allAttempts.length >= 10;
          break;
        case 'score_above_90':
          progress = Math.min(100, Math.round((latestAttempt.evaluation.overallScore / 90) * 100));
          shouldUnlock = latestAttempt.evaluation.overallScore >= 90;
          break;
        case 'words_10k':
          progress = Math.min(100, Math.round((currentStats.totalWordsWritten / 10000) * 100));
          shouldUnlock = currentStats.totalWordsWritten >= 10000;
          break;
        case 'perfect_reqs':
          const isHard = latestAttempt.difficulty === 'Advanced' || latestAttempt.difficulty === 'Expert';
          if (isHard && latestAttempt.evaluation.completionPercentage === 100) {
            progress = 100;
            shouldUnlock = true;
          }
          break;
        case 'category_explorer':
          const uniqueCategories = new Set(allAttempts.map((a) => a.scenarioCategory));
          progress = Math.min(100, Math.round((uniqueCategories.size / 5) * 100));
          shouldUnlock = uniqueCategories.size >= 5;
          break;
        case 'flawless_grammar':
          if (latestAttempt.evaluation.breakdown.grammar === 100) {
            progress = 100;
            shouldUnlock = true;
          }
          break;
      }

      if (shouldUnlock && !ach.unlocked) {
        setRecentUnlockedAchievement({ ...ach, unlocked: true, unlockedAt: new Date().toISOString() });
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        return {
          ...ach,
          unlocked: true,
          unlockedAt: new Date().toISOString(),
          progress: 100,
        };
      }

      return {
        ...ach,
        progress,
      };
    });

    setAchievements(updated);
  };

  const getDraft = (scenarioId: string): { subject: string; body: string } | null => {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.DRAFT_PREFIX}${scenarioId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const saveDraft = (scenarioId: string, subject: string, body: string) => {
    try {
      localStorage.setItem(
        `${STORAGE_KEYS.DRAFT_PREFIX}${scenarioId}`,
        JSON.stringify({ subject, body, updatedAt: new Date().toISOString() })
      );
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  };

  const clearDraft = (scenarioId: string) => {
    try {
      localStorage.removeItem(`${STORAGE_KEYS.DRAFT_PREFIX}${scenarioId}`);
    } catch (e) {
      console.error('Failed to clear draft', e);
    }
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    setAttempts([]);
    setStats(DEFAULT_STATS);
    setAchievements(INITIAL_ACHIEVEMENTS);
  };

  return {
    attempts,
    stats,
    achievements,
    recentUnlockedAchievement,
    clearRecentAchievement: () => setRecentUnlockedAchievement(null),
    recordAttempt,
    getDraft,
    saveDraft,
    clearDraft,
    resetAllData,
  };
}

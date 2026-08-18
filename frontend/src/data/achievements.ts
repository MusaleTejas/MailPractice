import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_email',
    title: 'First Email',
    description: 'Complete your first professional email writing practice session.',
    icon: '🏆',
    unlocked: false,
    progress: 0,
    category: 'milestone'
  },
  {
    id: 'streak_7',
    title: '7-Day Writing Streak',
    description: 'Practice professional email writing for 7 consecutive days.',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    category: 'streak'
  },
  {
    id: 'speed_40_wpm',
    title: '40 WPM Benchmark',
    description: 'Attain a typing and composition speed of 40 WPM or higher.',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    category: 'speed'
  },
  {
    id: 'speed_60_wpm',
    title: 'Speed Demon (60+ WPM)',
    description: 'Compose a high-quality email at an executive pace exceeding 60 WPM.',
    icon: '🚀',
    unlocked: false,
    progress: 0,
    category: 'speed'
  },
  {
    id: 'practice_10',
    title: '10 Practice Sessions',
    description: 'Complete 10 realistic email practice scenarios across different categories.',
    icon: '📈',
    unlocked: false,
    progress: 0,
    category: 'milestone'
  },
  {
    id: 'score_above_90',
    title: 'Executive Excellence (90+ Score)',
    description: 'Achieve an overall evaluation score of 90 or higher on any scenario.',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    category: 'accuracy'
  },
  {
    id: 'words_10k',
    title: '10,000 Words Written',
    description: 'Write a cumulative total of 10,000 professional email words.',
    icon: '✍️',
    unlocked: false,
    progress: 0,
    category: 'milestone'
  },
  {
    id: 'perfect_reqs',
    title: 'Requirements Master',
    description: 'Achieve a 100% requirement fulfillment score on an Advanced or Expert challenge.',
    icon: '✅',
    unlocked: false,
    progress: 0,
    category: 'accuracy'
  },
  {
    id: 'category_explorer',
    title: 'Versatile Communicator',
    description: 'Practice scenarios in at least 5 distinct email categories.',
    icon: '🌐',
    unlocked: false,
    progress: 0,
    category: 'milestone'
  },
  {
    id: 'flawless_grammar',
    title: 'Flawless Grammar',
    description: 'Receive a perfect 100 Grammar score on any submitted email.',
    icon: '🌟',
    unlocked: false,
    progress: 0,
    category: 'accuracy'
  }
];

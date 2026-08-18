import React, { useState } from 'react';
import { UserStats, PracticeAttempt, Achievement } from '../../types';
import { 
  BarChart3, Flame, Trophy, Award, Zap, BookOpen, Clock,
  Calendar, CheckCircle2, RotateCcw, Download, Trash2, ArrowRight,
  Sparkles, ShieldCheck, ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface DashboardViewProps {
  stats: UserStats;
  attempts: PracticeAttempt[];
  achievements: Achievement[];
  onSelectAttempt: (attempt: PracticeAttempt) => void;
  onStartWriting: () => void;
  onResetData: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  attempts,
  achievements,
  onSelectAttempt,
  onStartWriting,
  onResetData,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Prepare chart data chronologically (oldest to newest)
  const chartData = [...attempts]
    .reverse()
    .map((att, idx) => ({
      index: `#${idx + 1}`,
      title: att.scenarioTitle.length > 18 ? att.scenarioTitle.slice(0, 18) + '...' : att.scenarioTitle,
      score: att.evaluation.overallScore,
      wpm: att.wpm,
      words: att.wordCount,
      grammar: att.evaluation.breakdown.grammar,
      clarity: att.evaluation.breakdown.clarity,
      professionalism: att.evaluation.breakdown.professionalism,
      date: new Date(att.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    }));

  // Average radar data
  const radarData = [
    {
      skill: 'Grammar',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.grammar, 0) / attempts.length) : 0,
      fullMark: 100,
    },
    {
      skill: 'Spelling',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.spelling, 0) / attempts.length) : 0,
      fullMark: 100,
    },
    {
      skill: 'Clarity',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.clarity, 0) / attempts.length) : 0,
      fullMark: 100,
    },
    {
      skill: 'Professionalism',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.professionalism, 0) / attempts.length) : 0,
      fullMark: 100,
    },
    {
      skill: 'Structure',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.structure, 0) / attempts.length) : 0,
      fullMark: 100,
    },
    {
      skill: 'Requirements',
      score: attempts.length ? Math.round(attempts.reduce((acc, a) => acc + a.evaluation.breakdown.requirementCompletion, 0) / attempts.length) : 0,
      fullMark: 100,
    },
  ];

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ stats, attempts, achievements }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mailpractice_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Local Browser Storage • 100% Private</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Writing Progress & Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track writing speed, score trajectory, and communication milestones over time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {attempts.length > 0 && (
            <>
              <button
                onClick={exportData}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                title="Reset All Progress"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={onStartWriting}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center space-x-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Practice Session</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {attempts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto text-brand-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Your writing journey starts here.</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Complete your first realistic email practice session to unlock detailed performance charts, speed tracking, and achievement badges.
          </p>
          <button
            onClick={onStartWriting}
            className="mt-2 inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-600/30 transition-all"
          >
            <span>Start Your First Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Top 4 Primary KPI Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Practice Sessions</span>
                <BookOpen className="w-4 h-4 text-brand-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {stats.totalSessions}
              </div>
              <p className="text-[11px] text-slate-400">Completed email scenarios</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Average Score</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {stats.averageScore}<span className="text-xs text-slate-400 font-sans font-normal">/100</span>
              </div>
              <p className="text-[11px] text-slate-400">Best: <strong className="text-white">{stats.bestScore}/100</strong></p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Average Speed</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                {stats.averageWpm} <span className="text-xs text-slate-400 font-sans font-normal">WPM</span>
              </div>
              <p className="text-[11px] text-slate-400">Total words: <strong className="text-white">{stats.totalWordsWritten.toLocaleString()}</strong></p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider">Writing Streak</span>
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono flex items-center space-x-1">
                <span>{stats.writingStreak}</span>
                <span className="text-xs text-slate-400 font-sans font-normal">Days</span>
              </div>
              <p className="text-[11px] text-slate-400">Daily practice habit</p>
            </div>

          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Grammar Accuracy</span>
                <div className="text-xl font-bold text-white font-mono mt-0.5">{stats.grammarAccuracy}%</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Trophies Unlocked</span>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {achievements.filter((a) => a.unlocked).length} / {achievements.length}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Score Growth Trend Chart */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Score & Writing Speed Trajectory
                  </h3>
                  <p className="text-xs text-slate-400">Your historical practice progression</p>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center space-x-1 text-brand-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                    <span>Score</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>WPM</span>
                  </span>
                </div>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0e87eb" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0e87eb" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="wpmGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="index" stroke="#64748b" textAnchor="end" fontSize={11} />
                    <YAxis stroke="#64748b" domain={[0, 100]} fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#0e87eb" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGrad)" name="Score" />
                    <Area type="monotone" dataKey="wpm" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#wpmGrad)" name="WPM" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Communication Radar Chart */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Skill Mastery Radar
                </h3>
                <p className="text-xs text-slate-400">Average balance across key areas</p>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="skill" stroke="#94a3b8" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                    <Radar name="Proficiency" dataKey="score" stroke="#38a5f6" fill="#38a5f6" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Achievement Trophy Showcase */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Professional Milestone Achievements</h3>
              </div>
              <span className="text-xs text-slate-400">
                {achievements.filter((a) => a.unlocked).length} of {achievements.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border transition-all ${
                    ach.unlocked
                      ? 'bg-slate-950 border-amber-500/40 shadow-md shadow-amber-500/5'
                      : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl shrink-0">{ach.icon}</span>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                        {ach.unlocked && (
                          <span className="text-[10px] text-amber-400 font-semibold uppercase">Unlocked</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{ach.description}</p>
                      
                      {!ach.unlocked && (
                        <div className="pt-2">
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500 rounded-full"
                              style={{ width: `${ach.progress}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">
                            {ach.progress}% complete
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Practice History Table */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Practice History & Stored Feedback</h3>
              <span className="text-xs text-slate-400">{attempts.length} attempts recorded</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Scenario</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Difficulty</th>
                    <th className="py-3 px-3">Score</th>
                    <th className="py-3 px-3">WPM</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {attempts.map((att) => (
                    <tr
                      key={att.id}
                      onClick={() => onSelectAttempt(att)}
                      className="hover:bg-slate-850/80 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-3 text-slate-400 whitespace-nowrap font-mono">
                        {new Date(att.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white group-hover:text-brand-300 transition-colors">
                        {att.scenarioTitle}
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {att.scenarioCategory}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {att.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold font-mono text-brand-400">
                        {att.evaluation.overallScore}/100
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400">
                        {att.wpm} WPM
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center space-x-1 text-xs text-slate-400 group-hover:text-white font-semibold">
                          <span>Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Reset all local practice data?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will erase all recorded sessions, streaks, and achievement badges from your browser. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

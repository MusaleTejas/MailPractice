import React, { useState } from 'react';
import { PracticeAttempt } from '../../types';
import { SCENARIOS } from '../../data/scenarios';
import { 
  CheckCircle2, CheckCircle, AlertCircle, AlertTriangle, Sparkles, ArrowRight,
  RotateCcw, Copy, Check, TrendingUp, Award, BarChart2, ShieldCheck,
  ChevronDown, ChevronUp, Layers, HelpCircle, Wand2, Lightbulb, BookOpen,
  Target, Mail, AtSign, LayoutTemplate, Zap
} from 'lucide-react';

interface EvaluationViewProps {
  attempt: PracticeAttempt;
  onPracticeAgain: () => void;
  onSelectAnotherScenario: () => void;
  onGoToDashboard: () => void;
}

const ScoreCard: React.FC<{ label: string; score?: number; icon: React.ReactNode }> = ({ label, score = 0, icon }) => (
  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium">{label}</span>
      {icon}
    </div>
    <div className="text-xl font-bold font-mono text-white">
      {score} <span className="text-xs text-slate-500">/100</span>
    </div>
    <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
      <div
        className="h-full bg-brand-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
      />
    </div>
  </div>
);

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  attempt,
  onPracticeAgain,
  onSelectAnotherScenario,
  onGoToDashboard,
}) => {
  const { evaluation, scenarioId, scenarioTitle, scenarioCategory, difficulty, subject, body, wpm, wordCount } = attempt;
  const { overallScore, breakdown, mistakes, requirementChecks, completionPercentage, tone, vocabulary, improvedVersion, actionableTakeaways } = evaluation;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'mistakes' | 'requirements' | 'tone' | 'improved' | 'howToImprove'>('overview');

  // Match scenario for sample answer
  const matchedScenario = SCENARIOS.find((s) => s.id === scenarioId);

  const copyImprovedEmail = () => {
    const fullText = `Subject: ${improvedVersion.subject}\n\n${improvedVersion.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 75) return 'text-brand-400 border-brand-500/30 bg-brand-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Executive Excellence';
    if (score >= 80) return 'Strong Workplace Standard';
    if (score >= 70) return 'Competent — Needs Minor Polish';
    return 'Actionable Areas for Growth';
  };

  const getSeverityBadge = (severity: 'Minor' | 'Medium' | 'Major') => {
    switch (severity) {
      case 'Major':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">Major Error</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Medium</span>;
      case 'Minor':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Minor Polish</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      
      {/* Top Banner & Scenario Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">
            <span>{scenarioCategory}</span>
            <span className="text-slate-600">•</span>
            <span>{difficulty} Challenge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Writing Feedback & Evaluation
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Scenario: <strong className="text-slate-200">{scenarioTitle}</strong>
          </p>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onPracticeAgain}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Scenario</span>
          </button>
          <button
            onClick={onSelectAnotherScenario}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-md shadow-brand-600/20 transition-all"
          >
            <span>Next Scenario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Big Score Badge */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between items-center text-center shadow-xl">
          <div className="w-full">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Overall Score</span>
            
            <div className="my-6">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(overallScore)}`}>
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight">{overallScore}</span>
                <span className="text-[11px] font-semibold uppercase text-slate-400">out of 100</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">{getScoreLabel(overallScore)}</h3>
            <p className="text-xs text-slate-400">
              Evaluated across 8 core workplace communication dimensions.
            </p>
          </div>

          <div className="w-full pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">SPEED</span>
              <strong className="text-emerald-400 text-sm">{wpm} WPM</strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">WORDS</span>
              <strong className="text-white text-sm">{wordCount} Words</strong>
            </div>
          </div>
        </div>

        {/* Right 8-Dimension Breakdown Grid */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              8-Dimension Score Breakdown
            </h3>
            <span className="text-xs text-slate-400">Harvard Business Communication Standard</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { label: 'Grammar Accuracy', score: breakdown.grammar, desc: 'Syntax, agreement & tense' },
              { label: 'Spelling & Typography', score: breakdown.spelling, desc: 'Zero typos & correct formatting' },
              { label: 'Clarity & Directness', score: breakdown.clarity, desc: 'Logical flow & bottom-line focus' },
              { label: 'Professionalism & Poise', score: breakdown.professionalism, desc: 'Executive diplomacy & respect' },
              { label: 'Email Structure', score: breakdown.structure, desc: 'Salutation, body & sign-off' },
              { label: 'Vocabulary & Diction', score: breakdown.vocabulary, desc: 'Strong, modern workplace terms' },
              { label: 'Requirement Completion', score: breakdown.requirementCompletion, desc: 'All prompt tasks addressed' },
              { label: 'Conciseness', score: breakdown.conciseness, desc: 'High signal-to-noise ratio' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="font-mono font-bold text-brand-400">{item.score}/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400 transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'overview' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Actionable Takeaways
        </button>
        <button
          onClick={() => setActiveTab('howToImprove')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors ${
            activeTab === 'howToImprove' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>How to Improve Blueprint</span>
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors ${
            activeTab === 'mistakes' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <span>Mistake Analysis</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
            {mistakes.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors ${
            activeTab === 'requirements' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <span>Requirement Audit</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
            {completionPercentage}%
          </span>
        </button>
        <button
          onClick={() => setActiveTab('tone')}
          className={`px-4 py-2 rounded-xl transition-colors ${
            activeTab === 'tone' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Tone & Vocabulary ({tone.primary})
        </button>
        <button
          onClick={() => setActiveTab('improved')}
          className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors ${
            activeTab === 'improved' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-300" />
          <span>Side-by-Side Comparison</span>
        </button>
      </div>

      {/* Tab 1: Overview & Actionable Takeaways */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Stakeholder Routing & Recipient Selection Scorecard (For Advanced Practice) */}
          {evaluation.stakeholderEvaluation && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
                <div className="flex items-center space-x-2 text-purple-300">
                  <AtSign className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Stakeholder Management & Routing Scorecard</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-purple-300/80">Recipient Selection Accuracy:</span>
                  <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-200 font-mono font-bold text-sm border border-purple-500/30">
                    {evaluation.stakeholderEvaluation.totalRoutingScore} / 40
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">To: Recipient</span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {evaluation.stakeholderEvaluation.toScore} <span className="text-xs text-slate-500">/10</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Cc: Visibility</span>
                  <div className="text-xl font-bold font-mono text-brand-400">
                    {evaluation.stakeholderEvaluation.ccScore} <span className="text-xs text-slate-500">/10</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Bcc: Oversight</span>
                  <div className="text-xl font-bold font-mono text-rose-400">
                    {evaluation.stakeholderEvaluation.bccScore} <span className="text-xs text-slate-500">/10</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Subject Line</span>
                  <div className="text-xl font-bold font-mono text-amber-400">
                    {evaluation.stakeholderEvaluation.subjectScore} <span className="text-xs text-slate-500">/10</span>
                  </div>
                </div>
              </div>

              {evaluation.stakeholderEvaluation.feedback && (
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  💡 <strong>Routing Evaluation:</strong> {evaluation.stakeholderEvaluation.feedback}
                </p>
              )}
            </div>
          )}

          {/* Core 8 Dimension Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ScoreCard
              label="Grammar"
              score={breakdown.grammar}
              icon={<CheckCircle className="w-4 h-4 text-emerald-400" />}
            />
            <ScoreCard
              label="Spelling"
              score={breakdown.spelling}
              icon={<CheckCircle className="w-4 h-4 text-teal-400" />}
            />
            <ScoreCard
              label="Clarity & BLUF"
              score={breakdown.clarity}
              icon={<Target className="w-4 h-4 text-blue-400" />}
            />
            <ScoreCard
              label="Professionalism"
              score={breakdown.professionalism}
              icon={<Award className="w-4 h-4 text-indigo-400" />}
            />
            <ScoreCard
              label="Email Structure"
              score={breakdown.structure}
              icon={<LayoutTemplate className="w-4 h-4 text-amber-400" />}
            />
            <ScoreCard
              label="Vocabulary"
              score={breakdown.vocabulary}
              icon={<Sparkles className="w-4 h-4 text-fuchsia-400" />}
            />
            <ScoreCard
              label="Requirements"
              score={breakdown.requirementCompletion}
              icon={<Target className="w-4 h-4 text-purple-400" />}
            />
            <ScoreCard
              label="Conciseness"
              score={breakdown.conciseness}
              icon={<Zap className="w-4 h-4 text-rose-400" />}
            />
            {breakdown.businessJudgment !== undefined && (
              <div className="col-span-2 sm:col-span-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-blue-300">Executive Business Judgment & Decision-Making</div>
                    <div className="text-xs text-slate-400">Diplomacy, objective accountability, data justification & ROI framing</div>
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {breakdown.businessJudgment} <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-brand-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Coach's Key Takeaways for Next Practice</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {actionableTakeaways.map((takeaway, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-bold text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User's Submitted Attempt in Client Layout */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400">Your Submitted Draft</span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
              <div className="pb-2 border-b border-slate-800 space-y-1">
                {attempt.toField && (
                  <div>
                    <span className="text-slate-500">TO: </span>
                    <span className="text-slate-200 font-semibold">{attempt.toField}</span>
                  </div>
                )}
                {attempt.ccField && (
                  <div>
                    <span className="text-slate-500">CC: </span>
                    <span className="text-brand-300">{attempt.ccField}</span>
                  </div>
                )}
                {attempt.bccField && (
                  <div>
                    <span className="text-slate-500">BCC: </span>
                    <span className="text-rose-300">{attempt.bccField}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-slate-500">SUBJECT: </span>
                    <span className="text-white font-semibold">{subject || '(No Subject Line)'}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{wpm} WPM • {wordCount} Words</span>
                </div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed pt-2 text-slate-200">
                {body}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: How To Improve Blueprint */}
      {activeTab === 'howToImprove' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">How to Improve: Targeted Growth Blueprint</h3>
              </div>
              <span className="text-xs text-slate-400">Personalized to your score analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Subject Line Strategy */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase">
                  <Mail className="w-4 h-4" />
                  <span>1. Subject Line Formula</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Use the 3-element pattern: <strong>[Intent Tag] + [Core Project/Client] + [Exact Outcome]</strong>.
                </p>
                <div className="p-2.5 rounded bg-slate-900 text-[11px] font-mono text-emerald-300 border border-slate-800">
                  e.g., "[Review Required] Q3 Product Roadmap — Due Friday 4 PM"
                </div>
              </div>

              {/* BLUF Structural Principle */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase">
                  <Target className="w-4 h-4" />
                  <span>2. The BLUF Rule</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  State your primary request or update in sentence #1. Never make the reader search through 3 paragraphs for the point.
                </p>
                <div className="p-2.5 rounded bg-slate-900 text-[11px] font-mono text-slate-300 border border-slate-800">
                  "I am writing to request a 2-day extension on the Ops Report..."
                </div>
              </div>

              {/* Requirement Completeness */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>3. Checklist Scanning</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Before hitting submit, cross-verify all required points. Use bullet lists for multiple deliverables to ensure 100% completion.
                </p>
                <div className="p-2.5 rounded bg-slate-900 text-[11px] font-mono text-purple-300 border border-slate-800">
                  Current Completion: {completionPercentage}%
                </div>
              </div>

            </div>

            {/* Reference Model Answer Comparison */}
            {matchedScenario?.sampleAnswer && (
              <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/20 space-y-3">
                <div className="flex items-center space-x-2 text-brand-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Expert Model Answer for this Challenge</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                  <div className="text-emerald-400 font-semibold">
                    Subject: {matchedScenario.sampleAnswer.subject}
                  </div>
                  <div className="whitespace-pre-wrap text-slate-200 border-t border-slate-800 pt-2 leading-relaxed">
                    {matchedScenario.sampleAnswer.body}
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  <strong>Why this benchmark succeeded: </strong>
                  {matchedScenario.sampleAnswer.whyItWorks}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Tab 2: Mistake Analysis */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Identified Writing & Structural Errors ({mistakes.length})
            </h3>
            <span className="text-xs text-slate-400">Genuine workplace corrections only</span>
          </div>

          {mistakes.length === 0 ? (
            <div className="p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Flawless Composition!</h4>
              <p className="text-xs text-emerald-300">
                Zero grammatical, typographical, or structural errors were detected in your draft.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                        {m.type}
                      </span>
                      {getSeverityBadge(m.severity)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
                      <span className="text-[10px] font-bold uppercase text-red-400 block mb-1">Original Text:</span>
                      "{m.original}"
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">Recommended Correction:</span>
                      "{m.correction}"
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <strong className="text-slate-400">Why this matters: </strong>
                    {m.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Requirement Audit */}
      {activeTab === 'requirements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Scenario Requirement Verification ({completionPercentage}% Complete)
            </h3>
            <span className="text-xs text-slate-400">Did you answer all client/manager constraints?</span>
          </div>

          <div className="space-y-3">
            {requirementChecks.map((rc, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  rc.met
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-rose-500/5 border-rose-500/20'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 shrink-0">
                    {rc.met ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-white text-sm">{rc.requirement}</span>
                    <p className={`text-xs ${rc.met ? 'text-emerald-300/90' : 'text-rose-300/90'}`}>
                      {rc.explanation}
                    </p>
                    {rc.matchedSnippet && (
                      <div className="mt-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                        <span className="text-slate-500">Detected in your email: </span>
                        "{rc.matchedSnippet}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Tone & Vocabulary Analysis */}
      {activeTab === 'tone' && (
        <div className="space-y-6">
          
          {/* Tone Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Detected Dominant Tone</span>
                <h3 className="text-xl font-extrabold text-brand-400 mt-0.5">{tone.primary}</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300">
                {tone.confidence}% Confidence
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {tone.explanation}
            </p>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-slate-300">Tone Calibration Suggestions:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {tone.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vocabulary Enhancer */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Vocabulary Upgrades & Professional Diction
              </h3>
              <span className="text-xs text-slate-400">Replace weak or informal phrases</span>
            </div>

            {vocabulary.length === 0 ? (
              <p className="text-xs text-slate-400">Strong business vocabulary used throughout.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vocabulary.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-rose-400 line-through">"{v.original}"</span>
                      <span className="text-emerald-400 font-bold">"{v.suggested}"</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-snug">{v.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 5: Side-by-Side Improved Version */}
      {activeTab === 'improved' && (
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-brand-500/10 border border-brand-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-brand-300 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Executive Rewritten Version</span>
              </div>
              <button
                onClick={copyImprovedEmail}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Improved Version'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Notice how the improved version retains your core ideas while optimizing clarity, tone, and conciseness.
            </p>
          </div>

          {/* What Changed Summary */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs uppercase font-bold text-slate-300">Key Refinements Made:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {improvedVersion.whatChanged.map((wc, i) => (
                <div key={i} className="flex items-center space-x-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{wc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side by side columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Original Column */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase text-slate-400">Your Original Attempt</span>
                <span className="text-[11px] font-mono text-slate-500">{wordCount} words</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">SUBJECT:</span>
                  <span className="text-white font-medium">{subject || '(No subject)'}</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-300 border-t border-slate-800 pt-2 leading-relaxed">
                  {body}
                </div>
              </div>
            </div>

            {/* Improved Column */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-brand-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase text-brand-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Coach Improved Version</span>
                </span>
                <span className="text-[11px] font-mono text-brand-300">
                  {improvedVersion.body.split(/\s+/).length} words
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">IMPROVED SUBJECT:</span>
                  <span className="text-emerald-400 font-medium">{improvedVersion.subject}</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-100 border-t border-slate-800 pt-2 leading-relaxed">
                  {improvedVersion.body}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Bottom CTA Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Ready for your next writing challenge?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Consistent 10-minute daily email practice builds permanent workplace fluency.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToDashboard}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            View Dashboard & Streak
          </button>
          <button
            onClick={onSelectAnotherScenario}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/25 flex items-center space-x-2 transition-all"
          >
            <span>Explore More Scenarios</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

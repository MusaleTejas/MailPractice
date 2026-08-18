import React from 'react';
import { WRITING_TIPS } from '../../data/writingTips';
import { BookOpen, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface WritingTipsViewProps {
  onStartWriting: () => void;
}

export const WritingTipsView: React.FC<WritingTipsViewProps> = ({ onStartWriting }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Executive Communication Masterclass</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Professional Email Writing Principles
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Proven frameworks for structuring high-stakes workplace correspondence with clarity and poise.
          </p>
        </div>

        <button
          onClick={onStartWriting}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center space-x-2 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice These Tips Now</span>
        </button>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {WRITING_TIPS.map((tip) => (
          <div
            key={tip.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {tip.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">{tip.title}</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{tip.summary}</p>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Best Practices</span>
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {tip.doList.map((d, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Common Traps</span>
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {tip.dontList.map((d, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Before & After Case Study */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-rose-400 uppercase font-bold block mb-1">
                    ✗ Ineffective Draft:
                  </span>
                  <p className="text-slate-400 whitespace-pre-wrap">{tip.templateExample.bad}</p>
                </div>
                <div className="border-t border-slate-800/80 pt-2">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
                    ✓ Executive Polish:
                  </span>
                  <p className="text-slate-100 whitespace-pre-wrap">{tip.templateExample.good}</p>
                </div>
                <div className="border-t border-slate-800/80 pt-2 text-[11px] text-slate-400 font-sans">
                  <strong className="text-slate-300">Why this works: </strong>
                  {tip.templateExample.why}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

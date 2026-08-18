import React from 'react';
import { Target, PenTool, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowItWorksProps {
  onStartWriting: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartWriting }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose',
      subtitle: 'Select a professional scenario',
      description: 'Pick from 14+ categories including Business Communication, Job Applications, Client De-escalations, and Technical Incident Post-Mortems.',
      icon: Target,
      color: 'from-blue-500/20 to-brand-500/10',
      iconColor: 'text-brand-400',
    },
    {
      step: '02',
      title: 'Write',
      subtitle: 'Draft within the time limit',
      description: 'Compose the email yourself in a clean, distraction-free editor with live WPM, word count, and objective requirement tracking.',
      icon: PenTool,
      color: 'from-amber-500/20 to-amber-500/10',
      iconColor: 'text-amber-400',
    },
    {
      step: '03',
      title: 'Analyze',
      subtitle: 'Receive deep AI feedback',
      description: 'Get an instant 100-point evaluation across 8 dimensions: grammar, spelling, clarity, tone, conciseness, and requirement fulfillment.',
      icon: Sparkles,
      color: 'from-purple-500/20 to-indigo-500/10',
      iconColor: 'text-purple-400',
    },
    {
      step: '04',
      title: 'Improve',
      subtitle: 'Track growth & master tone',
      description: 'Inspect exact mistake corrections, review side-by-side executive rewrites, unlock milestone trophies, and build high-confidence streaks.',
      icon: TrendingUp,
      color: 'from-emerald-500/20 to-teal-500/10',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-3 border border-slate-700">
          <span>Structured Mastery Workflow</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How MailPractice Works
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          Four disciplined steps designed to transform how you compose high-stakes workplace emails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border border-slate-700 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-slate-400 group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <h4 className="text-xs font-semibold text-brand-400 mb-3">{step.subtitle}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStartWriting}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/25 transition-all"
        >
          <span>Choose Your First Scenario</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

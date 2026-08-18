import React from 'react';
import { PenTool, Brain, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const PhilosophyBanner: React.FC = () => {
  const pillars = [
    {
      icon: PenTool,
      title: 'Write First',
      description: 'Draft your emails independently under realistic workplace pressure and time constraints before any AI assistance.',
    },
    {
      icon: Brain,
      title: 'Learn From Mistakes',
      description: 'Receive non-hallucinated, objective feedback on real errors in grammar, tone, clarity, and structural hierarchy.',
    },
    {
      icon: TrendingUp,
      title: 'Improve Continuously',
      description: 'Track WPM velocity, score progression, and communication polish over time to build genuine executive confidence.',
    },
  ];

  return (
    <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-3">
            <span>Our Core Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Don't let AI write for you. <span className="text-brand-400">Let AI teach you.</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            MailPractice is not an automated email generator. It is an intensive, practice-based training ground engineered to make <span className="text-white font-medium">you</span> a formidable communicator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

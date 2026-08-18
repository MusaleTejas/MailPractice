import React from 'react';
import { Sparkles, ArrowRight, Shield, Zap, CheckCircle2, Clock, Award, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onStartWriting: () => void;
  onHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartWriting, onHowItWorks }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Philosophy Tag */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Don't let AI write for you. Let AI teach you.</span>
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            Write Better Emails.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-sky-300 to-brand-200">
              Communicate Better.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Practice real-world email writing, improve your communication skills, and receive detailed AI-powered feedback on every attempt.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onStartWriting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Writing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onHowItWorks}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 transition-all duration-150 flex items-center justify-center space-x-2"
            >
              <span>How It Works</span>
            </button>
          </motion.div>

          {/* Privacy badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-3"
          >
            <span className="text-xs text-slate-400 font-medium">
              ⚡ No account required. Your progress is stored locally in your browser.
            </span>
          </motion.div>
        </div>

        {/* Interactive Hero Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-14 max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-slate-900/80 shadow-2xl border border-slate-800"
        >
          <div className="bg-slate-900/95 rounded-xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 font-medium">MailPractice Studio & AI Evaluator</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Real-Time Feedback</span>
                </span>
                <span className="text-amber-400 font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timed Challenges</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left simulation pane */}
              <div className="lg:col-span-7 space-y-3 bg-slate-950/80 p-4 rounded-lg border border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>To: <strong className="text-slate-200">Sarah Jenkins (Project Manager)</strong></span>
                  <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 font-mono">10:00 Timer</span>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  Subject: <span className="text-white font-medium">Update & Extension Request — Q2 Ops Report</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Dear Sarah, I am writing to request a 2-day extension for the quarterly operations report. We discovered a minor discrepancy in the third-party analytics data and require 48 hours for verification...
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  <span>Words: <strong>78</strong></span>
                  <span>WPM: <strong className="text-emerald-400">46 WPM</strong></span>
                  <span>Score: <strong className="text-brand-400">92/100</strong></span>
                </div>
              </div>

              {/* Right evaluation card simulation */}
              <div className="lg:col-span-5 space-y-3 bg-slate-850/90 p-4 rounded-lg border border-brand-500/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>AI Writing Coach Audit</span>
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">92 Overall</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">✓ Requirements Fulfilled</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Stated delay cause, offered interim progress & gave new delivery date.</p>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-amber-400">💡 Vocabulary Upgrade</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      <span className="line-through text-red-400">"tell me"</span> → <span className="text-emerald-400 font-semibold">"kindly advise / let me know"</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Feature stats counter row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-white">14+</span>
            <span className="text-xs text-slate-400 font-medium">Email Categories</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-brand-400">8 Pillars</span>
            <span className="text-xs text-slate-400 font-medium">Evaluation Dimensions</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</span>
            <span className="text-xs text-slate-400 font-medium">Private & Local First</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center">
            <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">0 Accounts</span>
            <span className="text-xs text-slate-400 font-medium">Instant Start</span>
          </div>
        </div>

      </div>
    </section>
  );
};

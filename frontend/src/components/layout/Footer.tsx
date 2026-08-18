import React from 'react';
import { Mail, ExternalLink, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface FooterProps {
  setActiveTab: (tab: 'home' | 'practice' | 'dashboard' | 'tips' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-md shadow-brand-500/20">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">MailPractice</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A modern, privacy-first AI-powered email writing trainer. Master realistic professional communication scenarios with timed challenges and rigorous coaching.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-400 font-semibold uppercase tracking-wider">
              <span>Write</span>
              <span className="text-slate-600">•</span>
              <span>Analyze</span>
              <span className="text-slate-600">•</span>
              <span>Improve</span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>No account required. Your progress is stored locally in your browser.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-brand-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('practice')} className="hover:text-brand-400 transition-colors">
                  Practice Scenarios
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-400 transition-colors">
                  Progress & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tips')} className="hover:text-brand-400 transition-colors">
                  Writing Tips Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-brand-400 transition-colors">
                  About & Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Creator Attribution */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider">Creator & Engineer</h4>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-500/40 shrink-0 bg-slate-950">
                  <img
                    src="/profile.jpg"
                    alt="Tejas Musale"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/MusaleTejas';
                    }}
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">Tejas Musale</div>
                  <div className="text-[11px] text-brand-400 font-medium">Data Science Engineer</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Built MailPractice to empower independent, confident workplace communication.
              </p>
              <a
                href="https://github.com/MusaleTejas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-all group w-full justify-center"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-white" />
                <span>GitHub @MusaleTejas</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} MailPractice. Built for confident professional communication.</p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" />
            <span>by Tejas Musale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { 
  Sparkles, ExternalLink, ShieldCheck, Heart, User,
  CheckCircle2, Target, Award, ArrowRight, Code, Laptop,
  Cpu, Lightbulb, Compass, MessageSquareCode
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface AboutViewProps {
  onStartWriting: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartWriting }) => {
  const targetAudiences = [
    { title: 'Students & Fresh Graduates', desc: 'Bridge the academic-to-corporate gap. Learn workplace etiquette, internship outreach, and formal leaves.' },
    { title: 'Job Seekers', desc: 'Craft personalized cover letters, interview follow-ups, and recruiter communications that stand out.' },
    { title: 'Software & Data Engineers', desc: 'Communicate technical blockers, propose architecture trade-offs, and brief non-technical executives.' },
    { title: 'Working Professionals', desc: 'Elevate executive presence, negotiate project deadlines, and manage complex stakeholder escalations.' },
    { title: 'Customer Support & Success', desc: 'De-escalate critical client friction with empathy, operational accountability, and calm poise.' },
    { title: 'Business Leaders & Managers', desc: 'Deliver concise bottom-line updates (BLUF), team guidance, and strategic decisions with zero fluff.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 animate-in fade-in">
      
      {/* Product Mission Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Vision & Engineering Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Empowering Confident Workplace Writers
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          MailPractice helps students and professionals master professional business writing through deliberate practice, realistic workplace backstories, and instant AI coaching.
        </p>
      </div>

      {/* The Core Story & Humanized Philosophy */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center space-x-3 text-brand-400">
          <Lightbulb className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Why MailPractice Exists: The Generative AI Trap</h2>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            In today’s workplace, communication is your most valuable currency. A well-crafted email can secure an interview, save a client relationship, unblock a critical engineering release, or earn executive trust.
          </p>
          <p>
            Yet, many professionals and students find themselves relying on generative AI to write whole emails for them. While convenient, <strong>this creates a crutch</strong> that causes our innate writing confidence, vocabulary, and diplomatic instincts to atrophy over time.
          </p>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-brand-500/30 text-brand-300 font-medium text-sm sm:text-base leading-relaxed">
            💡 <em>"Don't let AI write for you. Let AI teach you. The goal is not to outsource your voice — but to build independent, fluent, and commanding communication skills."</em>
          </div>
          <p>
            MailPractice flips the traditional paradigm. You write independently under realistic timed constraints with full workplace backstories. Once submitted, the AI acts strictly as your coach — breaking down your grammar, tone, stakeholder routing, and executive poise.
          </p>
        </div>
      </div>

      {/* Target Audiences Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-extrabold text-white">Built for Every Career Stage</h3>
          <p className="text-xs sm:text-sm text-slate-400">Designed for anyone who relies on written words to create business impact.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {targetAudiences.map((aud, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors">
              <div className="flex items-center space-x-2 text-brand-400">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-sm font-bold text-white">{aud.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{aud.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CREATOR & ENGINEER PROFILE SECTION */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Creator Profile Image */}
          <div className="relative shrink-0 group">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-brand-500/40 shadow-2xl shadow-brand-500/20 bg-slate-950">
              <img
                src="/profile.jpg"
                alt="Tejas Musale - Creator & Engineer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback in case path differs
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/MusaleTejas';
                }}
              />
            </div>
            <div className="absolute -bottom-3 -right-2 px-3 py-1 rounded-xl bg-slate-950 border border-brand-500/30 text-[11px] font-mono text-brand-400 font-bold shadow-lg">
              Data Science Eng
            </div>
          </div>

          {/* Creator Bio & Narrative */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-300 text-xs font-bold uppercase tracking-wider mb-2 border border-brand-500/20">
                <Code className="w-3.5 h-3.5 text-brand-400" />
                <span>Built by</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Tejas Musale</h3>
              <p className="text-sm font-semibold text-brand-400 mt-0.5">
                Data Science Engineer · AI & Machine Learning Enthusiast
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "I kept watching smart engineers struggle — not because they lacked ideas, but because they couldn't put those ideas into a clear email. Then I watched everyone start copy-pasting from ChatGPT instead of learning to write better. That felt like the wrong fix."
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "So I built the tool I wished existed: one that makes you write first, then shows you exactly where you went wrong. No shortcuts. Just practice."
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "If this helps even one person send a better email tomorrow, it was worth building."
              </p>
              <p className="text-xs text-brand-400 font-semibold pt-1">— Tejas</p>
            </div>

            {/* Social & Action Links */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="https://github.com/MusaleTejas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shadow-md transition-all group"
              >
                <GithubIcon className="w-4 h-4 text-slate-300 group-hover:text-white" />
                <span>GitHub @MusaleTejas</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={onStartWriting}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs font-bold shadow-lg shadow-brand-600/25 transition-all"
              >
                <span>Start Writing Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};


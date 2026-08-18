import React from 'react';
import { Mail, Flame, Trophy, BookOpen, BarChart3, PenTool, Sparkles, User } from 'lucide-react';
import { UserStats } from '../../types';

interface NavbarProps {
  activeTab: 'home' | 'learning' | 'practice' | 'dashboard' | 'tips' | 'about';
  setActiveTab: (tab: 'home' | 'learning' | 'practice' | 'dashboard' | 'tips' | 'about') => void;
  stats: UserStats;
  onStartWriting: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onStartWriting,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg text-white tracking-tight">MailPractice</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">AI Coach</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Write. Analyze. Improve.</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1.5">
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 flex items-center space-x-1.5 ${
              activeTab === 'learning'
                ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/20'
                : 'text-brand-300 hover:text-white hover:bg-brand-500/10 border border-brand-500/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mastery Path</span>
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
              activeTab === 'home'
                ? 'bg-slate-800 text-brand-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-1.5 ${
              activeTab === 'practice'
                ? 'bg-slate-800 text-brand-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>All Scenarios</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-brand-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Progress & Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-1.5 ${
              activeTab === 'tips'
                ? 'bg-slate-800 text-brand-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Writing Tips</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-1.5 ${
              activeTab === 'about'
                ? 'bg-slate-800 text-brand-400 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
        </nav>

        {/* Right Action & Stats Pill */}
        <div className="flex items-center space-x-3">
          {/* Streak pill */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold cursor-pointer hover:bg-amber-500/20 transition-colors"
            title={`${stats.writingStreak} Day Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{stats.writingStreak}d</span>
          </div>

          {/* Quick Start Practice button */}
          <button
            onClick={onStartWriting}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-xs sm:text-sm font-semibold shadow-md shadow-brand-500/20 active:scale-95 transition-all duration-150"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Writing</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-slate-950 py-2 px-2 text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`py-1 px-2.5 rounded ${activeTab === 'home' ? 'text-brand-400 font-semibold' : 'text-slate-400'}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`py-1 px-2.5 rounded ${activeTab === 'practice' ? 'text-brand-400 font-semibold' : 'text-slate-400'}`}
        >
          Practice
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-1 px-2.5 rounded ${activeTab === 'dashboard' ? 'text-brand-400 font-semibold' : 'text-slate-400'}`}
        >
          Stats
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`py-1 px-2.5 rounded ${activeTab === 'tips' ? 'text-brand-400 font-semibold' : 'text-slate-400'}`}
        >
          Tips
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`py-1 px-2.5 rounded ${activeTab === 'about' ? 'text-brand-400 font-semibold' : 'text-slate-400'}`}
        >
          About
        </button>
      </div>
    </header>
  );
};

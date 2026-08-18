import React, { useState } from 'react';
import { PracticeScenario, EmailCategory, DifficultyLevel } from '../../types';
import { SCENARIOS, CATEGORIES } from '../../data/scenarios';
import { 
  Search, Clock, Sparkles, Filter, CheckCircle2, ChevronRight, Wand2,
  Briefcase, FileText, GraduationCap, Users, AlertCircle, HeartHandshake,
  Calendar, Kanban, MailCheck, Headphones, Code, TrendingUp, BookOpen
} from 'lucide-react';
import { CustomScenarioModal } from './CustomScenarioModal';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: PracticeScenario, chosenMinutes?: number) => void;
  selectedCategoryFilter?: EmailCategory | 'All';
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  FileText,
  GraduationCap,
  Users,
  AlertCircle,
  HeartHandshake,
  Calendar,
  Clock,
  Kanban,
  MailCheck,
  Headphones,
  Code,
  TrendingUp,
  BookOpen,
};

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  onSelectScenario,
  selectedCategoryFilter = 'All',
}) => {
  const [activeCategory, setActiveCategory] = useState<EmailCategory | 'All'>(selectedCategoryFilter);
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const filteredScenarios = SCENARIOS.filter((scenario) => {
    const matchesCategory = activeCategory === 'All' || scenario.category === activeCategory;
    const matchesDifficulty = activeDifficulty === 'All' || scenario.difficulty === activeDifficulty;
    const matchesSearch =
      searchQuery.trim() === '' ||
      scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'Beginner':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Beginner</span>;
      case 'Intermediate':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Intermediate</span>;
      case 'Advanced':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Advanced</span>;
      case 'Expert':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">Expert</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Email Practice Scenarios
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Choose a realistic scenario, draft independently under a timer, and receive instant AI analysis.
          </p>
        </div>

        <button
          onClick={() => setCustomModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-brand-500/30 text-brand-300 hover:text-white text-xs font-semibold shadow-md transition-all self-start md:self-auto"
        >
          <Wand2 className="w-4 h-4 text-brand-400" />
          <span>Create Custom Scenario</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search scenarios by title, recipient, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">Difficulty:</span>
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    activeDifficulty === diff
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition-all ${
                activeCategory === 'All'
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Categories ({SCENARIOS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = SCENARIOS.filter((s) => s.category === cat.name).length;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scenario Cards Grid */}
      {filteredScenarios.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800">
          <p className="text-slate-400 text-sm">No scenarios match your current search and filters.</p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setActiveDifficulty('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-brand-400 hover:underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => {
            const categoryMeta = CATEGORIES.find((c) => c.name === scenario.category);
            const Icon = categoryMeta ? iconMap[categoryMeta.icon] || Briefcase : Briefcase;

            return (
              <div
                key={scenario.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/40 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs text-brand-400 font-medium">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{scenario.category}</span>
                    </div>
                    {getDifficultyBadge(scenario.difficulty)}
                  </div>

                  {/* Title & Objective */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {scenario.objective}
                    </p>
                  </div>

                  {/* Recipient & Key Specs */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Recipient:</span>
                      <span className="font-semibold text-slate-200 truncate max-w-[180px]">
                        {scenario.recipient}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Requirements:</span>
                      <span className="font-semibold text-brand-400">
                        {scenario.requirements.length} Points
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Time */}
                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{scenario.timeLimitMinutes} Mins</span>
                  </div>

                  <button
                    onClick={() => onSelectScenario(scenario)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 group-hover:scale-105 transition-all"
                  >
                    <span>Start Challenge</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Scenario Modal */}
      <CustomScenarioModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        onSelectScenario={(sc) => onSelectScenario(sc)}
      />

    </div>
  );
};

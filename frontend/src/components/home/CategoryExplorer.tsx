import React from 'react';
import { CATEGORIES } from '../../data/scenarios';
import { EmailCategory } from '../../types';
import { 
  Briefcase, FileText, GraduationCap, Users, AlertCircle, HeartHandshake,
  Calendar, Clock, Kanban, MailCheck, Headphones, Code, TrendingUp, BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryExplorerProps {
  onSelectCategory: (category: EmailCategory) => void;
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

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 bg-slate-900/30 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-3 border border-brand-500/20">
              <span>Tailored Workplace Scenarios</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Explore 14 Professional Categories
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              From everyday status updates to high-stakes executive escalations, master the exact emails you encounter in your career.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Briefcase;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => onSelectCategory(cat.name)}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 hover:bg-slate-850/90 cursor-pointer transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-brand-500/20 transition-all">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-400 transition-colors">
                  <span>Practice Scenarios</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { X, Sparkles, Wand2, Loader2, AlertCircle } from 'lucide-react';
import { PracticeScenario, EmailCategory, DifficultyLevel } from '../../types';
import { CATEGORIES } from '../../data/scenarios';

interface CustomScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: PracticeScenario) => void;
}

export const CustomScenarioModal: React.FC<CustomScenarioModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
}) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<EmailCategory>('Business Communication');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [timeLimit, setTimeLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/scenarios/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category, difficulty }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate dynamic scenario');
      }

      const generated: PracticeScenario = await res.json();
      generated.timeLimitMinutes = timeLimit;
      onSelectScenario(generated);
      onClose();
    } catch (err: any) {
      console.warn('API error during custom scenario generation, using dynamic rich template:', err);
      const isSchool = category === 'Academic & School' || /school|teacher|principal|exam|leave for school/i.test(topic);
      const isHR = category === 'Leave Request' || category === 'Resignation & HR' || /leave|resignation|sick|vacation/i.test(topic);

      const recipient = isSchool ? 'Dr. Meenakshi Sundaram' : isHR ? 'Priya Sharma' : 'Vikram Malhotra';
      const recipientEmail = isSchool ? 'meenakshi.sundaram@stmarys-edu.org' : isHR ? 'priya.sharma@cloudforge.tech' : 'vikram.malhotra@techscale.io';
      const recipientRole = isSchool ? 'Dean of Academic Affairs & Program Director' : isHR ? 'Engineering Manager & Team Lead' : 'Director of Product Operations';
      const recipientExpectations = isSchool ? 'Requires formal academic protocol, exact event dates, and roll number.' : 'Expects clear task delegation, emergency reachability, and sprint milestone reassurance.';

      // Rich Fallback local generated scenario
      const fallback: PracticeScenario = {
        id: `custom-${Date.now()}`,
        title: topic ? `${topic}` : 'Strategic Workplace Communication Challenge',
        category,
        difficulty,
        senderName: 'Alex Morgan',
        senderEmail: 'alex.morgan@workspace.com (You)',
        senderRole: isSchool ? 'Student / Research Scholar' : 'Data Analyst / Associate Lead',
        recipient,
        recipientEmail,
        recipientRole,
        recipientExpectations,
        targetCc: difficulty === 'Advanced' || difficulty === 'Expert' ? (isSchool ? 'academics-records@stmarys-edu.org' : 'operations-leads@techscale.io') : undefined,
        ccContext: difficulty === 'Advanced' || difficulty === 'Expert' ? 'Maintain transparent team and record synchronization.' : undefined,
        objective: topic ? `Address ${topic} with thorough context, accountability, and professional courtesy.` : 'Communicate the proposal clearly, establish timelines, and outline actionable next steps.',
        context: `You are communicating with ${recipient} (${recipientRole}) regarding "${topic || 'an upcoming schedule adjustment'}". This matter requires proactive alignment to ensure that all ongoing commitments and deadlines remain fully covered without creating operational friction.`,
        backstoryDetails: {
          triggerEvent: `Specific requirement arose regarding "${topic || 'this event'}".`,
          stakes: 'Maintaining executive trust, operational continuity, and compliance with team standards.',
          keyPointsToCover: [
            'Direct, courteous opening with full context',
            'Specific dates, timelines, and commitments',
            'Colleague coverage or proactive mitigation steps'
          ]
        },
        requirements: [
          `Enter recipient in To: (${recipientEmail})`,
          'State the exact reason and timeline clearly in the opening paragraph',
          'Outline task coverage or specific arrangements to ensure continuity',
          'Include a polite, executive sign-off with contact availability'
        ],
        timeLimitMinutes: timeLimit,
      };
      onSelectScenario(fallback);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create Custom Scenario</h3>
              <p className="text-xs text-slate-400">Generate a custom scenario tailored to your workplace needs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              What topic or situation do you want to practice?
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Negotiating a freelance contract rate increase"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EmailCategory)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-brand-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Time Limit (Minutes)
            </label>
            <div className="flex items-center space-x-2">
              {[5, 10, 15, 20].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setTimeLimit(mins)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    timeLimit === mins
                      ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-2 shadow-md shadow-brand-600/20 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Scenario...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Create & Launch Practice</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

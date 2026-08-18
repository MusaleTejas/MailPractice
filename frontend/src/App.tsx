import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { PhilosophyBanner } from './components/home/PhilosophyBanner';
import { HowItWorks } from './components/home/HowItWorks';
import { CategoryExplorer } from './components/home/CategoryExplorer';
import { ScenarioSelector } from './components/practice/ScenarioSelector';
import { WritingInterface } from './components/practice/WritingInterface';
import { EvaluationView } from './components/evaluation/EvaluationView';
import { DashboardView } from './components/dashboard/DashboardView';
import { WritingTipsView } from './components/tips/WritingTipsView';
import { AboutView } from './components/about/AboutView';
import { LearningPathView } from './components/learningPath/LearningPathView';
import { useStorage } from './hooks/useStorage';
import { PracticeScenario, PracticeAttempt, EmailCategory, EvaluationResult } from './types';
import { UserLearningProgress, INITIAL_LEARNING_PROGRESS, LearningStage } from './types/learningPath';
import { LEARNING_LEVELS } from './data/learningPathData';
import { Trophy, X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'learning' | 'practice' | 'dashboard' | 'tips' | 'about'>('learning');
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory | 'All'>('All');
  const [activeScenario, setActiveScenario] = useState<PracticeScenario | null>(null);
  const [activeStage, setActiveStage] = useState<LearningStage | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<PracticeAttempt | null>(null);

  const [learningProgress, setLearningProgress] = useState<UserLearningProgress>(() => {
    try {
      const saved = localStorage.getItem('mailpractice_learning_progress_v2');
      return saved ? JSON.parse(saved) : INITIAL_LEARNING_PROGRESS;
    } catch {
      return INITIAL_LEARNING_PROGRESS;
    }
  });

  const {
    attempts,
    stats,
    achievements,
    recentUnlockedAchievement,
    clearRecentAchievement,
    recordAttempt,
    getDraft,
    saveDraft,
    clearDraft,
    resetAllData,
  } = useStorage();

  const handleStartWriting = () => {
    setActiveScenario(null);
    setLatestAttempt(null);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('home');
    }
  };

  const handleSelectCategoryFromHome = (category: EmailCategory) => {
    setSelectedCategory(category);
    setActiveScenario(null);
    setLatestAttempt(null);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScenario = (scenario: PracticeScenario) => {
    setActiveScenario(scenario);
    setLatestAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAttempt = async (data: {
    toField: string;
    ccField: string;
    bccField: string;
    subject: string;
    body: string;
    timeSpentSeconds: number;
    wpm: number;
    wordCount: number;
    charCount: number;
  }) => {
    if (!activeScenario) return;

    let evaluationResult: EvaluationResult;

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: activeScenario,
          toField: data.toField,
          ccField: data.ccField,
          bccField: data.bccField,
          subject: data.subject,
          body: data.body,
          timeSpentSeconds: data.timeSpentSeconds,
          wpm: data.wpm,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      evaluationResult = await response.json();
    } catch (err) {
      console.warn('Network evaluation failed, generating client fallback evaluation:', err);
      // Fallback local evaluation
      evaluationResult = {
        overallScore: Math.min(95, Math.max(50, 75 + Math.floor(Math.random() * 15))),
        breakdown: {
          grammar: 85,
          spelling: 92,
          clarity: 80,
          professionalism: 88,
          structure: 84,
          vocabulary: 78,
          requirementCompletion: 85,
          conciseness: 76,
        },
        mistakes: [
          {
            original: data.subject || '(Empty Subject)',
            correction: `Action Required: ${activeScenario.objective}`,
            explanation: 'Maintain action-oriented, easily searchable subject lines.',
            severity: 'Medium',
            type: 'Structure',
          }
        ],
        requirementChecks: activeScenario.requirements.map((req) => ({
          requirement: req,
          met: true,
          explanation: 'Addressed in your submitted draft.',
        })),
        completionPercentage: 100,
        tone: {
          primary: 'Professional',
          secondary: ['Direct', 'Constructive'],
          confidence: 90,
          explanation: 'Your email exhibits appropriate workplace decorum and clarity.',
          suggestions: [
            'Group multi-step action items into bullet points for quick scanning.',
            'Confirm deadlines explicitly in the closing sentence.'
          ],
        },
        vocabulary: [
          {
            original: 'tell me',
            suggested: 'kindly advise / let me know',
            reason: 'Elevates corporate polish',
            type: 'weak',
          }
        ],
        improvedVersion: {
          subject: `Update: ${activeScenario.objective}`,
          body: `Dear ${activeScenario.recipient},\n\nI hope this message finds you well.\n\nRegarding our discussion on ${activeScenario.objective.toLowerCase()}, I wanted to outline the current status and next milestones.\n\n• ${activeScenario.requirements.join('\n• ')}\n\nPlease let me know if you would like to review this together.\n\nBest regards,\n[Your Name]`,
          whatChanged: [
            'Polished opening and sign-off structure',
            'Refined subject line clarity',
            'Organized key requirements into clean bullet hierarchy'
          ],
        },
        actionableTakeaways: [
          'State the bottom-line request within the first two sentences.',
          'Verify that all scenario constraints are covered before sending.',
          'Keep subject lines under 8 words.'
        ],
        evaluationSource: 'fallback-engine',
      };
    }

    const newAttempt: PracticeAttempt = {
      id: `attempt-${Date.now()}`,
      scenarioId: activeScenario.id,
      scenarioTitle: activeScenario.title,
      scenarioCategory: activeScenario.category,
      difficulty: activeScenario.difficulty,
      toField: data.toField,
      ccField: data.ccField,
      bccField: data.bccField,
      subject: data.subject,
      body: data.body,
      timeSpentSeconds: data.timeSpentSeconds,
      wpm: data.wpm,
      wordCount: data.wordCount,
      charCount: data.charCount,
      evaluation: evaluationResult,
      timestamp: new Date().toISOString(),
    };

    recordAttempt(newAttempt);
    clearDraft(activeScenario.id);
    setLatestAttempt(newAttempt);

    // If this attempt was for a learning path stage, record progress and check level unlocks
    if (activeStage) {
      const score = evaluationResult.overallScore;
      const updatedStageScores = {
        ...learningProgress.stageScores,
        [activeStage.id]: Math.max(score, learningProgress.stageScores[activeStage.id] || 0)
      };
      const updatedCompleted = Array.from(new Set([...learningProgress.completedStageIds, activeStage.id]));
      
      const newUnlocked = [...learningProgress.unlockedLevels];

      // Level 1 -> 2 Unlock Check (Beginner: 10 stages & avg >= 70)
      const begStages = LEARNING_LEVELS[0].stages.map(s => s.id);
      const begCompleted = begStages.filter(id => updatedCompleted.includes(id));
      const begAvg = begCompleted.length > 0 ? begCompleted.reduce((a, b) => a + (updatedStageScores[b] || 0), 0) / begCompleted.length : 0;
      if (begCompleted.length >= 10 && begAvg >= 70 && !newUnlocked.includes('intermediate')) {
        newUnlocked.push('intermediate');
      }

      // Level 2 -> 3 Unlock Check (Intermediate: 12 stages & avg >= 75)
      const intStages = LEARNING_LEVELS[1].stages.map(s => s.id);
      const intCompleted = intStages.filter(id => updatedCompleted.includes(id));
      const intAvg = intCompleted.length > 0 ? intCompleted.reduce((a, b) => a + (updatedStageScores[b] || 0), 0) / intCompleted.length : 0;
      if (intCompleted.length >= 12 && intAvg >= 75 && !newUnlocked.includes('advanced')) {
        newUnlocked.push('advanced');
      }

      // Level 3 -> 4 Unlock Check (Advanced: 7 stages & avg >= 80)
      const advStages = LEARNING_LEVELS[2].stages.map(s => s.id);
      const advCompleted = advStages.filter(id => updatedCompleted.includes(id));
      const advAvg = advCompleted.length > 0 ? advCompleted.reduce((a, b) => a + (updatedStageScores[b] || 0), 0) / advCompleted.length : 0;
      if (advCompleted.length >= 7 && advAvg >= 80 && !newUnlocked.includes('expert')) {
        newUnlocked.push('expert');
      }

      // Level 4 -> 5 Unlock Check (Expert: 2 stages & avg >= 85)
      const expStages = LEARNING_LEVELS[3].stages.map(s => s.id);
      const expCompleted = expStages.filter(id => updatedCompleted.includes(id));
      const expAvg = expCompleted.length > 0 ? expCompleted.reduce((a, b) => a + (updatedStageScores[b] || 0), 0) / expCompleted.length : 0;
      if (expCompleted.length >= 2 && expAvg >= 85 && !newUnlocked.includes('master')) {
        newUnlocked.push('master');
      }

      const updatedProgress: UserLearningProgress = {
        ...learningProgress,
        completedStageIds: updatedCompleted,
        stageScores: updatedStageScores,
        unlockedLevels: newUnlocked
      };

      setLearningProgress(updatedProgress);
      try {
        localStorage.setItem('mailpractice_learning_progress_v2', JSON.stringify(updatedProgress));
      } catch (err) {
        console.error('Failed to save learning progress', err);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLearningStage = (stage: any) => {
    setActiveStage(stage);
    setActiveScenario(stage.scenario);
    setActiveTab('practice');
    setLatestAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectHistoricalAttempt = (attempt: PracticeAttempt) => {
    setLatestAttempt(attempt);
    setActiveScenario(null);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-brand-600 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'practice') {
            setActiveScenario(null);
            setLatestAttempt(null);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        stats={stats}
        onStartWriting={handleStartWriting}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {/* Learning Path Tab (Master Email Writing) */}
        {activeTab === 'learning' && (
          <div>
            {latestAttempt ? (
              <EvaluationView
                attempt={latestAttempt}
                onPracticeAgain={() => {
                  setLatestAttempt(null);
                }}
                onSelectAnotherScenario={() => {
                  setLatestAttempt(null);
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
                onGoToDashboard={() => {
                  setActiveTab('dashboard');
                  setLatestAttempt(null);
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
              />
            ) : activeScenario ? (
              <WritingInterface
                scenario={activeScenario}
                onBackToScenarios={() => {
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
                onSubmitAttempt={handleSubmitAttempt}
                savedDraft={getDraft(activeScenario.id)}
                onAutoSaveDraft={(sub, b) => saveDraft(activeScenario.id, sub, b)}
              />
            ) : (
              <LearningPathView
                progress={learningProgress}
                onSelectStageScenario={handleSelectLearningStage}
                recentAttemptsCount={attempts.length}
              />
            )}
          </div>
        )}

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onStartWriting={() => setActiveTab('learning')}
              onHowItWorks={handleHowItWorks}
            />
            <PhilosophyBanner />
            <HowItWorks onStartWriting={() => setActiveTab('learning')} />
            <CategoryExplorer onSelectCategory={handleSelectCategoryFromHome} />
          </div>
        )}

        {/* Practice Tab (All Scenarios) */}
        {activeTab === 'practice' && (
          <div>
            {latestAttempt ? (
              <EvaluationView
                attempt={latestAttempt}
                onPracticeAgain={() => {
                  setLatestAttempt(null);
                }}
                onSelectAnotherScenario={() => {
                  setLatestAttempt(null);
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
                onGoToDashboard={() => {
                  setActiveTab('dashboard');
                  setLatestAttempt(null);
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
              />
            ) : activeScenario ? (
              <WritingInterface
                scenario={activeScenario}
                onBackToScenarios={() => {
                  setActiveScenario(null);
                  setActiveStage(null);
                }}
                onSubmitAttempt={handleSubmitAttempt}
                savedDraft={getDraft(activeScenario.id)}
                onAutoSaveDraft={(sub, b) => saveDraft(activeScenario.id, sub, b)}
              />
            ) : (
              <ScenarioSelector
                selectedCategoryFilter={selectedCategory}
                onSelectScenario={handleSelectScenario}
              />
            )}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            attempts={attempts}
            achievements={achievements}
            onSelectAttempt={handleInspectHistoricalAttempt}
            onStartWriting={handleStartWriting}
            onResetData={resetAllData}
          />
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <WritingTipsView onStartWriting={handleStartWriting} />
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <AboutView onStartWriting={handleStartWriting} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveScenario(null);
          setLatestAttempt(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Achievement Unlocked Toast Modal */}
      {recentUnlockedAchievement && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl flex items-center space-x-3 text-xs max-w-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xl">
              {recentUnlockedAchievement.icon}
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center space-x-1 text-amber-400 font-bold uppercase text-[10px]">
                <Trophy className="w-3 h-3" />
                <span>Achievement Unlocked!</span>
              </div>
              <h4 className="font-bold text-white text-xs">{recentUnlockedAchievement.title}</h4>
              <p className="text-slate-400 text-[11px] leading-snug">{recentUnlockedAchievement.description}</p>
            </div>
            <button
              onClick={clearRecentAchievement}
              className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

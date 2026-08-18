import React, { useState, useEffect, useRef } from 'react';
import { PracticeScenario } from '../../types';
import { useTimer } from '../../hooks/useTimer';
import { 
  Clock, CheckSquare, Square, Send, AlertTriangle, ArrowLeft,
  Sparkles, Zap, AlignLeft, Info, HelpCircle, Loader2, Maximize2, Minimize2,
  Lock, Eye, EyeOff, ShieldAlert, User, AtSign, Mail, Flag, Target, Flame
} from 'lucide-react';

interface WritingInterfaceProps {
  scenario: PracticeScenario;
  onBackToScenarios: () => void;
  onSubmitAttempt: (data: {
    toField: string;
    ccField: string;
    bccField: string;
    subject: string;
    body: string;
    timeSpentSeconds: number;
    wpm: number;
    wordCount: number;
    charCount: number;
  }) => Promise<void>;
  savedDraft?: { subject: string; body: string } | null;
  onAutoSaveDraft: (subject: string, body: string) => void;
}

export const WritingInterface: React.FC<WritingInterfaceProps> = ({
  scenario,
  onBackToScenarios,
  onSubmitAttempt,
  savedDraft,
  onAutoSaveDraft,
}) => {
  const [toInput, setToInput] = useState('');
  const [subject, setSubject] = useState(savedDraft?.subject || '');
  const [body, setBody] = useState(savedDraft?.body || '');
  const [ccField, setCcField] = useState('');
  const [bccField, setBccField] = useState('');
  const [showCc, setShowCc] = useState(!!scenario.targetCc);
  const [showBcc, setShowBcc] = useState(!!scenario.targetBcc);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [pasteWarning, setPasteWarning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Text statistics
  const wordCount = body.trim() === '' ? 0 : body.trim().split(/\s+/).length;
  const charCount = body.length;
  const sentenceCount = body.trim() === '' ? 0 : body.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

  const handleTimeExpired = () => {
    if (!isSubmitting) {
      triggerSubmit();
    }
  };

  const timer = useTimer({
    initialMinutes: scenario.timeLimitMinutes,
    onTimeExpired: handleTimeExpired,
    wordCount,
  });

  // Auto-start timer upon mount
  useEffect(() => {
    timer.startTimer();
    return () => timer.pauseTimer();
  }, []);

  // Autosave draft
  useEffect(() => {
    const handler = setTimeout(() => {
      onAutoSaveDraft(subject, body);
    }, 1000);
    return () => clearTimeout(handler);
  }, [subject, body]);

  const toggleReq = (idx: number) => {
    setCheckedRequirements((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const triggerSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    timer.pauseTimer();

    try {
      await onSubmitAttempt({
        toField: toInput,
        ccField,
        bccField,
        subject,
        body,
        timeSpentSeconds: timer.elapsedSeconds,
        wpm: timer.liveWpm,
        wordCount,
        charCount,
      });
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  // Anti-Paste Handler
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setPasteWarning(true);
    setTimeout(() => setPasteWarning(false), 3500);
  };

  // Keyboard shortcut Ctrl+Enter to submit & Anti-Paste keystroke guard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      setPasteWarning(true);
      setTimeout(() => setPasteWarning(false), 3500);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      triggerSubmit();
    }
  };

  const senderDisplay = scenario.senderEmail || `${scenario.senderName || 'Alex Morgan'} <alex.morgan@techcorp.com>`;
  const recipientDisplay = scenario.recipientEmail 
    ? `${scenario.recipient} <${scenario.recipientEmail}>` 
    : `${scenario.recipient} <${scenario.recipient.toLowerCase().replace(/[^a-z0-9]/g, '.')}@domain.com>`;

  return (
    <div className={`min-h-screen ${isFocusMode ? 'bg-slate-950 p-3 md:p-6' : 'py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'}`}>
      
      {/* Top action header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Back to scenarios"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold tracking-wider text-brand-400">
                {scenario.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">{scenario.difficulty} Challenge</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {scenario.title}
            </h1>
          </div>
        </div>

        {/* Right Header Toolbar: Reference Model, Focus Mode & Timer */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {scenario.sampleAnswer && (
            <button
              onClick={() => setShowSampleModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-brand-500/30 text-brand-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">Reference Model Email</span>
            </button>
          )}

          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors hidden md:flex items-center space-x-1 text-xs"
            title={isFocusMode ? 'Exit Focus Mode' : 'Distraction-Free Mode'}
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Live Countdown Timer Display */}
          <div
            className={`px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold flex items-center space-x-2 border transition-all ${
              timer.isCritical
                ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                : timer.isWarning
                ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                : 'bg-slate-900 text-slate-200 border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timer.formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Persona Profiles, Context Backstory & Requirements */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* SENDER & RECIPIENT PERSONA PROFILES */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-md">
            
            {/* YOUR SENDER PERSONA */}
            <div>
              <div className="flex items-center space-x-1.5 text-[10px] text-brand-400 font-bold uppercase tracking-wider mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Your Role & Identity in this Scenario (From)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-brand-500/20 text-xs space-y-1">
                <div className="font-bold text-white text-sm flex items-center justify-between">
                  <span>{scenario.senderName || 'Alex Morgan'}</span>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono">You</span>
                </div>
                <div className="text-slate-300 font-medium">{scenario.senderRole}</div>
                <div className="text-[11px] text-slate-500 font-mono truncate">{scenario.senderEmail}</div>
              </div>
            </div>

            {/* RECIPIENT PROFILE */}
            <div>
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Target Recipient (To)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-white text-sm">{scenario.recipient}</div>
                <div className="text-slate-400 font-mono text-[11px]">{scenario.recipientEmail}</div>
                {scenario.recipientRole && (
                  <div className="text-slate-300 text-xs">{scenario.recipientRole}</div>
                )}
                {scenario.recipientExpectations && (
                  <div className="text-[11px] text-amber-300/90 pt-1 leading-snug">
                    <strong>Recipient Focus: </strong>{scenario.recipientExpectations}
                  </div>
                )}
              </div>
            </div>

            {/* TARGET CC / BCC STAKEHOLDERS (FOR ADVANCED & HIGH-STAKES SCENARIOS) */}
            {(scenario.targetCc || scenario.targetBcc) && (
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
                <div className="flex items-center space-x-1.5 text-[10px] text-purple-300 font-bold uppercase tracking-wider">
                  <AtSign className="w-3.5 h-3.5" />
                  <span>Required Stakeholder Routing (Cc / Bcc)</span>
                </div>

                {scenario.targetCc && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-brand-300 uppercase">Target Cc (Visibility):</span>
                    <p className="text-[11px] font-mono text-white bg-slate-950/80 p-1.5 rounded border border-slate-800">
                      {scenario.targetCc}
                    </p>
                    {scenario.ccContext && (
                      <p className="text-[10px] text-slate-400">{scenario.ccContext}</p>
                    )}
                  </div>
                )}

                {scenario.targetBcc && (
                  <div className="space-y-0.5 pt-1 border-t border-purple-500/20">
                    <span className="text-[10px] font-bold text-rose-300 uppercase">Target Bcc (Confidential Oversight):</span>
                    <p className="text-[11px] font-mono text-white bg-slate-950/80 p-1.5 rounded border border-slate-800">
                      {scenario.targetBcc}
                    </p>
                    {scenario.bccContext && (
                      <p className="text-[10px] text-slate-400">{scenario.bccContext}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* WRITING OBJECTIVE (SHOWN ONLY FOR BEGINNER & INTERMEDIATE TO CHALLENGE ADVANCED USERS) */}
            {(scenario.difficulty === 'Beginner' || scenario.difficulty === 'Intermediate') ? (
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                  Primary Goal
                </div>
                <p className="text-xs sm:text-sm text-brand-300 font-semibold leading-relaxed bg-brand-500/10 p-3 rounded-xl border border-brand-500/20">
                  {scenario.objective}
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed shadow-sm space-y-1">
                <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
                  <span>🧠 Strategic Decision Mode</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  No predefined goal or subject is provided. Analyze the workplace backstory and stakeholder stakes below to decide your own subject line, diplomatic stance, and email strategy.
                </p>
              </div>
            )}
          </div>

          {/* REAL-WORLD WORKPLACE CONTEXT & BACKSTORY */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-md">
            <div className="flex items-center space-x-1.5 text-xs uppercase font-bold text-white tracking-wider">
              <Flag className="w-4 h-4 text-emerald-400" />
              <span>Workplace Context & Backstory</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {scenario.context}
            </p>

            {scenario.backstoryDetails && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400 block">⚡ What Triggered This:</span>
                  <p className="text-slate-300 text-xs leading-snug">{scenario.backstoryDetails.triggerEvent}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-400 block">🎯 Stakes & Outcome:</span>
                  <p className="text-slate-300 text-xs leading-snug">{scenario.backstoryDetails.stakes}</p>
                </div>
              </div>
            )}
          </div>

          {/* REQUIREMENTS CHECKLIST */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                Requirements Checklist ({Object.values(checkedRequirements).filter(Boolean).length}/{scenario.requirements.length})
              </span>
              <span className="text-[10px] text-slate-500">Strike off as you write</span>
            </div>

            <div className="space-y-2">
              {scenario.requirements.map((req, idx) => {
                const isChecked = !!checkedRequirements[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleReq(idx)}
                    className={`p-2.5 rounded-xl border text-xs flex items-start space-x-2.5 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-400 line-through opacity-75'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <span className="leading-snug">{req}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Realistic Email Composer Client */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          
          {/* Composer Window */}
          <div className="rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden focus-within:border-brand-500/50 transition-colors">
            
            {/* Realistic Email Client Top Window Bar */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 font-medium pl-2">
                  New Message — MailPractice Composer
                </span>
              </div>

              {/* Anti-Paste Indicator Badge */}
              <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Anti-Paste Guard Active</span>
              </div>
            </div>

            {/* Email Header Fields (From, To, Cc, Bcc, Subject) */}
            <div className="p-4 space-y-3 bg-slate-900/80 border-b border-slate-800/80 text-xs">
              
              {/* FROM FIELD (Tailored to scenario role) */}
              <div className="flex items-center">
                <span className="w-16 text-slate-400 font-semibold uppercase text-[10px]">From:</span>
                <div className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950/70 text-slate-200 font-mono text-xs border border-slate-800">
                  {senderDisplay}
                </div>
              </div>

              {/* TO FIELD (Interactive user input) */}
              <div className="flex items-center">
                <span className="w-16 text-slate-400 font-semibold uppercase text-[10px]">To:</span>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={toInput}
                      onChange={(e) => setToInput(e.target.value)}
                      placeholder={`Enter recipient name or email (e.g. ${scenario.recipientEmail || scenario.recipient})...`}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 text-white font-mono text-xs border border-slate-800 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="space-x-2 text-slate-400 font-sans font-semibold text-[11px] shrink-0 pl-1">
                    {!showCc && (
                      <button
                        type="button"
                        onClick={() => setShowCc(true)}
                        className="hover:text-brand-400 transition-colors"
                      >
                        +Cc
                      </button>
                    )}
                    {!showBcc && (
                      <button
                        type="button"
                        onClick={() => setShowBcc(true)}
                        className="hover:text-brand-400 transition-colors"
                      >
                        +Bcc
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CC FIELD (Toggleable) */}
              {showCc && (
                <div className="flex items-center animate-in fade-in">
                  <span className="w-16 text-slate-400 font-semibold uppercase text-[10px]">Cc:</span>
                  <input
                    type="text"
                    value={ccField}
                    onChange={(e) => setCcField(e.target.value)}
                    placeholder="Add carbon copy recipients..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* BCC FIELD (Toggleable) */}
              {showBcc && (
                <div className="flex items-center animate-in fade-in">
                  <span className="w-16 text-slate-400 font-semibold uppercase text-[10px]">Bcc:</span>
                  <input
                    type="text"
                    value={bccField}
                    onChange={(e) => setBccField(e.target.value)}
                    placeholder="Add blind carbon copy recipients..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* SUBJECT FIELD */}
              <div className="flex items-center">
                <span className="w-16 text-slate-400 font-semibold uppercase text-[10px]">Subject:</span>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. [Request] Q2 Operations Report — 2-Day Extension"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 text-white font-semibold text-xs sm:text-sm border border-slate-800 focus:outline-none focus:border-brand-500"
                  />
                  {subject.trim().length > 0 && (
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400">
                      {subject.length} chars
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Email Body Editor Area */}
            <div className="relative p-4 bg-slate-900/60">
              
              {/* Paste Warning Banner */}
              {pasteWarning && (
                <div className="absolute top-4 left-4 right-4 z-30 p-3 rounded-xl bg-rose-500/90 text-white text-xs font-semibold shadow-xl flex items-center space-x-2 animate-in fade-in">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>
                    Direct typing is required! Copy-pasting is disabled to ensure authentic practice and accurate AI/WPM scoring.
                  </span>
                </div>
              )}

              <textarea
                ref={textareaRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onPaste={handlePaste}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onKeyDown={handleKeyDown}
                placeholder={`Dear ${scenario.recipient.split(' ')[0] || 'Recipient'},\n\nI hope this email finds you well.\n\nI am writing to...`}
                rows={15}
                className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none resize-y editor-textarea leading-relaxed"
              />

              {/* Composer Bottom Toolbar Hints */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-3 text-slate-400">
                  <span className="text-[11px]">Tip: Lead with the bottom line in line 1 (BLUF principle).</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {wordCount > 0 ? `${wordCount} words` : 'Start typing to begin'}
                </span>
              </div>

            </div>

          </div>

          {/* Live Metrics & Submit Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            
            {/* Live Metrics Row */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs text-slate-400 font-mono">
              <div>
                <span>Words: </span>
                <strong className="text-white">{wordCount}</strong>
              </div>
              <div>
                <span>Chars: </span>
                <strong className="text-white">{charCount}</strong>
              </div>
              <div>
                <span>Sentences: </span>
                <strong className="text-white">{sentenceCount}</strong>
              </div>
              <div className="flex items-center space-x-1 text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>Speed: </span>
                <strong>{timer.liveWpm} WPM</strong>
              </div>
            </div>

            {/* Submit & Shortcut */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <span className="text-[11px] text-slate-400 hidden md:inline">Ctrl + Enter</span>
              <button
                onClick={triggerSubmit}
                disabled={isSubmitting || (wordCount < 5 && subject.trim() === '')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI Coach Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Analyze Email</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Reference Model Answer Modal */}
      {showSampleModal && scenario.sampleAnswer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-brand-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-base font-bold text-white">Reference Model Email & Rationale</h3>
              </div>
              <button
                onClick={() => setShowSampleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Model Subject Line:</span>
                <span className="text-emerald-400 font-semibold">{scenario.sampleAnswer.subject}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 text-slate-200 whitespace-pre-wrap leading-relaxed">
                {scenario.sampleAnswer.body}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
              <span className="font-bold text-blue-300 block uppercase text-[10px]">Why This Email is Effective:</span>
              <p className="text-slate-300 leading-relaxed font-sans">{scenario.sampleAnswer.whyItWorks}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSampleModal(false)}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
              >
                Back to Writing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Leave writing session?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your draft will remain saved locally, but your active timer will reset.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Continue Writing
              </button>
              <button
                onClick={onBackToScenarios}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white"
              >
                Exit Session
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  initialMinutes: number;
  onTimeExpired: () => void;
  wordCount: number;
}

export function useTimer({ initialMinutes, onTimeExpired, wordCount }: UseTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasExpired, setHasExpired] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback((newMinutes?: number) => {
    const mins = newMinutes || initialMinutes;
    setSecondsRemaining(mins * 60);
    setIsRunning(false);
    setHasExpired(false);
    startTimeRef.current = null;
  }, [initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setHasExpired(true);
            onTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, onTimeExpired]);

  const elapsedSeconds = totalSeconds - secondsRemaining;
  const elapsedMinutes = Math.max(0.1, elapsedSeconds / 60);
  const liveWpm = Math.round(wordCount / elapsedMinutes);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.round(((totalSeconds - secondsRemaining) / totalSeconds) * 100);

  return {
    secondsRemaining,
    elapsedSeconds,
    isRunning,
    hasExpired,
    liveWpm: isNaN(liveWpm) ? 0 : liveWpm,
    startTimer,
    pauseTimer,
    resetTimer,
    formattedTime: formatTime(secondsRemaining),
    progressPercentage,
    isWarning: secondsRemaining <= 60 && secondsRemaining > 0,
    isCritical: secondsRemaining <= 30 && secondsRemaining > 0,
  };
}

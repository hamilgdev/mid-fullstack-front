import { useContext } from 'react';
import { ReadingTimerContext } from '@/contexts/studio/reading-timer.context';

export const useReadingTimerContext = () => {
  const context = useContext(ReadingTimerContext);
  if (context === undefined) {
    throw new Error('useReadingTimerContext must be used within a ReadingTimerProvider');
  }
  return context;
};

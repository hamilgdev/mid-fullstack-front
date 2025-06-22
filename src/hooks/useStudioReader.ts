import { useContext } from 'react';
import { StudioReaderContext } from '@/contexts/studio/studio-reader.context';

export const useStudioReader = () => {
  const context = useContext(StudioReaderContext);
  if (context === undefined) {
    throw new Error('useStudioReader must be used within a StudioReaderProvider');
  }
  return context;
};

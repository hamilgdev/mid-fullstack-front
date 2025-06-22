import { useContext } from 'react';
import { StudioReaderContext } from '@/contexts/studio/studio-reader.context';

export const useStudioReaderContext = () => {
  const context = useContext(StudioReaderContext);
  if (context === undefined) {
    throw new Error('useStudioReaderContext must be used within a StudioReaderProvider');
  }
  return context;
};

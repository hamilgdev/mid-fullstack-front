import { createContext, useCallback, useEffect, useRef, useState } from 'react';

interface ReadingTimerContextType {
  secondsTotal: number;
  secondsByPage: Record<number, number>;
  currentPageStartTime: number;
  registerPageChange: (
    prevPageIndex: number | null,
    newPageIndex: number | null
  ) => void;
  finishTrackingReading: () => {
    total: number;
    perPage: Record<number, number>;
  };
  resetReading: () => void;
  initializeReading: (startingPageIndex: number) => void;
}

const ReadingTimerContext = createContext<ReadingTimerContextType | undefined>(
  undefined
);

export const ReadingTimerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [secondsTotal, setSecondsTotal] = useState(0);
  const [secondsByPage, setSecondsByPage] = useState<Record<number, number>>(
    {}
  );
  const pageStartTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondsByPageRef = useRef<Record<number, number>>({});

  useEffect(() => {
    secondsByPageRef.current = secondsByPage;
  }, [secondsByPage]);

  const startTracking = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSecondsTotal((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const initializeReading = useCallback(
    (startingPageIndex: number) => {
      setCurrentPageIndex(startingPageIndex);
      pageStartTimeRef.current = Date.now();
      startTracking();
    },
    [startTracking]
  );

  const registerPageChange = useCallback(
    (prevPageIndex: number | null, newPageIndex: number | null) => {
      const now = Date.now();

      if (prevPageIndex !== null) {
        const duration = Math.floor((now - pageStartTimeRef.current) / 1000);
        setSecondsByPage((prev) => ({
          ...prev,
          [prevPageIndex]: (prev[prevPageIndex] || 0) + duration,
        }));
        console.log(
          `⏱️ Página ${prevPageIndex} tiempo de lectura: ${duration} segundos`
        );
      }
      setCurrentPageIndex(newPageIndex);
      pageStartTimeRef.current = now;
    },
    []
  );

  const finishTrackingReading = useCallback(() => {
    stopTracking();
    const now = Date.now();

    let finalSecondsByPage = { ...secondsByPageRef.current };

    if (currentPageIndex !== null) {
      const duration = Math.floor((now - pageStartTimeRef.current) / 1000);
      finalSecondsByPage = {
        ...finalSecondsByPage,
        [currentPageIndex]:
          (finalSecondsByPage[currentPageIndex] || 0) + duration,
      };
    }

    const metrics = {
      total: secondsTotal,
      perPage: finalSecondsByPage,
    };
    return metrics;
  }, [currentPageIndex, secondsTotal, stopTracking]);

  const resetReading = useCallback(() => {
    stopTracking();
    setSecondsTotal(0);
    setSecondsByPage({});
    setCurrentPageIndex(null);
    pageStartTimeRef.current = Date.now();
    secondsByPageRef.current = {};
  }, [stopTracking]);

  const value: ReadingTimerContextType = {
    secondsTotal,
    secondsByPage,
    currentPageStartTime: pageStartTimeRef.current,
    registerPageChange,
    finishTrackingReading,
    resetReading,
    initializeReading,
  };

  return (
    <ReadingTimerContext.Provider value={value}>
      {children}
    </ReadingTimerContext.Provider>
  );
};

export { ReadingTimerContext };
export type { ReadingTimerContextType };

import { useStudioReaderContext } from '@/hooks/use-studio-reader-context';
import { css } from 'styled-system/css';
import { useReadingTimerContext } from '@/hooks/use-reading-timer-context';
import { useEffect, useRef } from 'react';

export const BookReaderControls = () => {
  const {
    registerPageChange,
    finishTrackingReading,
    resetReading,
    initializeReading,
  } = useReadingTimerContext();

  const {
    isFirstPage,
    isLastPage,
    previousPage,
    nextPage,
    finishReading,
    currentPageIndex,
    totalPages,
  } = useStudioReaderContext();

  const prevPageIndexRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      initializeReading(currentPageIndex);
      isInitializedRef.current = true;
      prevPageIndexRef.current = currentPageIndex;
    }
  }, [initializeReading, currentPageIndex]);

  useEffect(() => {
    if (
      isInitializedRef.current &&
      prevPageIndexRef.current !== currentPageIndex
    ) {
      registerPageChange(prevPageIndexRef.current, currentPageIndex);
      prevPageIndexRef.current = currentPageIndex;
    }
  }, [registerPageChange, currentPageIndex]);

  const handleNext = () => {
    if (isLastPage) {
      registerPageChange(currentPageIndex, null);

      setTimeout(() => {
        const metrics = finishTrackingReading();
        finishReading(metrics);
        resetReading();
      }, 100);
    } else {
      nextPage();
    }
  };

  return (
    <footer
      className={css({
        width: '100%',
        backgroundColor: 'gray.50',
        color: 'gray.800',
        display: 'flex',
        fontSize: 'sm',
        borderRadius: 'md',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: '1px',
        borderColor: 'gray.200',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          width: '100%',
          maxWidth: '4xl',
        })}
      >
        <button
          onClick={previousPage}
          disabled={isFirstPage}
          className={css({
            backgroundColor: 'transparent',
            border: 'none',
            cursor: isFirstPage ? 'not-allowed' : 'pointer',
            color: isFirstPage ? 'gray.400' : 'gray.700',
            fontSize: 'sm',
            fontWeight: 'medium',
            padding: '2',
            borderRadius: 'md',
            _hover: {
              textDecoration: !isFirstPage ? 'underline' : 'none',
              backgroundColor: !isFirstPage ? 'gray.100' : 'transparent',
            },
            _disabled: {
              opacity: 0.5,
            },
          })}
        >
          ← Anterior
        </button>

        <div
          className={css({
            fontSize: 'xs',
            color: 'gray.500',
            fontWeight: 'medium',
          })}
        >
          {currentPageIndex + 1} de {totalPages}
        </div>

        <button
          onClick={handleNext}
          className={css({
            backgroundColor: isLastPage ? 'blue.600' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: isLastPage ? 'white' : 'gray.700',
            fontSize: 'sm',
            fontWeight: 'medium',
            padding: '2',
            borderRadius: 'md',
            _hover: {
              textDecoration: !isLastPage ? 'underline' : 'none',
              backgroundColor: isLastPage ? 'blue.700' : 'gray.100',
            },
          })}
        >
          {isLastPage ? 'Finalizar' : 'Siguiente →'}
        </button>
      </div>
    </footer>
  );
};

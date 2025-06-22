import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Book, BookePage } from '@/interfaces/book.interface';

interface StudioReaderState {
  book: Book | null;
  currentPageIndex: number;
  currentPage: BookePage | null;
  isFirstPage: boolean;
  isLastPage: boolean;
  totalPages: number;
}

interface StudioReaderContextType extends StudioReaderState {
  setBook: (book: Book) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (pageIndex: number) => void;
  finishReading: () => void;
  resetReader: () => void;
}

const StudioReaderContext = createContext<StudioReaderContextType | undefined>(
  undefined
);

interface StudioReaderProviderProps {
  children: ReactNode;
}

export const StudioReaderProvider = ({
  children,
}: StudioReaderProviderProps) => {
  const [book, setBookState] = useState<Book | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const currentPage = book?.pages[currentPageIndex] || null;
  const totalPages = book?.pages.length || 0;
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === totalPages - 1;

  const setBook = useCallback((newBook: Book) => {
    setBookState(newBook);
    setCurrentPageIndex(0);
  }, []);

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  }, [isLastPage]);

  const previousPage = useCallback(() => {
    if (!isFirstPage) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  }, [isFirstPage]);

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < totalPages) {
        setCurrentPageIndex(pageIndex);
      }
    },
    [totalPages]
  );

  const finishReading = useCallback(() => {
    // TODO: Implementar lógica para finalizar la lectura del libro
    console.log('Lectura finalizada');
    setBookState(null);
    setCurrentPageIndex(0);
  }, []);

  const resetReader = useCallback(() => {
    setBookState(null);
    setCurrentPageIndex(0);
  }, []);

  const value: StudioReaderContextType = {
    book,
    currentPageIndex,
    currentPage,
    isFirstPage,
    isLastPage,
    totalPages,
    setBook,
    nextPage,
    previousPage,
    goToPage,
    finishReading,
    resetReader,
  };

  return (
    <StudioReaderContext.Provider value={value}>
      {children}
    </StudioReaderContext.Provider>
  );
};

export { StudioReaderContext };
export type { StudioReaderContextType };

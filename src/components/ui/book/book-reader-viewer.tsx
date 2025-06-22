import { useEffect } from 'react';
import type { Book } from '@/interfaces/book.interface';
import { css } from 'styled-system/css';
import { vstack, center } from 'styled-system/patterns';

import { useStudioReaderContext } from '@/hooks/use-studio-reader-context';

interface BookReaderViewerProps {
  book: Book;
}

export const BookReaderViewer = ({ book }: BookReaderViewerProps) => {
  const { setBook, currentPage } = useStudioReaderContext();

  useEffect(() => {
    if (book) setBook(book);
  }, [book, setBook]);

  if (!currentPage) {
    return (
      <main
        className={css({
          width: '100%',
          backgroundColor: 'white',
          fontFamily: 'body',
          fontSize: 'md',
          color: 'gray.800',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <p>Cargando página...</p>
      </main>
    );
  }

  return (
    <main
      className={css({
        width: '100%',
        backgroundColor: 'white',
        fontFamily: 'body',
        fontSize: 'md',
        color: 'gray.800',
        flex: 1,
        overflow: 'auto',
      })}
    >
      <div
        className={center({
          width: '100%',
          height: '100%',
          padding: '8',
        })}
      >
        <div
          className={vstack({
            width: '100%',
            gap: '6',
            alignItems: 'center',
            textAlign: 'center',
          })}
        >
          <div
            className={css({
              fontSize: 'sm',
              color: 'gray.500',
              fontWeight: 'medium',
            })}
          >
            Página {currentPage.number}
          </div>

          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              color: 'gray.900',
              marginBottom: '4',
            })}
          >
            {currentPage.chapter}
          </h2>

          <div
            className={css({
              fontSize: 'lg',
              lineHeight: 'relaxed',
              color: 'gray.700',
              textAlign: 'justify',
              maxWidth: '3xl',
            })}
          >
            {currentPage.content}
          </div>
        </div>
      </div>
    </main>
  );
};

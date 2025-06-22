import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import type { Book } from '@/interfaces/book.interface';

import { css } from 'styled-system/css';
import { useBooks } from '@/hooks/use-books';

import StudioReaderLayout from '@/components/layouts/studio/studio-reader-layout';
import { StudioReaderProvider } from '@/contexts/studio/studio-reader.context';
import { useStudioReaderContext } from '@/hooks/use-studio-reader-context';

import { BookReaderHeader } from '@/components/ui/book/book-reader-header';
import { BookReaderControls } from '@/components/ui/book/book-reader-controls';
import { BookReaderViewer } from '@/components/ui/book/book-reader-viewer';
import { BookReaderSummary } from '@/components/ui/book/book-reader-summary';
import { vstack } from 'styled-system/patterns';
import { ReadingTimerProvider } from '@/contexts/studio/reading-timer.context';

const BookReaderContent = ({ book }: { book: Book }) => {
  const { isReadingFinished, readingMetrics } = useStudioReaderContext();

  if (isReadingFinished && readingMetrics) {
    return (
      <StudioReaderLayout>
        <BookReaderSummary bookTitle={book.title} metrics={readingMetrics} />
      </StudioReaderLayout>
    );
  }

  return (
    <StudioReaderLayout>
      <div
        className={vstack({
          alignItems: 'stretch',
          width: '100%',
          height: '100%',
        })}
      >
        <BookReaderHeader title={book.title} />
        <BookReaderViewer book={book} />
        <BookReaderControls />
      </div>
    </StudioReaderLayout>
  );
};

const BookReaderPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { book, fetcherGetBookBySlug, onAir } = useBooks();

  useEffect(() => {
    if (!slug) return;
    fetcherGetBookBySlug(slug);
  }, [slug, fetcherGetBookBySlug]);

  if (onAir) {
    return <p>Cargando...</p>;
  }

  if (!onAir && !slug) {
    return (
      <div className={css({ padding: '4' })}>
        <h1>Contenido no encontrado</h1>
        <p>No se pudo cargar el contenido del libro "{slug}".</p>
        <NavLink to='/studio'>Volver al inicio</NavLink>
      </div>
    );
  }

  if (!book || book.slug !== slug) {
    return (
      <div className={css({ padding: '4' })}>
        <h1>Libro no encontrado</h1>
        <p>No se pudo encontrar el libro con el slug "{slug}".</p>
        <NavLink to='/studio'>Volver al inicio</NavLink>
      </div>
    );
  }

  return (
    <ReadingTimerProvider>
      <StudioReaderProvider>
        <BookReaderContent book={book} />
      </StudioReaderProvider>
    </ReadingTimerProvider>
  );
};

export default BookReaderPage;

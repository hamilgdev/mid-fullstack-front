import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import { BookDetailsSection } from '@/components/sections/studio/book-details/book-details-section';
import { useBooks } from '@/hooks/use-books';
import { css } from 'styled-system/css';

const BookDetailsPage = () => {
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

  return <BookDetailsSection book={book} />;
};

export default BookDetailsPage;

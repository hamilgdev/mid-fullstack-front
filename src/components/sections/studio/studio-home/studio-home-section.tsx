import { css } from 'styled-system/css';
import { useAuthContext } from '@/hooks/use-auth-context';

import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';
import { SectionWrapper } from '@/components/ui/wrappers/section-wrapper/section-wrapper';

import { BooksList } from '@/components/ui/lists/books/books-list';
import { useBooks } from '@/hooks/use-books';
import { useEffect } from 'react';

export const StudioHomeSection = () => {
  const { user, isAuthenticated } = useAuthContext();

  const { fetcherGetBooks, books, onAir } = useBooks();

  const userName = user?.name;

  useEffect(() => {
    if (!isAuthenticated) return;
    fetcherGetBooks();
  }, [isAuthenticated, fetcherGetBooks]);

  return (
    <SectionWrapper>
      <ContainerWrapper>
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            marginBottom: '4',
            color: 'gray.800',
          })}
        >
          Bienvenido de vuelta, {userName}
        </h1>

        {onAir && <p>loading...</p>}

        {!onAir && books && books.length === 0 && (
          <p className={css({ color: 'gray.600' })}>
            No tienes libros en tu biblioteca.
          </p>
        )}

        {!onAir && books && books.length > 0 && <BooksList books={books} />}
      </ContainerWrapper>
    </SectionWrapper>
  );
};

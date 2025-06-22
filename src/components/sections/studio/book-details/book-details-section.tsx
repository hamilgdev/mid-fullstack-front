import { NavLink } from 'react-router-dom';

import type { Book } from '@/interfaces/book.interface';
import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';
import { SectionWrapper } from '@/components/ui/wrappers/section-wrapper/section-wrapper';
import { css } from 'styled-system/css';
import { vstack } from 'styled-system/patterns';

interface BookDetailsSectionProps {
  book: Book;
}

export const BookDetailsSection = ({ book }: BookDetailsSectionProps) => {
  const { title, author, description, pages } = book;

  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className={vstack({ textAlign: 'center' })}>
          <NavLink to='/studio' className={css({ textDecoration: 'none' })}>
            <span className={css({ color: 'blue.500', fontSize: 'lg' })}>
              Volver a la biblioteca
            </span>
          </NavLink>

          <div
            className={css({
              backgroundColor: 'white',
              borderRadius: 'md',
              boxShadow: 'xs',
              border: '1px solid',
              borderColor: 'gray.200',
              maxWidth: '800px',
              marginInline: 'auto',
              width: '100%',
              padding: '8',
            })}
          >
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: 'bold',
                marginBottom: '4',
                color: 'gray.800',
              })}
            >
              {title}
            </h1>

            <p className={css({ color: 'gray.600', marginBottom: '2' })}>
              Autor: {author}
            </p>

            <p className={css({ color: 'gray.600' })}>{description}</p>

            <small className={css({ color: 'gray.600' })}>
              Número de páginas: {pages.length}
            </small>
          </div>

          <NavLink to={`/studio/book-reader/${book.slug}`}>
            <button
              className={css({
                marginTop: '6',
                padding: '3',
                backgroundColor: 'blue.500',
                color: 'white',
                borderRadius: 'md',
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'blue.600',
                },
              })}
            >
              Comenzar lectura
            </button>
          </NavLink>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
};

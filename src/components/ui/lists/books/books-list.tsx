import { NavLink } from 'react-router-dom';
import { css } from 'styled-system/css';
import type { Book } from '@/interfaces/book.interface';
import { BookCard } from '@/components/ui/cards/books/book-card';

interface BooksListProps {
  books: Book[];
}

export const BooksList = ({ books }: BooksListProps) => {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: {
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: '4',
        width: '100%',
      })}
    >
      {books.map(({ guid, title, slug, description, author, pages }) => (
        <NavLink to={`/studio/book-details/${slug}`} key={guid}>
          <BookCard
            title={title}
            description={description}
            author={author}
            numberOfPages={pages.length}
          />
        </NavLink>
      ))}
    </div>
  );
};

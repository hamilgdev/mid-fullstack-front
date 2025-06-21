import { css } from 'styled-system/css';

interface BookCardProps {
  title: string;
  description: string;
  author: string;
  numberOfPages: number;
}

export const BookCard = ({
  title,
  description,
  author,
  numberOfPages,
}: BookCardProps) => {
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        padding: '4',
        borderRadius: 'md',
        boxShadow: 'xs',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'gray.200',
        '&:hover': {
          boxShadow: 'md',
        },
      })}
    >
      <div className={css({ flexGrow: 1 })}>
        <h2
          className={css({
            fontSize: 'lg',
            fontWeight: 'bold',
            color: 'gray.800',
            marginBottom: '2',
          })}
        >
          {title}
        </h2>
        <p
          className={css({
            fontSize: 'sm',
            color: 'gray.600',
            marginBottom: '2',
          })}
        >
          {description}
        </p>
      </div>
      <footer
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2',
        })}
      >
        <span
          className={css({
            fontSize: 'sm',
            color: 'gray.500',
          })}
        >
          Autor: {author}
        </span>
        <span
          className={css({
            fontSize: 'sm',
            color: 'gray.500',
          })}
        >
          Páginas: {numberOfPages}
        </span>
      </footer>
    </article>
  );
};

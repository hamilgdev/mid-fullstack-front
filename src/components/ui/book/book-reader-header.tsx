import { css } from 'styled-system/css';
import { NavLink } from 'react-router-dom';

interface BookReaderHeaderProps {
  title: string;
}

export const BookReaderHeader = ({ title }: BookReaderHeaderProps) => {
  return (
    <header
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4',
        borderColor: 'gray.200',
        borderBottomWidth: '1px',
        borderRadius: 'md',
        boxShadow: 'xs',
      })}
    >
      <NavLink to='/studio' className={css({ textDecoration: 'none' })}>
        <span className={css({ color: 'blue.500', fontSize: 'lg' })}>
          Volver a la biblioteca
        </span>
      </NavLink>

      <div className=''>
        <h1
          className={css({
            fontSize: 'base',
            color: 'gray.500',
          })}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

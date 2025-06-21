import { css } from 'styled-system/css';

export const Logo = () => {
  return (
    <h1
      className={css({
        fontSize: 'large',
        fontWeight: 'bold',
        fontFamily: 'monospace',
      })}
    >
      BookReader
    </h1>
  );
};

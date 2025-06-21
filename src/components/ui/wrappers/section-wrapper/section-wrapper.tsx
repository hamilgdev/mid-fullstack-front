import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

export const SectionWrapper = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SystemStyleObject;
}) => {
  return (
    <section
      className={css({
        paddingBlock: '4',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: { base: '0', xl: '8' },
        ...sx,
      })}
    >
      {children}
    </section>
  );
};

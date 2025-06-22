import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

export const ContainerWrapper = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SystemStyleObject;
}) => {
  return (
    <div
      className={css({
        paddingInline: { base: '4', xl: '0' },
        maxWidth: '1280px',
        marginInline: 'auto',
        width: '100%',
        height: '100%',
        ...sx,
      })}
    >
      {children}
    </div>
  );
};

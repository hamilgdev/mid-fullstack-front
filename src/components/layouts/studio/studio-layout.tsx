import { StudioHeader } from '@/components/ui/headers/studio-header/studio-header';
import { StudioSiderbar } from '@/components/ui/sidebars/studio/studio-siderbar';
import { Outlet, useLocation } from 'react-router-dom';
import { css } from 'styled-system/css';

const StudioLayout = () => {
  const location = useLocation();
  const isBookReaderRoute = location.pathname.includes('/book-reader');

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: { base: 'column', lg: 'row' },
        height: '100dvh',
      })}
    >
      {!isBookReaderRoute && (
        <>
          <div
            className={css({
              display: { base: 'none', lg: 'flex' },
              minWidth: '300px',
            })}
          >
            <StudioSiderbar />
          </div>

          <div className={css({ display: { base: 'flex', lg: 'none' } })}>
            <StudioHeader />
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default StudioLayout;

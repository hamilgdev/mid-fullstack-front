import { StudioSiderbar } from '@/components/ui/sidebars/studio/studio-siderbar';
import { Outlet, useLocation } from 'react-router-dom';
import { css } from 'styled-system/css';

const StudioLayout = () => {
  const location = useLocation();
  const isBookReaderRoute = location.pathname.includes('/book-reader');

  return (
    <div className={css({ display: 'flex', height: '100dvh' })}>
      {!isBookReaderRoute && <StudioSiderbar />}
      <Outlet />
    </div>
  );
};

export default StudioLayout;

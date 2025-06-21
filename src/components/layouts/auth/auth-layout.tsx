import { Outlet } from 'react-router-dom';
import { css } from 'styled-system/css';

import { PublicHeader } from '@/components/ui/headers/public-header/public-header';

const AuthLayout = () => {
  return (
    <>
      <PublicHeader />
      <main
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        })}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

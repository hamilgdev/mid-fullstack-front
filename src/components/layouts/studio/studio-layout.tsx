import { Logo } from '@/components/ui/logo/logo';
import { useAuthContext } from '@/hooks/useAuthHook';
import { NavLink, Outlet } from 'react-router-dom';
import { css } from 'styled-system/css';

const StudioLayout = () => {
  const { logout } = useAuthContext();

  return (
    <div className={css({ display: 'flex', height: '100dvh' })}>
      <aside
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4',
          padding: '6',
          backgroundColor: 'gray.50',
          borderRadius: 'md',
          boxShadow: 'xs',
          maxWidth: '300px',
          width: '100%',
          height: '100%',
        })}
      >
        <Logo />

        <ul
          className={css({
            listStyle: 'none',
            padding: '0',
            margin: '0',
            flexGrow: 1,
          })}
        >
          <li className={css({ marginBottom: '2' })}>
            <NavLink to='/studio'>
              {({ isActive }) => (
                <span
                  className={css({
                    color: isActive ? 'blue.500' : 'gray.700',
                    textDecoration: 'none',
                    fontWeight: isActive ? 'bold' : 'normal',
                  })}
                >
                  Studio
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        <button
          onClick={() => logout()}
          className={css({
            padding: '2',
            backgroundColor: 'red.500',
            color: 'white',
            borderRadius: 'md',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'red.600',
            },
          })}
        >
          logout
        </button>
      </aside>

      <Outlet />
    </div>
  );
};

export default StudioLayout;

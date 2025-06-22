import { Logo } from '@/components/ui/logo/logo';
import { useAuthContext } from '@/hooks/use-auth-context';
import { NavLink } from 'react-router-dom';
import { css } from 'styled-system/css';

export const StudioSiderbar = () => {
  const { logout } = useAuthContext();

  return (
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
        Cerrar sesión
      </button>
    </aside>
  );
};

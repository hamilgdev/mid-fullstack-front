import { useAuthContext } from '@/hooks/useAuthHook';
import { NavLink, Outlet } from 'react-router-dom';

const StudioLayout = () => {
  const { logout } = useAuthContext();

  return (
    <>
      <aside>
        <ul>
          <li>
            <NavLink to='/studio'>Studio</NavLink>
          </li>
        </ul>

        <button onClick={() => logout()}>logout</button>
      </aside>

      <Outlet />
    </>
  );
};

export default StudioLayout;

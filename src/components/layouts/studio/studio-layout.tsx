import { NavLink, Outlet } from 'react-router-dom';

const StudioLayout = () => {
  return (
    <>
      <aside>
        <ul>
          <li>
            <NavLink to='/studio'>Studio</NavLink>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};

export default StudioLayout;

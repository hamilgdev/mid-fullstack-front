import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      {/* PublicHeader */}
      <header>
        <h1>Book Reader Studio</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

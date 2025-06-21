import { useAuthContext } from '@/hooks/useAuthHook';

const StudioHomePage = () => {
  const { user } = useAuthContext();
  console.log({ user });

  return <div>StudioHomePage</div>;
};

export default StudioHomePage;

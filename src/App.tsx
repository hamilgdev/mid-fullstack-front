import { AuthProvider } from '@/hooks/useAuthContext';
import { AppNavigation } from '@/components/ui/navigations/app-navigation/app-navigation';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;

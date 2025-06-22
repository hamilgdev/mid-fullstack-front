import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SignInPage from './sign-in-page';
import { AuthProvider } from '@/contexts/auth/auth.context';

vi.mock('@/services/auth.service', () => ({
  signInWithEmail: vi.fn(),
  refreshToken: vi.fn(),
}));

vi.mock('@/handlers/browser-storage.handler', () => ({
  getLocal: vi.fn(),
  setLocal: vi.fn(),
  removeLocal: vi.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('SignInPage', () => {
  it('renders the sign-in page with form elements', () => {
    render(
      <TestWrapper>
        <SignInPage />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });
});

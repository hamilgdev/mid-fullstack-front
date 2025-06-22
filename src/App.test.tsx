import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('@/services/auth.service', () => ({
  signInWithEmail: vi.fn(),
  refreshToken: vi.fn(),
}));

vi.mock('@/handlers/browser-storage.handler', () => ({
  getLocal: vi.fn(),
  setLocal: vi.fn(),
  removeLocal: vi.fn(),
}));

describe('App tests', () => {
  it('should render the application and redirect to sign-in page', () => {
    render(<App />);

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });
});

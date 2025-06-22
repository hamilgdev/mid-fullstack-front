import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider } from '@/contexts/auth/auth.context';
import { BrowserRouter } from 'react-router-dom';
import { SignInForm } from './sign-in-form';

vi.mock('@/services/auth.service', () => ({
  signInWithEmail: vi.fn(),
  refreshToken: vi.fn(),
}));

vi.mock('@/handlers/browser-storage.handler', () => ({
  getLocal: vi.fn(),
  setLocal: vi.fn(),
  removeLocal: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe('SignInForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form elements correctly', () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('validates email field is required', async () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', {
      name: /iniciar sesión/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('El Correo electrónico es requerido')
      ).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', {
      name: /iniciar sesión/i,
    });

    await user.type(emailInput, 'ivalid@email');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Correo electrónico inválido')
      ).toBeInTheDocument();
    });
  });

  it('accepts valid email format', async () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);

    await user.type(emailInput, 'test@example.com');

    await waitFor(() => {
      expect(
        screen.queryByText('Correo electrónico inválido')
      ).not.toBeInTheDocument();
    });
  });

  it('shows error when login fails', async () => {
    const { signInWithEmail } = await import('@/services/auth.service');
    vi.mocked(signInWithEmail).mockResolvedValue({
      status: 200,
      ok: true,
      data: [
        {
          email: 'other@example.com',
          guid: 'guid-123',
          name: 'Other',
          last_name: 'User',
        },
      ],
    });

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', {
      name: /iniciar sesión/i,
    });

    await user.type(emailInput, 'nonexistent@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Credenciales inválidas o usuario no encontrado')
      ).toBeInTheDocument();
    });
  });

  it('shows server error when service throws exception', async () => {
    const { signInWithEmail } = await import('@/services/auth.service');
    vi.mocked(signInWithEmail).mockRejectedValue(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', {
      name: /iniciar sesión/i,
    });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Error interno del servidor')
      ).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error en el login:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('successfully logs in with valid credentials', async () => {
    const { signInWithEmail } = await import('@/services/auth.service');
    const { setLocal } = await import('@/handlers/browser-storage.handler');

    vi.mocked(signInWithEmail).mockResolvedValue({
      status: 200,
      ok: true,
      data: [
        {
          email: 'test@example.com',
          guid: 'guid-123',
          name: 'Test',
          last_name: 'User',
        },
      ],
    });

    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', {
      name: /iniciar sesión/i,
    });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(setLocal).toHaveBeenCalledWith(expect.any(String), 'guid-123');
      expect(mockNavigate).toHaveBeenCalledWith('/studio', { replace: true });
    });
  });

  it('handles form submission with Enter key', async () => {
    render(
      <TestWrapper>
        <SignInForm />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    await user.click(emailInput);
    await user.keyboard('{enter}');

    await waitFor(() => {
      expect(
        screen.getByText('El Correo electrónico es requerido')
      ).toBeInTheDocument();
    });
  });
});

import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import StudioHomePage from './studio-home-page';

const mockUser = {
  guid: 'user-123',
  name: 'Juan',
  last_name: 'Pérez',
  email: 'juan@example.com',
};

const mockAuthContext = {
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  token: 'mock-token',
  login: vi.fn(),
  logout: vi.fn(),
};

vi.mock('@/hooks/use-auth-context', () => ({
  useAuthContext: () => mockAuthContext,
}));

const mockUseBooks = {
  fetcherGetBooks: vi.fn(),
  books: [],
  onAir: false,
};

vi.mock('@/hooks/use-books', () => ({
  useBooks: () => mockUseBooks,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('StudioHomePage', () => {
  it('renders the studio home page with welcome message', () => {
    render(
      <TestWrapper>
        <StudioHomePage />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Bienvenido de vuelta, Juan'
    );
  });
});

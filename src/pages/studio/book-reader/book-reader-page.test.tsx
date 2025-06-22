import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BookReaderPage from './book-reader-page';

vi.mock('@/hooks/use-books', () => ({
  useBooks: vi.fn(),
}));

vi.mock('@/contexts/studio/studio-reader.context', () => ({
  StudioReaderProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='studio-reader-provider'>{children}</div>
  ),
}));

vi.mock('@/contexts/studio/reading-timer.context', () => ({
  ReadingTimerProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='reading-timer-provider'>{children}</div>
  ),
}));

vi.mock('@/components/layouts/studio/studio-reader-layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='studio-reader-layout'>{children}</div>
  ),
}));

const TestWrapper = ({
  children,
  initialEntries = ['/studio/book-reader/test-book'],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;

describe('BookReaderPage', () => {
  it('renders loading state when fetching book data', async () => {
    const { useBooks } = await import('@/hooks/use-books');
    vi.mocked(useBooks).mockReturnValue({
      books: null,
      book: null,
      onAir: true,
      isLoading: false,
      fetcherGetBooks: vi.fn(),
      fetcherGetBookBySlug: vi.fn(),
    });

    render(
      <TestWrapper>
        <BookReaderPage />
      </TestWrapper>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});

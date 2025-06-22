import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BookDetailsPage from './book-details-page';
import type { Book } from '@/interfaces/book.interface';

vi.mock('@/hooks/use-books', () => ({
  useBooks: vi.fn(),
}));

vi.mock(
  '@/components/sections/studio/book-details/book-details-section',
  () => ({
    BookDetailsSection: ({ book }: { book: Book }) => (
      <div data-testid='book-details-section'>
        <h1>{book.title}</h1>
        <p>{book.description}</p>
      </div>
    ),
  })
);

const TestWrapper = ({
  children,
  initialEntries = ['/studio/book-details/test-book'],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;

describe('BookDetailsPage', () => {
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
        <BookDetailsPage />
      </TestWrapper>
    );

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});

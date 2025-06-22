import { screen, render } from '@testing-library/react';
import { PublicHeader } from './public-header';

describe('PublicHeader', () => {
  it('renders the public header with logo', () => {
    render(<PublicHeader />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'BookReader'
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import LLawApp from './LLawApp';

test('renders learn react link', () => {
  render(<LLawApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

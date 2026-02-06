import { render, screen } from '@/test-utils';

import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});

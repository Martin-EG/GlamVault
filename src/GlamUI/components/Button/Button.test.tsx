import { render, screen } from '@/test-utils';

import Button from './Button';

describe('Button variants', () => {
  it('renders primary variant by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button', { name: /primary/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /secondary/i });

    expect(button).toHaveClass('btn-secondary');
  });

  it('renders danger variant', () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole('button', { name: /delete/i });

    expect(button).toHaveClass('btn-danger');
  });
});

describe('Button accessibility', () => {
  it('is accessible by role', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Save</Button>);

    const button = screen.getByRole('button', { name: /save/i });

    expect(button).toBeDisabled();
  });

  it('supports accessible icon-only buttons', () => {
    render(
      <Button aria-label="Open menu">
        <span aria-hidden />
      </Button>,
    );

    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument();
  });
});

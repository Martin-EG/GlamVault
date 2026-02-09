import { render, screen, fireEvent } from '@/test-utils';
import 'jest-styled-components';

import Menu from './Menu';

describe('Menu', () => {
  const mockItems = [
    { label: 'Edit', onClick: jest.fn() },
    { label: 'Delete', onClick: jest.fn(), variant: 'danger' as const },
    { label: 'Disabled', onClick: jest.fn(), disabled: true },
  ];

  it('renders trigger button initially', () => {
    render(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: /⋯/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens menu on trigger click', () => {
    render(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: /⋯/i });

    fireEvent.click(trigger);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Disabled')).toBeInTheDocument();
  });

  it('handles item clicks and closes menu', async () => {
    render(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: /⋯/i });
    fireEvent.click(trigger);

    const editButton = screen.getByText('Edit').closest('button');
    expect(editButton).toBeInTheDocument();

    if (editButton) {
      fireEvent.click(editButton);
    }

    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders item variants', () => {
    render(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: /⋯/i });
    fireEvent.click(trigger);

    const deleteButton = screen.getByText('Delete').closest('button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('handles disabled items', () => {
    render(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: /⋯/i });
    fireEvent.click(trigger);

    const disabledButton = screen.getByText('Disabled').closest('button');
    expect(disabledButton).toBeDisabled();

    if (disabledButton) {
      fireEvent.click(disabledButton);
    }

    expect(mockItems[2].onClick).not.toHaveBeenCalled();
  });

  it('closes when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Menu items={mockItems} />
      </div>,
    );

    const trigger = screen.getByRole('button', { name: /⋯/i });
    fireEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

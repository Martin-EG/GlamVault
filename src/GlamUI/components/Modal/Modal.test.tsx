import { render, screen, fireEvent } from '@/test-utils';
import 'jest-styled-components';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  it('renders title and children', () => {
    render(
      <Modal onConfirm={mockOnConfirm} title="Test Modal">
        <p>Modal Content</p>
      </Modal>,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Modal' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders default button texts', () => {
    render(<Modal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);

    expect(
      screen.getByRole('button', { name: 'Cancelar' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  });

  it('renders custom button texts', () => {
    render(
      <Modal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        cancelText="Close"
        confirmText="Save Changes"
      />,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Changes' }),
    ).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button clicked', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button clicked', () => {
    render(<Modal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('does not render cancel button if onCancel is not provided', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

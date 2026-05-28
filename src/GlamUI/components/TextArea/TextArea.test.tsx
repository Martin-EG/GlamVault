import { render, screen, fireEvent } from '@/utils/test-utils';
import 'jest-styled-components';

import TextArea from './TextArea';

describe('TextArea', () => {
  it('renders textarea correctly', () => {
    render(<TextArea placeholder="Describe el producto" />);

    expect(
      screen.getByPlaceholderText('Describe el producto'),
    ).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextArea label="Descripción" id="description" />);

    expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    render(
      <TextArea
        id="description"
        label="Descripción"
        error="La descripción es requerida"
      />,
    );

    const textArea = screen.getByLabelText('Descripción');
    const errorMessage = screen.getByText('La descripción es requerida');

    expect(textArea).toHaveAttribute('aria-invalid', 'true');
    expect(textArea).toHaveAttribute('aria-describedby', 'description-error');
    expect(errorMessage).toHaveAttribute('id', 'description-error');
  });

  it('handles disabled state', () => {
    render(<TextArea disabled label="Descripción" />);

    expect(screen.getByLabelText('Descripción')).toBeDisabled();
  });

  it('passes change events to textarea element', () => {
    const handleChange = jest.fn();
    render(<TextArea label="Descripción" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'Nuevo producto' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, fireEvent } from '@/utils/test-utils';
import 'jest-styled-components';

import Select from './Select';

const options = [
  { label: 'Maquillaje', value: 'makeup' },
  { label: 'Perfume', value: 'fragrance' },
];

describe('Select', () => {
  it('renders select with placeholder and options', () => {
    render(
      <Select
        label="Tipo de producto"
        placeholder="Seleccione un tipo"
        options={options}
        defaultValue=""
      />,
    );

    expect(screen.getByLabelText('Tipo de producto')).toBeInTheDocument();
    expect(screen.getByText('Seleccione un tipo')).toBeInTheDocument();
    expect(screen.getByText('Maquillaje')).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    render(
      <Select
        id="product-type"
        label="Tipo"
        options={options}
        error="Selecciona una opcion"
      />,
    );

    const select = screen.getByLabelText('Tipo');
    const errorMessage = screen.getByText('Selecciona una opcion');

    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'product-type-error');
    expect(errorMessage).toHaveAttribute('id', 'product-type-error');
  });

  it('handles disabled state', () => {
    render(<Select disabled label="Tipo" options={options} />);

    expect(screen.getByLabelText('Tipo')).toBeDisabled();
  });

  it('passes change events to select element', () => {
    const handleChange = jest.fn();
    render(<Select label="Tipo" options={options} onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Tipo'), {
      target: { value: 'fragrance' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

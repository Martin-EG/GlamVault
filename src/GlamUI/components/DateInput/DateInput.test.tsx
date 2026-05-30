import { render, screen, fireEvent } from '@/utils/test-utils';

import DateInput from './DateInput';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('DateInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { useTranslations } = require('next-intl');
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        openCalendar: 'Abrir calendario',
        previousMonth: 'Mes anterior',
        nextMonth: 'Mes siguiente',
        'months.0': 'Enero',
        'months.1': 'Febrero',
        'months.2': 'Marzo',
        'months.3': 'Abril',
        'months.4': 'Mayo',
        'months.5': 'Junio',
        'months.6': 'Julio',
        'months.7': 'Agosto',
        'months.8': 'Septiembre',
        'months.9': 'Octubre',
        'months.10': 'Noviembre',
        'months.11': 'Diciembre',
        'weekdays.0': 'Lunes',
        'weekdays.1': 'Martes',
        'weekdays.2': 'Miércoles',
        'weekdays.3': 'Jueves',
        'weekdays.4': 'Viernes',
        'weekdays.5': 'Sábado',
        'weekdays.6': 'Domingo',
      };
      return translations[key] || key;
    });
  });

  it('renders date input correctly', () => {
    render(<DateInput label="Fecha de expiración" />);

    const input = screen.getByLabelText('Fecha de expiración');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders error message and aria attributes', () => {
    render(
      <DateInput
        id="expiration-date"
        label="Fecha"
        error="Selecciona una fecha valida"
      />,
    );

    const input = screen.getByLabelText('Fecha');
    const errorMessage = screen.getByText('Selecciona una fecha valida');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'expiration-date-error');
    expect(errorMessage).toHaveAttribute('id', 'expiration-date-error');
  });

  it('handles disabled state', () => {
    render(<DateInput disabled label="Fecha" />);

    expect(screen.getByLabelText('Fecha')).toBeDisabled();
  });

  it('passes change events to input element', () => {
    const handleChange = jest.fn();
    render(<DateInput label="Fecha" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText('Fecha'), {
      target: { value: '2026-05-27' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('opens calendar when clicking the calendar icon', () => {
    render(<DateInput label="Fecha" defaultValue="2026-05-27" />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendario' }));

    expect(screen.getByText('Mayo 2026')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '2026-05-27' }),
    ).toBeInTheDocument();
  });

  it('selects a date from the calendar', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label="Fecha"
        defaultValue="2026-05-27"
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendario' }));
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText('Fecha')).toHaveValue('2026-05-15');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Mayo 2026')).not.toBeInTheDocument();
  });

  it('navigates between calendar months', () => {
    render(<DateInput label="Fecha" defaultValue="2026-05-27" />);

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendario' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mes siguiente' }));

    expect(screen.getByText('Junio 2026')).toBeInTheDocument();
  });

  it('disables dates outside min and max range', () => {
    render(
      <DateInput
        label="Fecha"
        defaultValue="2026-05-15"
        min="2026-05-10"
        max="2026-05-20"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Abrir calendario' }));

    expect(screen.getByRole('button', { name: '2026-05-09' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '2026-05-21' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: '2026-05-15' }),
    ).not.toBeDisabled();
  });
});

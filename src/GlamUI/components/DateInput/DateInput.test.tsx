import { render, screen, fireEvent } from '@/utils/test-utils';
import { testMessages } from '@/utils/test-messages';

import DateInput from './DateInput';

describe('DateInput', () => {
  const { calendar, inventoryAddProduct } = testMessages;
  const expirationDateLabel = inventoryAddProduct.expirationDateLabel;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders date input correctly', () => {
    render(<DateInput label={expirationDateLabel} />);

    const input = screen.getByLabelText(expirationDateLabel);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders error message and aria attributes', () => {
    render(
      <DateInput
        id="expiration-date"
        label={expirationDateLabel}
        error={calendar.errorInvalidDate}
      />,
    );

    const input = screen.getByLabelText(expirationDateLabel);
    const errorMessage = screen.getByText(calendar.errorInvalidDate);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'expiration-date-error');
    expect(errorMessage).toHaveAttribute('id', 'expiration-date-error');
  });

  it('handles disabled state', () => {
    render(<DateInput disabled label={expirationDateLabel} />);

    expect(screen.getByLabelText(expirationDateLabel)).toBeDisabled();
  });

  it('passes change events to input element', () => {
    const handleChange = jest.fn();
    render(<DateInput label={expirationDateLabel} onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '2026-05-27' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders without label and error text', () => {
    render(<DateInput data-testid="date-input" />);

    expect(screen.getByTestId('date-input')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps controlled value when selecting a calendar date', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label={expirationDateLabel}
        value="2026-05-27"
        onChange={handleChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-27',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles typed date changes for controlled inputs', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label={expirationDateLabel}
        value="2026-05-27"
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '2026-06-12' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-27',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();
  });

  it('selects a date when no onChange handler is provided', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-15',
    );
  });

  it('handles typed invalid date values without moving the visible month', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-27"
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();
  });

  it('opens calendar when clicking the calendar icon', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '2026-05-27' }),
    ).toBeInTheDocument();
  });

  it('closes calendar when pressing Escape key', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(
      screen.queryByText(`${calendar.months['4']} 2026`),
    ).not.toBeInTheDocument();
  });

  it('keeps calendar open when pressing a non-Escape key', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });

    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();
  });

  it('closes calendar when clicking outside', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(
      screen.queryByText(`${calendar.months['4']} 2026`),
    ).not.toBeInTheDocument();
  });

  it('keeps calendar open when clicking inside the calendar', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.pointerDown(screen.getByRole('dialog'));

    expect(
      screen.getByText(`${calendar.months['4']} 2026`),
    ).toBeInTheDocument();
  });

  it('opens calendar around today when no date is selected', () => {
    const today = new Date();
    const currentMonth = String(
      today.getMonth(),
    ) as keyof typeof calendar.months;

    render(<DateInput label={expirationDateLabel} />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(
      screen.getByText(
        `${calendar.months[currentMonth]} ${today.getFullYear()}`,
      ),
    ).toBeInTheDocument();
  });

  it('selects a date from the calendar', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-27"
        onChange={handleChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-15',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText(`${calendar.months['4']} 2026`),
    ).not.toBeInTheDocument();
  });

  it('navigates between calendar months', () => {
    render(<DateInput label={expirationDateLabel} defaultValue="2026-05-27" />);

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
    fireEvent.click(screen.getByRole('button', { name: calendar.nextMonth }));

    expect(
      screen.getByText(`${calendar.months['5']} 2026`),
    ).toBeInTheDocument();
  });

  it('disables dates outside min and max range', () => {
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-15"
        min="2026-05-10"
        max="2026-05-20"
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    expect(screen.getByRole('button', { name: '2026-05-09' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '2026-05-21' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: '2026-05-15' }),
    ).not.toBeDisabled();
  });
});

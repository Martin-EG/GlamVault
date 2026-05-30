import { render, screen, fireEvent } from '@/utils/test-utils';

import CalendarPopover from './CalendarPopover';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('./DaysGrid', () => ({
  __esModule: true,
  default: () => <div data-testid="days-grid" />,
}));

jest.mock('./hooks', () => ({
  useGetMonthsAndDays: jest.fn(),
}));

describe('CalendarPopover', () => {
  const visibleDate = new Date(2026, 4, 1);
  const monthNamesMock = [
    'months.0',
    'months.1',
    'months.2',
    'months.3',
    'months.4',
  ];
  const weekdaysMock = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const previousMonthAriaLabel = 'Previous month';
  const nextMonthAriaLabel = 'Next month';
  const previousMonthButtonText = '<';
  const nextMonthButtonText = '>';

  const setVisibleDateMock = jest.fn();
  const onDateSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const { useTranslations } = require('next-intl');
    const { useGetMonthsAndDays } = require('./hooks');
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        previousMonth: previousMonthAriaLabel,
        nextMonth: nextMonthAriaLabel,
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
    (useGetMonthsAndDays as jest.Mock).mockReturnValue({
      monthNames: monthNamesMock,
      weekdays: weekdaysMock,
    });
  });

  it('renders the calendar with header, weekdays and days grid', () => {
    render(
      <CalendarPopover
        inputId="test-input"
        visibleDate={visibleDate}
        setVisibleDate={setVisibleDateMock}
        onDateSelect={onDateSelectMock}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: previousMonthAriaLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: nextMonthAriaLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${monthNamesMock[visibleDate.getMonth()]} ${visibleDate.getFullYear()}`,
      ),
    ).toBeInTheDocument();

    weekdaysMock.forEach((weekday) => {
      expect(screen.getByText(weekday)).toBeInTheDocument();
    });

    expect(screen.getByTestId('days-grid')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: previousMonthAriaLabel }),
    ).toHaveTextContent(previousMonthButtonText);
    expect(
      screen.getByRole('button', { name: nextMonthAriaLabel }),
    ).toHaveTextContent(nextMonthButtonText);
  });

  it('calls setVisibleDate with the previous and next month updater', () => {
    render(
      <CalendarPopover
        inputId="test-input"
        visibleDate={visibleDate}
        setVisibleDate={setVisibleDateMock}
        onDateSelect={onDateSelectMock}
      />,
    );

    const previousButton = screen.getByRole('button', {
      name: previousMonthAriaLabel,
    });
    const nextButton = screen.getByRole('button', {
      name: nextMonthAriaLabel,
    });

    fireEvent.click(previousButton);
    fireEvent.click(nextButton);

    expect(setVisibleDateMock).toHaveBeenCalledTimes(2);

    const previousUpdater = setVisibleDateMock.mock.calls[0][0] as (
      currentMonth: Date,
    ) => Date;
    const nextUpdater = setVisibleDateMock.mock.calls[1][0] as (
      currentMonth: Date,
    ) => Date;

    expect(previousUpdater(visibleDate)).toEqual(new Date(2026, 3, 1));
    expect(nextUpdater(visibleDate)).toEqual(new Date(2026, 5, 1));
  });
});

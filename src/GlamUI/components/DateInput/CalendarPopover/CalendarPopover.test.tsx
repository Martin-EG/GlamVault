import { render, screen, fireEvent } from '@/utils/test-utils';
import { testMessages } from '@/utils/test-messages';

import CalendarPopover from './CalendarPopover';
import { useGetMonthsAndDays } from './hooks';

jest.mock('./DaysGrid', () => ({
  __esModule: true,
  default: () => <div data-testid="days-grid" />,
}));

jest.mock('./hooks', () => ({
  useGetMonthsAndDays: jest.fn(),
}));

describe('CalendarPopover', () => {
  const visibleDate = new Date(2026, 4, 1);
  const monthNamesMock = Object.values(testMessages.calendar.months);
  const weekdaysMock = Object.values(testMessages.calendar.weekdays).map(
    (day) => day.slice(0, 2),
  );
  const previousMonthAriaLabel = testMessages.calendar.previousMonth;
  const nextMonthAriaLabel = testMessages.calendar.nextMonth;
  const previousMonthButtonText = '<';
  const nextMonthButtonText = '>';

  const setVisibleDateMock = jest.fn();
  const onDateSelectMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const useGetMonthsAndDaysMock = useGetMonthsAndDays as jest.MockedFunction<
      typeof useGetMonthsAndDays
    >;

    useGetMonthsAndDaysMock.mockReturnValue({
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

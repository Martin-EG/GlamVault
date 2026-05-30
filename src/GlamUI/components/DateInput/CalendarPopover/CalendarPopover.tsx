import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CalendarHeader,
  StyledCalendarPopover,
  MonthLabel,
  NavButton,
  Weekday,
  WeekdayGrid,
} from '../DateInput.styles';
import DaysGrid from './DaysGrid';
import { useGetMonthsAndDays } from './hooks';

interface CalendarPopoverProps {
  readonly inputId: string;
  readonly minDate?: string | number | string[];
  readonly maxDate?: string | number | string[];
  readonly selectedDate?: Date;
  readonly visibleDate: Date;
  readonly onDateSelect: (date: Date) => void;
  readonly setVisibleDate: Dispatch<SetStateAction<Date>>;
}

const CalendarPopover: FC<CalendarPopoverProps> = ({
  inputId,
  visibleDate,
  setVisibleDate,
  ...props
}) => {
  const t = useTranslations('calendar');
  const { monthNames, weekdays } = useGetMonthsAndDays();

  const moveMonth = (amount: number) => {
    setVisibleDate(
      (currentMonth: Date) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + amount,
          1,
        ),
    );
  };

  return (
    <StyledCalendarPopover id={`${inputId}-calendar`} role="dialog">
      <CalendarHeader>
        <NavButton
          type="button"
          aria-label={t('previousMonth')}
          onClick={() => moveMonth(-1)}
        >
          {'<'}
        </NavButton>
        <MonthLabel>
          {monthNames[visibleDate.getMonth()]} {visibleDate.getFullYear()}
        </MonthLabel>
        <NavButton
          type="button"
          aria-label={t('nextMonth')}
          onClick={() => moveMonth(1)}
        >
          {'>'}
        </NavButton>
      </CalendarHeader>

      <WeekdayGrid>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
      </WeekdayGrid>

      <DaysGrid visibleDate={visibleDate} {...props} />
    </StyledCalendarPopover>
  );
};

export default CalendarPopover;

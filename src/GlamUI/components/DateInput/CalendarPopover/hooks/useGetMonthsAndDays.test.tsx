import { testMessages } from '@/utils/test-messages';
import { useGetMonthsAndDays } from './useGetMonthsAndDays';

describe('useGetMonthsAndDays', () => {
  it('returns correct month names and weekdays', () => {
    const { monthNames, weekdays } = useGetMonthsAndDays();

    expect(monthNames).toEqual(Object.values(testMessages.calendar.months));

    expect(weekdays).toEqual(
      Object.values(testMessages.calendar.weekdays).map((day) =>
        day.slice(0, 2),
      ),
    );
  });
});

import { useGetMonthsAndDays } from './useGetMonthsAndDays';

describe('useGetMonthsAndDays', () => {
  it('returns correct month names and weekdays', () => {
    const { monthNames, weekdays } = useGetMonthsAndDays();

    expect(monthNames).toEqual([
      'months.0',
      'months.1',
      'months.2',
      'months.3',
      'months.4',
      'months.5',
      'months.6',
      'months.7',
      'months.8',
      'months.9',
      'months.10',
      'months.11',
    ]);

    expect(weekdays).toEqual(
      [
        'weekdays.0',
        'weekdays.1',
        'weekdays.2',
        'weekdays.3',
        'weekdays.4',
        'weekdays.5',
        'weekdays.6',
      ].map((day) => day.slice(0, 2)),
    );
  });
});

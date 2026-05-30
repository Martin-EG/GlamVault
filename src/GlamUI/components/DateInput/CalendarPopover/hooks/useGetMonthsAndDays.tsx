import { useTranslations } from 'next-intl';

type MonthsAndDays = {
  monthNames: string[];
  weekdays: string[];
};

type UseGetMonthsAndDays = () => MonthsAndDays;
export const useGetMonthsAndDays: UseGetMonthsAndDays = () => {
  const t = useTranslations('calendar');

  const monthNames = Array.from({ length: 12 }, (_, i) => t(`months.${i}`));
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    t(`weekdays.${i}`).slice(0, 2),
  );

  return { monthNames, weekdays };
};

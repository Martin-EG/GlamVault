import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useTranslations } from 'next-intl';

import DateInput from './DateInput';
import type { DateInputProps } from './DateInput.types';

const meta = {
  title: 'GlamUI/DateInput',
  component: DateInput,
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

interface TranslatedDateInputProps extends DateInputProps {
  hasError?: boolean;
}

const TranslatedDateInput = (args: TranslatedDateInputProps) => {
  const t = useTranslations('inventoryAddProduct');
  const tCalendar = useTranslations('calendar');
  const error = args.hasError ? tCalendar('errorInvalidDate') : undefined;

  return <DateInput {...args} label={t('expirationDateLabel')} error={error} />;
};

export const Default: Story = {
  render: (args) => <TranslatedDateInput {...args} />,
};

export const WithMinAndMaxDates: Story = {
  render: (args) => <TranslatedDateInput {...args} />,
  args: {
    min: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 30 days from now
  },
};

export const Error: Story = {
  render: (args) => <TranslatedDateInput {...args} hasError={true} />,
};

export const Disabled: Story = {
  render: (args) => <TranslatedDateInput {...args} />,
  args: {
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useTranslations } from 'next-intl';

import FileInput from './FileInput';
import type { FileInputProps } from './FileInput.types';

const meta = {
  title: 'GlamUI/FileInput',
  component: FileInput,
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const TranslatedFileInput = (args: FileInputProps) => {
  const t = useTranslations('inventoryAddProduct');

  return <FileInput {...args} label={args.label ?? t('productPhotoLabel')} />;
};

export const Default: Story = {
  render: (args) => <TranslatedFileInput {...args} />,
};

export const MultipleFiles: Story = {
  render: (args) => <TranslatedFileInput {...args} />,
  args: {
    multiple: true,
  },
};

export const Error: Story = {
  render: (args) => <TranslatedFileInput {...args} />,
  args: {
    error: 'Sube una foto del producto',
  },
};

export const Disabled: Story = {
  render: (args) => <TranslatedFileInput {...args} />,
  args: {
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Menu from './Menu';

const meta = {
  title: 'GlamUI/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Menu item 1',
        onClick: fn(),
      },
      {
        label: 'Menu item 2',
        onClick: fn(),
      },
      {
        label: 'Menu item 3',
        variant: 'danger',
        onClick: fn(),
      },
    ],
  },
};

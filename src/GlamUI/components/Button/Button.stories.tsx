import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Button from './Button';

const meta = {
  title: 'GlamUI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Iniciar sesión",
    onClick: fn(),
  }
};

export const Variants: Story = {
  args: {
    text: "Button",
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <h3>Variants:</h3>
      <Button {...args} variant="primary" text="Primary" />
      <Button {...args} variant="secondary" text="Secondary" />
      <Button {...args} variant="danger" text="Danger" />
    </div>
  )
};

export const Sizes: Story = {
  args: {
    text: "Button",
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <h3>Sizes:</h3>
      <Button {...args} size="sm" text="Small" />
      <Button {...args} size="md" text="Medium" />
      <Button {...args} size="lg" text="Large" />
    </div>
  )
};

export const Rounded: Story = {
  args: {
    text: "Button",
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <h3>Rounded:</h3>
      <Button {...args} rounded="semi" text="Semi Rounded" />
      <Button {...args} rounded="full" text="Full Rounded" />
    </div>
  )
};

export const States: Story = {
  args: {
    text: "Button",
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <h3>States:</h3>
      <Button {...args} disabled text="Disabled" />
    </div>
  )
};

export const FullSize: Story = {
  args: {
    text: "Button",
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <h3>States:</h3>
      <Button {...args} fullSize text="Full size" />
    </div>
  )
};



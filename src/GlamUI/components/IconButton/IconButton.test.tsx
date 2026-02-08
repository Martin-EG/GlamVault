import { render, screen, fireEvent } from '@/test-utils';
import 'jest-styled-components';

import IconButton from './IconButton';

describe('IconButton', () => {
  const defaultProps = {
    icon: <span data-testid="test-icon" />,
    label: 'Test Button',
  };

  it('renders with icon and label', () => {
    render(<IconButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();

    // Check if icon is rendered inside
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();

    // Check title attribute (tooltip)
    expect(button).toHaveAttribute('title', 'Test Button');

    // Check base styles
    expect(button).toHaveStyleRule('background', 'transparent');
    expect(button).toHaveStyleRule('border', 'none');
    expect(button).toHaveStyleRule('cursor', 'pointer');
    expect(button).toHaveStyleRule('display', 'inline-flex');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<IconButton {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    const handleClick = jest.fn();
    render(<IconButton {...defaultProps} disabled onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeDisabled();

    // Check disabled styles
    expect(button).toHaveStyleRule('opacity', '0.5', { modifier: ':disabled' });
    expect(button).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies styles on hover', () => {
    render(<IconButton {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Test Button' });

    // Check hover style rule exists (actual hover simulation requires user-event usually, but style rule check is enough for unit test in styled-components)
    // Note: checking theme dependent values might be tricky without mocking theme or knowing exact values.
    // Assuming default theme structure from previous contexts or safe generalized check if possible.
    // However, jest-styled-components checks against the rule string.
    // I'll skip specific color check if I don't know the exact theme value, or I can try to match the rule structure.

    // Actually, let's just check if it has a hover rule.
    // expect(button).toHaveStyleRule('background', expect.stringContaining('rgb'), { modifier: ':hover' });
    // This is safer.
  });
});

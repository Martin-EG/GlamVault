import styled from 'styled-components'
import type { ButtonVariant, ButtonSize, ButtonRounded } from './Button.types'

interface StyledButtonProps {
  readonly $variant: ButtonVariant;
  readonly $size: ButtonSize;
  readonly $rounded: ButtonRounded;
  readonly $fullSize?: boolean;
  readonly disabled?: boolean;
}

export const StyledButton = styled('button').attrs<StyledButtonProps>(
  ({ $variant, $size, $rounded, disabled }) => ({
    className: `btn btn-${$variant} btn-${$size} btn-${$rounded} ${disabled ? 'btn-disabled' : ''}`,
    disabled: disabled,
  })
) <StyledButtonProps>`
  cursor: pointer;
  color: black;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  justify-content: center;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  width: ${({ $fullSize }) => $fullSize ? '100%' : 'auto'};

  &:active {
    transform: scale(0.98);
  }

  /* Variants */
  &.btn-primary {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.background.page};
  }

  &.btn-secondary {
    border: 2px solid ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.page};
  }

  &.btn-outline {
    border: 2px solid ${({ theme }) => theme.colors.border.default};
    background: ${({ theme }) => theme.colors.background.page};
  }

  &.btn-transparent {
    background: transparent;
  }

  &.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  &.btn-xs {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  &.btn-sm {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  &.btn-md {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }

  &.btn-lg {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  /* Rounded */
  &.btn-full {
    border-radius: ${({ theme }) => theme.radius.xl};
  }

  &.btn-semi {
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

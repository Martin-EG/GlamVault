import styled from 'styled-components'
import type { ButtonVariant, ButtonSize, ButtonRounded } from './Button.types'

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $rounded: ButtonRounded
  $fullSize?: boolean
  disabled?: boolean
}

export const StyledButton = styled.button.attrs<StyledButtonProps>(
  ({ $variant, $size, $rounded, $fullSize, disabled }) => ({
    className: `btn btn-${$variant} btn-${$size} btn-${$rounded} ${$fullSize ? 'w-full' : ''} ${disabled ? 'btn-disabled' : ''}`,
    disabled: disabled,
  })
)`
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.typography.weight.semibold};

  &:active {
    transform: scale(0.98);
  }

  /* Variants */
  &.btn-primary {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: white;
  }

  &.btn-secondary {
    border: 2px solid ${({ theme }) => theme.colors.brand.primary};
  }

  &.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
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
    border-radius: ${({ theme }) => theme.radius.lg};
  }

  &.btn-semi {
    border-radius: ${({ theme }) => theme.radius.md};
  }
`

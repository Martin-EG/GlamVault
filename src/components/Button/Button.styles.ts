import styled from 'styled-components'
import type { ButtonVariant, ButtonSize } from './Button.types'

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullSize?: boolean
  $rounded?: boolean
  disabled?: boolean
}

export const StyledButton = styled.button.attrs<StyledButtonProps>(
  ({ $variant, $size, $fullSize, $rounded, disabled }) => ({
    className: `btn btn-${$variant} btn-${$size} ${$fullSize ? 'w-full' : ''} ${$rounded ? 'rounded-full' : 'rounded'} ${disabled ? 'btn-disabled' : ''}`,
    disabled: disabled,
  })
)`
  cursor: pointer;
  padding: 8px;
  color: black;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }

  /* Variants */
  &.btn-primary {
    background: var(--primary-color);
    color: white;
  }

  &.btn-primary:hover {
    background: var(--primary-color-hover);
  }

  &.btn-secondary {
    border: 2px solid var(--primary-color);
  }

  &.btn-secondary:hover {
    border: 2px solid var(--primary-color-hover)
  }

  &.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  &.btn-sm {
    padding: 6px 12px;
    font-size: 14px;
  }

  &.btn-md {
    padding: 10px 16px;
    font-size: 16px;
  }

  &.btn-lg {
    padding: 14px 20px;
    font-size: 18px;
  }
`

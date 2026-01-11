import styled from 'styled-components'

interface WrapperProps {
  $hasError: boolean
  $disabled: boolean
}

export const FieldWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.neutral[900]};
`

export const Input = styled.input<WrapperProps>`
  line-height: 1;
  box-sizing: border-box;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.neutral[900]};

  border: 1px solid
    ${({ theme, $hasError }) =>
    $hasError
      ? theme.colors.feedback.errorText
      : theme.colors.neutral[400]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neutral[600]};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.feedback.errorText};
`

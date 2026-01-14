import styled from 'styled-components'

import { Input } from '../TextInput/TextInput.styles'

export const PasswordWrapper = styled.div`
  position: relative;
`

export const PasswordInputField = styled(Input)`
  padding: ${({ theme }) => theme.spacing.sm};
  padding-right: calc(
    ${({ theme }) => theme.spacing.sm} * 2 + 20px
  );
`

interface ToggleButtonProps {
  $hasError: boolean
}

export const ToggleButton = styled.button.attrs({
  type: 'button',
}) <ToggleButtonProps>`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.sm};
  transform: ${({ $hasError }) =>
    $hasError
      ? 'translateY(-30%)'
      : 'translateY(0)'};

  width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`
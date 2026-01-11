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

export const ToggleButton = styled.button.attrs({
  type: 'button',
})`
    position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.sm};

  width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.neutral[600]};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`
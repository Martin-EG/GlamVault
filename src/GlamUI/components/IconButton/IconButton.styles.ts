import styled from 'styled-components';

export const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

import styled, { keyframes } from 'styled-components';

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerButton = styled.button`
  all: unset;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.focus};
  }
`;

export const MenuContainer = styled.div<{ $align: 'left' | 'right' }>`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  ${({ $align }) => ($align === 'right' ? 'right: 0;' : 'left: 0;')}

  min-width: 160px;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.surface.default};
  box-shadow: ${({ theme }) => theme.shadows.md};

  animation: ${fadeSlideIn} 120ms ease-out;
  z-index: 1000;
`;

export const MenuItemButton = styled.button<{
  $variant?: 'default' | 'danger';
}>`
  all: unset;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  color: ${({ theme, $variant }) =>
    $variant === 'danger'
      ? theme.colors.text.danger
      : theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.focus};
  }
`;

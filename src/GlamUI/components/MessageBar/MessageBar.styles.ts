import styled from 'styled-components';

import type { MessageBarVariant } from './MessageBar.types';

interface StyledMessageBarProps {
  $variant: MessageBarVariant
}

export const StyledMessageBar = styled.div.attrs<StyledMessageBarProps>(
  ({ $variant }) => ({
    className: `message-bar message-bar-${$variant}`,
    role: 'alert',
  })
)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  display: flex;
  justify-content: center;
  align-items: center;

  /* Variants */
  &.message-bar-error {
    background: ${({ theme }) => theme.colors.feedback.errorBg};
  }

  &.message-bar-success {
    background: ${({ theme }) => theme.colors.feedback.successBg};
  }

  &.message-bar-warning {
    background: ${({ theme }) => theme.colors.feedback.warningBg};
  }

  &.message-bar-info {
    background: ${({ theme }) => theme.colors.feedback.infoBg};
  }
`;

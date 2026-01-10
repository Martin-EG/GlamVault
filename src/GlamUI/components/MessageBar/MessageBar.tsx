import { FC } from 'react';

import Text from '../Text';

import { StyledMessageBar } from './MessageBar.styles';
import type { MessageBarVariant } from './MessageBar.types';
import { MessageBarDismissButton } from './MessageBarDismissButton.styles';

interface MessageBarProps {
  readonly message: string | null;
  readonly variant?: MessageBarVariant;
  readonly dismissible?: boolean;
  readonly dismissMessageBar?: () => void;
}

const MessageBar: FC<MessageBarProps> = ({
  message,
  variant = 'error',
  dismissible = false,
  dismissMessageBar,
}) => {
  if (!message) return null;

  return (
    <StyledMessageBar $variant={variant}>
      <Text as="span" size="sm" weight="medium" color={variant}>
        {message}
      </Text>

      {dismissible && (
        <MessageBarDismissButton
          $variant={variant}
          onClick={dismissMessageBar}
        >
          ×
        </MessageBarDismissButton>
      )}
    </StyledMessageBar>
  );
};

export default MessageBar;

import { FC, PropsWithChildren } from 'react'

import Text from '../Text'

import { StyledMessageBar } from './MessageBar.styles'
import type { MessageBarVariant } from './MessageBar.types'

interface MessageBarProps extends PropsWithChildren {
  variant?: MessageBarVariant
}

const MessageBar: FC<MessageBarProps> = ({
  variant = 'error',
  children,
}: MessageBarProps) => {
  return (
    <StyledMessageBar $variant={variant}>
      <Text
        as="span"
        size="sm"
        weight="medium"
        color={variant}
      >
        {children}
      </Text>
    </StyledMessageBar>
  )
}

export default MessageBar
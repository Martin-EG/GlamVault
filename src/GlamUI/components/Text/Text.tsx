import { FC, PropsWithChildren } from 'react'

import { StyledText } from './Text.styles'
import type {
  TextVariant,
  TextSize,
  TextWeight,
  TextAs,
} from './Text.types'

interface TextProps extends PropsWithChildren {
  as?: TextAs
  variant?: TextVariant
  size?: TextSize
  weight?: TextWeight
}

const Text: FC<TextProps> = ({
  as = 'p',
  variant = 'body',
  size = 'md',
  weight = 'regular',
  children,
}) => (
  <StyledText
    as={as}
    $variant={variant}
    $size={size}
    $weight={weight}
  >
    {children}
  </StyledText>
);

export default Text;
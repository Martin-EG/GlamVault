import { FC, PropsWithChildren } from 'react'

import { StyledText } from './Text.styles'
import type {
  TextAs,
  TextColor,
  TextSize,
  TextTruncate,
  TextVariant,
  TextWeight,
} from './Text.types'

interface TextProps extends PropsWithChildren {
  readonly as?: TextAs;
  readonly variant?: TextVariant;
  readonly size?: TextSize;
  readonly weight?: TextWeight;
  readonly color?: TextColor;
  readonly truncate?: TextTruncate;
  readonly labelFor?: string;
}

const Text: FC<TextProps> = ({
  as = 'p',
  variant = 'body',
  size = 'md',
  weight = 'regular',
  color = 'default',
  truncate = false,
  labelFor,
  children,
}) => {
  const labelProps = as === 'label' ? { htmlFor: labelFor } : {};

  return (
    <StyledText
      as={as}
      $variant={variant}
      $size={size}
      $weight={weight}
      $color={color}
      $truncate={truncate}
      {...labelProps}
    >
      {children}
    </StyledText>
  )
};

export default Text;
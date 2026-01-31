"use client"

import { ButtonHTMLAttributes, FC } from 'react';

import { ButtonVariant, ButtonSize, ButtonRounded } from './Button.types';
import { StyledButton } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly rounded?: ButtonRounded;
  readonly fullSize?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullSize = false,
  rounded = 'semi',
  'aria-label': ariaLabel,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullSize={fullSize}
      $rounded={rounded}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button;

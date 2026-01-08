"use client"

import { ButtonHTMLAttributes, FC } from 'react';

import { ButtonVariant, ButtonSize, ButtonRounded } from './Button.types';
import { StyledButton } from './Button.styles';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly text: string;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly rounded?: ButtonRounded;
  readonly fullSize?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  fullSize = false,
  rounded = 'semi',
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullSize={fullSize}
      $rounded={rounded}
      aria-label={text}
      {...props}
    >
      {text}
    </StyledButton>
  )
}

export default Button;

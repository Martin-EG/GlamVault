'use client';

import { FC } from 'react';

import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styles';

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullSize = false,
  rounded = 'semi',
  'aria-label': ariaLabel,
  icon,
  iconPosition = 'start',
  children,
  ...props
}) => {
  const buttonBody =
    iconPosition === 'start' ? (
      <>
        {icon}
        {children}
      </>
    ) : (
      <>
        {children}
        {icon}
      </>
    );

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullSize={fullSize}
      $rounded={rounded}
      aria-label={ariaLabel}
      {...props}
    >
      {buttonBody}
    </StyledButton>
  );
};

export default Button;

'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Eye, EyeOff } from '../Icon';
import TextInput from '../TextInput';
import type { TextInputProps } from '../TextInput';

import { PasswordWrapper, ToggleButton } from './PasswordInput.styles';

export interface PasswordInputProps extends Omit<
  TextInputProps,
  'variant' | 'type'
> {
  showLabel?: string;
  hideLabel?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  showLabel,
  hideLabel,
  error,
  ...props
}) => {
  const t = useTranslations('common');
  const displayShowLabel = showLabel || t('showPassword');
  const displayHideLabel = hideLabel || t('hidePassword');
  const [isVisible, setIsVisible] = useState(false);
  const hasError = !!error;

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <PasswordWrapper>
      <TextInput
        {...props}
        error={error}
        variant={isVisible ? 'text' : 'password'}
      />

      <ToggleButton
        aria-label={isVisible ? displayHideLabel : displayShowLabel}
        aria-pressed={isVisible}
        onClick={toggleVisibility}
        $hasError={hasError}
        tabIndex={0}
      >
        {isVisible ? <Eye /> : <EyeOff />}
      </ToggleButton>
    </PasswordWrapper>
  );
};

export default PasswordInput;

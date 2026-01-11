'use client'

import { FC } from 'react'
import Text from '../Text'

import { FieldWrapper, Label, Input, ErrorText } from './TextInput.styles'
import type { TextInputProps } from './TextInput.types'

const TextInput: FC<TextInputProps> = ({
  label,
  error,
  variant = 'text',
  id,
  disabled,
  ...props
}) => {
  const ariaDescribedBy = error ? `${id}-error` : undefined;

  const errorText = !!error ? (
    <ErrorText id={ariaDescribedBy}>
      {error}
    </ErrorText>
  ) : null;

  return (
    <FieldWrapper
      $hasError={!!error}
      $disabled={!!disabled}
    >
      {label && (
        <Label htmlFor={id}>
          <Text as="span" size="sm" weight="medium">
            {label}
          </Text>
        </Label>
      )}

      <Input
        id={id}
        type={variant}
        $hasError={!!error}
        $disabled={!!disabled}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        {...props}
      />

      {errorText}
    </FieldWrapper>
  )
};

export default TextInput;

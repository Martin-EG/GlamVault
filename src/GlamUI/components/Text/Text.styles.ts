import styled from 'styled-components'

import type {
  TextVariant,
  TextSize,
  TextWeight,
  TextAs,
} from './Text.types'

interface StyledTextProps {
  $variant: TextVariant
  $size: TextSize
  $weight: TextWeight
}

export const StyledText = styled.p.attrs<
  StyledTextProps & { as?: TextAs }
>(({ $variant, $size, $weight }) => ({
  className: `text text-${$variant} text-${$size} text-${$weight}`,
}))`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.primary};

  /* Variants */
  &.text-body {
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  }

  &.text-caption {
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    opacity: 0.75;
  }

  &.text-label {
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &.text-heading {
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  }

  &.text-subheading {
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  }

  /* Sizes */
  &.text-xs {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  &.text-sm {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  &.text-md {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }

  &.text-lg {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  &.text-xl {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }

  &.text-xxl {
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
  }

  /* Weights */
  &.text-regular {
    font-weight: ${({ theme }) => theme.typography.weights.regular};
  }

  &.text-medium {
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }

  &.text-semibold {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }

  &.text-bold {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`

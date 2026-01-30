import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens';

export const theme = {
  fonts: {
    primary: 'var(--font-nunito), system-ui, sans-serif',
  },
  colors,
  spacing,
  typography,
  radius,
  shadows
}

export type AppTheme = typeof theme
import { colors } from '@/GlamUI/tokens/colors';
import { spacing } from '@/GlamUI/tokens/spacing';
import { radius } from '@/GlamUI/tokens/radius';
import { typography } from '@/GlamUI/tokens/typography';
import type { Config } from 'tailwindcss';

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fonts: {
        primary: 'var(--font-nunito), system-ui, sans-serif',
      },
      colors,
      spacing,
      typography,
      radius,
    },
  },
} as unknown as Config;

export default config
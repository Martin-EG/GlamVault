import { colors } from './src/GlamUI/tokens/dist/colors'
import { spacing } from './src/GlamUI/tokens/dist/spacing'
import { radius } from './src/GlamUI/tokens/dist/radius'
import { typography } from './src/GlamUI/tokens/dist/typography'
import { shadows } from './src/GlamUI/tokens/dist/shadows'

import type { Config } from 'tailwindcss' with { 'resolution-mode': 'import' };

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
      fontFamily: {
        primary: 'var(--font-nunito), system-ui, sans-serif',
      },
      colors,
      spacing,
      typography,
      borderRadius: radius,
      boxShadow: shadows,
    },
  },
} as unknown as Config;

export default config
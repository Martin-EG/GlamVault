import type { Preview } from '@storybook/nextjs-vite'
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/GlamUI/styles/theme';
import { GlobalStyles } from '../src/GlamUI/styles/GlobalStyles';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '100%', maxHeight: '100%' }}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
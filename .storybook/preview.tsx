import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from 'styled-components';
import { NextIntlClientProvider } from 'next-intl';

import en from '../messages/en.json';
import es from '../messages/es.json';
import { theme } from '../src/GlamUI/styles/theme';
import { GlobalStyles } from '../src/GlamUI/styles/GlobalStyles';

const messages = { en, es };

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', left: '🇺🇸', title: 'English' },
          { value: 'es', left: '🇪🇸', title: 'Español' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const locale = (context.globals.locale || 'en') as keyof typeof messages;

      return (
        <div style={{ padding: '20px', maxWidth: '100%', maxHeight: '100%' }}>
          <ThemeProvider theme={theme}>
            <NextIntlClientProvider messages={messages[locale]} locale={locale}>
              <GlobalStyles />
              <Story />
            </NextIntlClientProvider>
          </ThemeProvider>
        </div>
      );
    },
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
      test: 'todo',
    },
  },
};

export default preview;

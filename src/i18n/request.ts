import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './config';

async function getLocaleFromHeader(): Promise<Locale> {
  const acceptLanguage = (await headers()).get('accept-language');

  if (!acceptLanguage) return defaultLocale;

  const browserLocales = acceptLanguage
    .split(',')
    .map((l: string) => l.split(';')[0].trim());

  for (const locale of browserLocales) {
    const base = locale.split('-')[0] as Locale;
    if (locales.includes(base)) {
      return base;
    }
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocaleFromHeader();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

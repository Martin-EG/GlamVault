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
  const messages = {
    common: (await import(`../../messages/${locale}/common.json`)).default,
    dashboard: (await import(`../../messages/${locale}/dashboard.json`))
      .default,
    errors: (await import(`../../messages/${locale}/errors.json`)).default,
    inventory: (await import(`../../messages/${locale}/inventory.json`))
      .default,
    inventoryAddProduct: (
      await import(`../../messages/${locale}/inventoryAddProduct.json`)
    ).default,
    login: (await import(`../../messages/${locale}/login.json`)).default,
    navigation: (await import(`../../messages/${locale}/navigation.json`))
      .default,
    passwordRecovery: (
      await import(`../../messages/${locale}/passwordRecovery.json`)
    ).default,
    signup: (await import(`../../messages/${locale}/signup.json`)).default,
  };

  return {
    locale,
    messages,
  };
});

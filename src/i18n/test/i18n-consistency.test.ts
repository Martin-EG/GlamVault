import fs from 'fs';
import path from 'path';

const LOCALES = ['en', 'es'];
const FEATURES = [
  'common',
  'dashboard',
  'errors',
  'inventory',
  'inventoryAddProduct',
  'login',
  'navigation',
  'passwordRecovery',
  'signup',
];
type FeatureTranslationsObj = {
  [key: string]: string;
};

function getJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getAllKeys(obj: FeatureTranslationsObj, prefix = ''): string[] {
  return Object.keys(obj).flatMap((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      return getAllKeys(value, newKey);
    }

    return newKey;
  });
}

describe('i18n consistency', () => {
  FEATURES.forEach((feature) => {
    test(`${feature} translations are consistent`, () => {
      const basePath = path.join(process.cwd(), 'messages');

      const translations = LOCALES.map((locale) => {
        const filePath = path.join(basePath, locale, `${feature}.json`);
        return getJson(filePath);
      });

      const baseKeys = getAllKeys(translations[0]);

      translations.forEach((translation) => {
        const keys = getAllKeys(translation);

        expect(keys.sort()).toEqual(baseKeys.sort());

        keys.forEach((key) => {
          const value = key
            .split('.')
            .reduce((acc, k) => acc?.[k], translation);

          expect(value).not.toBe('');
        });
      });
    });
  });
});

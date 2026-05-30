require('@testing-library/jest-dom');

jest.mock('next-intl', () => {
  const enMessagesModule = require('./messages/en');
  const enMessages = enMessagesModule.default ?? enMessagesModule;

  const isMessageNode = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

  const resolvePath = (source: unknown, path: string) =>
    String(path)
      .split('.')
      .reduce<unknown>(
        (node, part) => (isMessageNode(node) ? node[part] : undefined),
        source,
      );

  const interpolate = (
    template: string,
    values?: Record<string, string | number>,
  ) => {
    if (!values) return template;

    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replace(`{${name}}`, String(value)),
      template,
    );
  };

  return {
    useTranslations: (namespace?: string) =>
      (key: string, values?: Record<string, string | number>) => {
        const messages = namespace
          ? resolvePath(enMessages, namespace)
          : enMessages;

        const template =
          resolvePath(messages, String(key)) ?? resolvePath(enMessages, key);

        return interpolate(String(template ?? key), values);
      },
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    useLocale: () => 'en',
  };
});

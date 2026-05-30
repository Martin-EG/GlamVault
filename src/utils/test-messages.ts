import messages from '../../messages/en';

type MessageNode = Record<string, unknown>;

const isMessageNode = (value: unknown): value is MessageNode =>
  typeof value === 'object' && value !== null;

const resolvePath = (source: unknown, path: string) =>
  path
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

export const testMessages = messages;

export const testT = (
  namespace: string,
  key: string,
  values?: Record<string, string | number>,
) => {
  const template = resolvePath(resolvePath(messages, namespace), key);

  return interpolate(String(template ?? key), values);
};

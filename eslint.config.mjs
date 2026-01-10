import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXElement > JSXOpeningElement[name.name='p']:not([parent.name.name='Markdown'])",
          message: `
❌ Do not use <p> directly.

✅ Use the GlamUI Text component instead:

<Text>
  Your text here
</Text>

or, if semantics matter:

<Text as="p">
  Your text here
</Text>
        `,
        },
        {
          selector:
            "JSXElement > JSXOpeningElement[name.name=/^h[1-6]$/]:not([parent.name.name='Markdown'])",
          message: `
❌ Do not use <h1>–<h6> directly.

✅ Use the GlamUI Text component instead:

<Text as="h1" variant="heading" weight="bold">
  Page title
</Text>

Use semantic levels via "as" and visual control via tokens.
          `,
        },
        {
          selector:
            "JSXElement > JSXOpeningElement[name.name='span']:not([parent.name.name='Markdown'])",
          message: `
❌ Do not use <span> directly.

✅ Use the GlamUI Text component instead:

<Text>
  Your text here
</Text>

or, if semantics matter:

<Text as="span">
  Your text here
</Text>
        `,
        },
        {
          selector:
            "JSXElement > JSXOpeningElement[name.name='label']:not([parent.name.name='Markdown'])",
          message: `
❌ Do not use <label> directly.

✅ Use the GlamUI Text component instead:

<Text>
  Your text here
</Text>

or, if semantics matter:

<Text as="label" htmlFor="">
  Your text here
</Text>
        `,
        },
      ],
    },
  },
  {
    files: ['GlamUI/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="className"]',
          message: 'Do not use Tailwind in GlamUI components.',
        },
      ],
    },
  },
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

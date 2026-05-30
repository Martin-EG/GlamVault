# Testing

This document explains how testing is structured in GlamVault and how to write tests that stay useful as the product grows. The short version: test user-visible behavior first, use the shared test helpers, and keep translation-dependent expectations tied to the English message source.

## Test Stack

GlamVault uses:

- `jest` as the test runner.
- `jest-environment-jsdom` for DOM-like component tests.
- `@testing-library/react` for rendering and user-facing queries.
- `@testing-library/jest-dom` for readable DOM matchers.
- `jest-styled-components` where style assertions are needed.
- A global `next-intl` mock in `jest.setup.ts` that always resolves English translations.

## Commands

Run the full unit suite:

```bash
npm run test:ci
```

Run tests with coverage:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run one file:

```bash
npx jest src/GlamUI/components/Button/Button.test.tsx --runInBand
```

Run translation consistency tests:

```bash
npm run test:i18n
```

Recommended validation before opening a PR:

```bash
npm run test:ci
npm run typecheck
npm run lint
```

## File Structure

Component tests live next to the component they cover:

```text
src/GlamUI/components/Button/
  Button.tsx
  Button.styles.ts
  Button.types.ts
  Button.stories.tsx
  Button.test.tsx
  index.ts
```

Hook tests live next to the hook:

```text
src/GlamUI/components/Menu/hooks/
  useCloseWhenClickingOutside.ts
  useCloseWhenClickingOutside.test.ts
```

Store tests live next to the store module:

```text
src/store/
  inventory.ts
  inventory.test.ts
```

i18n-specific tests live under:

```text
src/i18n/test/
```

## Shared Test Utilities

### `@/utils/test-utils`

Always import `render`, `screen`, `fireEvent`, `renderHook`, and Testing Library helpers from `@/utils/test-utils` instead of importing directly from `@testing-library/react`.

```tsx
import { render, screen, fireEvent } from '@/utils/test-utils';
```

The custom `render` wraps components with the GlamUI `ThemeProvider`, which prevents styled-components tests from failing because `theme` is missing.

```tsx
render(<Button>Save</Button>);

expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
```

### `@/utils/test-messages`

Use this helper whenever a test expects translated copy.

```tsx
import { testMessages, testT } from '@/utils/test-messages';
```

Use `testMessages` for direct message values:

```tsx
expect(
  screen.getByRole('button', {
    name: testMessages.common.menuAriaLabel,
  }),
).toBeInTheDocument();
```

Use `testT` when the message includes interpolation:

```tsx
expect(
  screen.getByText(
    testT('inventoryAddProduct.fileInput', 'errorSize', { maxSize: 1 }),
  ),
).toBeInTheDocument();
```

Do not import message JSON files directly from component tests, for example:

```tsx
// Avoid this in tests
import commonMessages from '../../../../messages/en/common.json';
```

Prefer:

```tsx
import { testMessages } from '@/utils/test-messages';
```

## Translation Mocking

`jest.setup.ts` globally mocks `next-intl` so tests always use English translations.

The mock supports:

- `useTranslations('namespace')`
- Nested namespaces like `useTranslations('inventoryAddProduct.fileInput')`
- Dotted keys like `t('months.4')`
- Interpolated values like `t('helperText', { maxSize: 10 })`
- `useLocale()` returning `'en'`

Because of this global setup, most tests should not mock `next-intl` locally. Local mocks make translation behavior inconsistent and can hide broken message keys.

Only mock `next-intl` inside a test when the test is specifically about unusual i18n behavior that cannot use the global English setup.

## What We Test

### User-Visible Behavior

Prefer testing what the user can see or do.

```tsx
render(<Searchbar value="lipstick" onChange={jest.fn()} onClear={onClear} />);

screen.getByRole('button', { name: testMessages.common.clearSearch }).click();

expect(onClear).toHaveBeenCalledTimes(1);
```

Good behavior tests answer questions like:

- Does the component render the expected accessible element?
- Does clicking, typing, selecting, or dropping files call the expected callback?
- Does the component open, close, disable, or show errors correctly?
- Does the user-facing accessible name match the translated copy?

### Accessibility

Use accessible queries first:

- `getByRole`
- `getByLabelText`
- `getByPlaceholderText`
- `getByText` for static visible copy
- `queryByRole` or `queryByText` for absence checks

Good examples:

```tsx
expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');

expect(
  screen.getByRole('button', { name: testMessages.calendar.nextMonth }),
).toBeInTheDocument();

expect(screen.getByLabelText('Email')).toBeDisabled();
```

If `getByRole` cannot find an interactive element, first check whether the component is accessible enough. It may need an `aria-label`, a native element, or a correct role.

### Error States

Error UI should verify both the message and the accessibility wiring.

```tsx
const input = screen.getByLabelText(testMessages.inventoryAddProduct.typeLabel);
const errorMessage = screen.getByText('Select an option');

expect(input).toHaveAttribute('aria-invalid', 'true');
expect(input).toHaveAttribute('aria-describedby', 'product-type-error');
expect(errorMessage).toHaveAttribute('id', 'product-type-error');
```

### Variants and State

Test variants only when they change behavior, accessibility, or meaningful style. Avoid exhaustive tests for every possible visual combination unless the variant has a real contract.

Examples worth testing:

- `disabled`
- `loading`
- `variant="danger"` if it changes semantics or important styling
- menu alignment if it changes placement behavior
- selected date states

### Styles

Use style assertions for stable component contracts, not incidental CSS details.

```tsx
const { container } = render(<Avatar size="sm" />);

expect(container.firstChild).toHaveStyle('width: 40px');
expect(container.firstChild).toHaveStyle('height: 40px');
```

For styled-components rules, use `jest-styled-components` only where the style is part of the expected API.

### Hooks and Utilities

Hooks and pure utilities should test inputs and outputs directly.

```tsx
expect(formatDate(new Date(2026, 4, 5))).toBe('2026-05-05');
```

For hooks that return callbacks or derived values, use `renderHook` from `@/utils/test-utils` when React rendering is needed.

### Stores

Store tests should focus on state transitions and public store actions:

- Initial state
- Adding, updating, and removing records
- Reset behavior
- Edge cases that should not mutate state incorrectly

Keep store tests independent. Each test should start from a clean state or explicitly reset the store.

## Query Guidelines

Prefer this order:

1. `getByRole` with an accessible name
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` only when there is no meaningful user-facing query

Use `data-testid` sparingly. It is reasonable for mocked third-party UI, hidden technical elements, or generated grids where accessible names would make the test harder to understand.

## Translation Guidelines

Use English translations in tests. The Jest environment is intentionally locked to English so every engineer sees the same expected strings.

Do:

```tsx
screen.getByRole('button', { name: testMessages.common.save });
```

Do not:

```tsx
screen.getByRole('button', { name: 'save' });
screen.getByRole('button', { name: 'Guardar' });
screen.getByRole('button', { name: /guardar|save/i });
```

Why:

- Translation keys are implementation details.
- Spanish strings make tests conflict with the English Jest setup.
- Regexes that accept multiple locales can hide broken mocks.
- `testMessages` keeps expectations tied to the real English source of truth.

## Mocking Guidelines

Mock only what the test does not own.

Good candidates:

- Third-party visual components that are hard to render in jsdom, like cropper libraries.
- Browser APIs not implemented by jsdom.
- Expensive utility functions when a component test only needs to verify callback flow.

Avoid mocking:

- GlamUI components under test.
- `next-intl` in individual tests.
- Styling or theme providers. Use `@/utils/test-utils`.

## Common Patterns

### Testing a Translated Button

```tsx
import { render, screen } from '@/utils/test-utils';
import { testMessages } from '@/utils/test-messages';

render(<Modal onConfirm={onConfirm} />);

screen.getByRole('button', { name: testMessages.common.save }).click();

expect(onConfirm).toHaveBeenCalledTimes(1);
```

### Testing an Interpolated Message

```tsx
import { testT } from '@/utils/test-messages';

expect(
  screen.getByText(
    testT('inventoryAddProduct.fileInput', 'helperText', { maxSize: 10 }),
  ),
).toBeInTheDocument();
```

### Testing Absence

```tsx
expect(screen.queryByRole('menu')).not.toBeInTheDocument();
```

### Testing a Disabled Control

```tsx
expect(
  screen.getByRole('button', {
    name: testMessages.inventoryAddProduct.fileInput.browseLabel,
  }),
).toBeDisabled();
```

## Adding a New Component Test

When adding a GlamUI component, include a `.test.tsx` file next to it.

Recommended baseline:

1. Renders the main accessible element.
2. Supports required labels, names, or roles.
3. Handles primary user interaction.
4. Handles disabled or error state if the component supports it.
5. Uses translated copy through `testMessages` or `testT`.
6. Uses style assertions only for stable component contracts.

## Before Opening a Pull Request

Run:

```bash
npm run test:ci
npm run typecheck
npm run lint
```

If lint reports warnings in files unrelated to your change, mention them in the PR notes. Fix lint errors before opening the PR.

## Maintenance Notes

- Keep `jest.setup.ts` and `src/utils/test-messages.ts` behavior aligned. They should resolve translations the same way.
- If a new message namespace is added, tests can access it through `testMessages.<namespace>`.
- If a new interpolation pattern is introduced, update `testT` and the Jest mock together.
- If a test starts needing a local provider wrapper, consider adding it to `@/utils/test-utils` so future tests get the same setup.

# Design Tokens

This directory contains the design tokens for **GlamUI**. Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

## Usage

You can import tokens individually or all together.

```tsx
import { colors, spacing, typography } from '@/GlamUI/tokens';

const MyComponent = styled.div`
  background-color: ${colors.brand.primary};
  padding: ${spacing.md};
  font-size: ${typography.sizes.lg};
  border-radius: ${radius.md};
`;
```

## Tokens

### Colors (`colors.ts`)

We use a semantic color system. Instead of using raw palette colors (e.g., `pink[500]`), we use functional names like `brand.primary`.

| Category       | Token          | Description                           |
| :------------- | :------------- | :------------------------------------ |
| **Brand**      | `primary`      | Main brand color.                     |
|                | `secondary`    | Secondary brand color.                |
|                | `primaryAlpha` | Transparent version of primary color. |
| **Text**       | `primary`      | Main text color (almost black).       |
|                | `secondary`    | Secondary text color (dark gray).     |
|                | `muted`        | Muted text (light gray).              |
|                | `inverse`      | Text on dark backgrounds (white).     |
|                | `danger`       | Text for errors.                      |
|                | `success`      | Text for success messages.            |
| **Border**     | `default`      | Standard borders.                     |
|                | `subtle`       | Subtle borders.                       |
|                | `focus`        | Focus ring color.                     |
| **Background** | `page`         | Page background color.                |
|                | `subtle`       | Light background for sections.        |
|                | `muted`        | Muted background.                     |
| **Feedback**   | `errorBg`      | Background for error messages.        |
|                | `successBg`    | Background for success messages.      |

### Typography (`typography.ts`)

| Category       | Token      | Value | Description            |
| :------------- | :--------- | :---- | :--------------------- |
| **Sizes**      | `xs`       | 12px  | Extra small text.      |
|                | `sm`       | 14px  | Small text.            |
|                | `md`       | 16px  | Base body text.        |
|                | `lg`       | 18px  | Large text / subheads. |
|                | `xl`       | 24px  | Headings.              |
|                | `xxl`      | 32px  | Display text.          |
| **Weights**    | `regular`  | 400   | Normal text.           |
|                | `medium`   | 500   | Medium emphasis.       |
|                | `semibold` | 600   | Semi-bold emphasis.    |
|                | `bold`     | 700   | Bold emphasis.         |
| **LineHeight** | `tight`    | 1.2   | Headings.              |
|                | `normal`   | 1.5   | Body text.             |
|                | `relaxed`  | 1.7   | Long form text.        |

### Spacing (`spacing.ts`)

Consistent spacing scale for margins, padding, and gaps.

| Token | Value |
| :---- | :---- |
| `xs`  | 4px   |
| `sm`  | 8px   |
| `md`  | 12px  |
| `lg`  | 16px  |
| `xl`  | 24px  |

### Radius (`radius.ts`)

Border radius values for softening corners.

| Token | Value |
| :---- | :---- |
| `sm`  | 6px   |
| `md`  | 8px   |
| `lg`  | 12px  |
| `xl`  | 16px  |

### Shadows (`shadows.ts`)

Elevation and depth.

| Token | Box Shadow Value                  |
| :---- | :-------------------------------- |
| `sm`  | `0 1px 2px rgba(0, 0, 0, 0.05)`   |
| `md`  | `0 4px 6px rgba(0, 0, 0, 0.1)`    |
| `lg`  | `0 10px 15px rgba(0, 0, 0, 0.15)` |

## Adding New Tokens

If you need to add or modify tokens:

1.  Edit the relevant file (e.g., `src/GlamUI/tokens/colors.ts`).
2.  Run the build command to generate the distribution files:

    ```bash
    npm run build:tokens
    ```

This checks types and compiles the tokens for usage.

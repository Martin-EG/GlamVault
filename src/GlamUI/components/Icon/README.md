# Icon Components

This directory contains a collection of SVG icon components used throughout the GlamVault application.

## Available Icons

The following icons are available for import:

- `Box`
- `Camera`
- `Edit`
- `Exit`
- `Eye`
- `EyeOff`
- `Heart`
- `Image`
- `Remove`
- `Star`
- `Upload`
- `User`

## Usage

You can import icons directly from the `Icon` directory.

```tsx
import { Camera, Heart } from '@/GlamUI/components/Icon';

const MyComponent = () => {
  return (
    <div>
      <Camera size="md" color="black" />
      <Heart size="lg" color="red" />
    </div>
  );
};
```

## Props

All icons accept the following props:

| Prop    | Type       | Default          | Description                                      |
| ------- | ---------- | ---------------- | ------------------------------------------------ |
| `size`  | `IconSize` | `'sm'`           | The size of the icon.                            |
| `color` | `string`   | `'currentColor'` | The fill color of the icon. Accepts any CSS color. |

### Icon Sizes

The `size` prop accepts the following values, which map to pixel dimensions (defined in `Icon.types.ts`):

- `xs`: 12px
- `sm`: 16px
- `md`: 20px
- `lg`: 24px
- `xl`: 28px

## Adding New Icons

To add a new icon:

1.  Create a new `.tsx` file in this directory (e.g., `NewIcon.tsx`).
2.  Define the component using the standard SVG pattern found in other icon files. Ensure it accepts `IconProps` and uses `iconSizes`.
3.  Export the component from `index.ts`.

# Testing

Este documento explica como esta estructurado el testing en GlamVault y como escribir pruebas que sigan siendo utiles mientras el producto crece. La version corta: prueba primero el comportamiento visible para la persona usuaria, usa los helpers compartidos y conecta las expectativas que dependen de traducciones con la fuente de mensajes en ingles.

## Stack De Testing

GlamVault usa:

- `jest` como test runner.
- `jest-environment-jsdom` para pruebas de componentes con un DOM simulado.
- `@testing-library/react` para renderizar y consultar elementos como lo haria una persona usuaria.
- `@testing-library/jest-dom` para matchers de DOM mas legibles.
- `jest-styled-components` cuando necesitamos validar estilos.
- Un mock global de `next-intl` en `jest.setup.ts` que siempre resuelve traducciones en ingles.

## Comandos

Ejecutar toda la suite unitaria:

```bash
npm run test:ci
```

Ejecutar pruebas con coverage:

```bash
npm run test
```

Ejecutar pruebas en watch mode:

```bash
npm run test:watch
```

Ejecutar un solo archivo:

```bash
npx jest src/GlamUI/components/Button/Button.test.tsx --runInBand
```

Ejecutar pruebas de consistencia de traducciones:

```bash
npm run test:i18n
```

Validacion recomendada antes de abrir un PR:

```bash
npm run test:ci
npm run typecheck
npm run lint
```

## Estructura De Archivos

Las pruebas de componentes viven junto al componente que cubren:

```text
src/GlamUI/components/Button/
  Button.tsx
  Button.styles.ts
  Button.types.ts
  Button.stories.tsx
  Button.test.tsx
  index.ts
```

Las pruebas de hooks viven junto al hook:

```text
src/GlamUI/components/Menu/hooks/
  useCloseWhenClickingOutside.ts
  useCloseWhenClickingOutside.test.ts
```

Las pruebas de stores viven junto al modulo del store:

```text
src/store/
  inventory.ts
  inventory.test.ts
```

Las pruebas especificas de i18n viven en:

```text
src/i18n/test/
```

## Utilidades Compartidas

### `@/utils/test-utils`

Siempre importa `render`, `screen`, `fireEvent`, `renderHook` y los helpers de Testing Library desde `@/utils/test-utils` en lugar de importarlos directamente desde `@testing-library/react`.

```tsx
import { render, screen, fireEvent } from '@/utils/test-utils';
```

El `render` custom envuelve los componentes con el `ThemeProvider` de GlamUI. Esto evita que las pruebas con styled-components fallen porque falta el `theme`.

```tsx
render(<Button>Save</Button>);

expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
```

### `@/utils/test-messages`

Usa este helper cuando una prueba espere copy traducido.

```tsx
import { testMessages, testT } from '@/utils/test-messages';
```

Usa `testMessages` para valores directos:

```tsx
expect(
  screen.getByRole('button', {
    name: testMessages.common.menuAriaLabel,
  }),
).toBeInTheDocument();
```

Usa `testT` cuando el mensaje tenga interpolacion:

```tsx
expect(
  screen.getByText(
    testT('inventoryAddProduct.fileInput', 'errorSize', { maxSize: 1 }),
  ),
).toBeInTheDocument();
```

No importes archivos JSON de mensajes directamente desde pruebas de componentes, por ejemplo:

```tsx
// Evita esto en pruebas
import commonMessages from '../../../../messages/en/common.json';
```

Prefiere:

```tsx
import { testMessages } from '@/utils/test-messages';
```

## Mock De Traducciones

`jest.setup.ts` mockea `next-intl` globalmente para que las pruebas siempre usen traducciones en ingles.

El mock soporta:

- `useTranslations('namespace')`
- Namespaces anidados como `useTranslations('inventoryAddProduct.fileInput')`
- Keys con puntos como `t('months.4')`
- Valores interpolados como `t('helperText', { maxSize: 10 })`
- `useLocale()` regresando `'en'`

Gracias a este setup global, la mayoria de las pruebas no deben mockear `next-intl` localmente. Los mocks locales hacen que el comportamiento de traducciones sea inconsistente y pueden ocultar keys rotas.

Mockea `next-intl` dentro de una prueba solo cuando la prueba sea especificamente sobre un comportamiento inusual de i18n que no pueda usar el setup global en ingles.

## Que Probamos

### Comportamiento Visible Para La Persona Usuaria

Prefiere probar lo que la persona usuaria puede ver o hacer.

```tsx
render(<Searchbar value="lipstick" onChange={jest.fn()} onClear={onClear} />);

screen.getByRole('button', { name: testMessages.common.clearSearch }).click();

expect(onClear).toHaveBeenCalledTimes(1);
```

Buenas pruebas de comportamiento responden preguntas como:

- El componente renderiza el elemento accesible esperado?
- Hacer click, escribir, seleccionar o arrastrar archivos llama el callback esperado?
- El componente abre, cierra, se deshabilita o muestra errores correctamente?
- El nombre accesible visible para la persona usuaria coincide con el copy traducido?

### Accesibilidad

Usa primero queries accesibles:

- `getByRole`
- `getByLabelText`
- `getByPlaceholderText`
- `getByText` para copy visible y estatico
- `queryByRole` o `queryByText` para validar ausencia

Buenos ejemplos:

```tsx
expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');

expect(
  screen.getByRole('button', { name: testMessages.calendar.nextMonth }),
).toBeInTheDocument();

expect(screen.getByLabelText('Email')).toBeDisabled();
```

Si `getByRole` no puede encontrar un elemento interactivo, primero revisa si el componente es suficientemente accesible. Puede necesitar un `aria-label`, un elemento nativo o un role correcto.

### Estados De Error

La UI de errores debe validar tanto el mensaje como la conexion de accesibilidad.

```tsx
const input = screen.getByLabelText(testMessages.inventoryAddProduct.typeLabel);
const errorMessage = screen.getByText('Select an option');

expect(input).toHaveAttribute('aria-invalid', 'true');
expect(input).toHaveAttribute('aria-describedby', 'product-type-error');
expect(errorMessage).toHaveAttribute('id', 'product-type-error');
```

### Variantes Y Estado

Prueba variantes solo cuando cambien comportamiento, accesibilidad o estilos significativos. Evita pruebas exhaustivas para cada combinacion visual posible, salvo que la variante tenga un contrato real.

Ejemplos que si vale la pena probar:

- `disabled`
- `loading`
- `variant="danger"` si cambia semantica o estilos importantes
- alineacion de menu si cambia el comportamiento de posicionamiento
- estados de fecha seleccionada

### Estilos

Usa assertions de estilos para contratos estables del componente, no para detalles incidentales de CSS.

```tsx
const { container } = render(<Avatar size="sm" />);

expect(container.firstChild).toHaveStyle('width: 40px');
expect(container.firstChild).toHaveStyle('height: 40px');
```

Para reglas de styled-components, usa `jest-styled-components` solo cuando el estilo forme parte del API esperado.

### Hooks Y Utilidades

Hooks y utilidades puras deben probar entradas y salidas directamente.

```tsx
expect(formatDate(new Date(2026, 4, 5))).toBe('2026-05-05');
```

Para hooks que regresan callbacks o valores derivados, usa `renderHook` desde `@/utils/test-utils` cuando se necesite renderizado de React.

### Stores

Las pruebas de stores deben enfocarse en transiciones de estado y acciones publicas del store:

- Estado inicial
- Agregar, actualizar y eliminar registros
- Comportamiento de reset
- Casos borde que no deben mutar el estado incorrectamente

Manten las pruebas de stores independientes. Cada prueba debe iniciar desde un estado limpio o resetear el store explicitamente.

## Guia De Queries

Prefiere este orden:

1. `getByRole` con nombre accesible
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` solo cuando no exista una query significativa desde la perspectiva de la persona usuaria

Usa `data-testid` con moderacion. Es razonable para UI de terceros mockeada, elementos tecnicos ocultos o grids generados donde los nombres accesibles harian la prueba mas dificil de entender.

## Guia De Traducciones

Usa traducciones en ingles dentro de las pruebas. El entorno de Jest esta bloqueado intencionalmente a ingles para que todas las personas del equipo vean los mismos strings esperados.

Haz esto:

```tsx
screen.getByRole('button', { name: testMessages.common.save });
```

No hagas esto:

```tsx
screen.getByRole('button', { name: 'save' });
screen.getByRole('button', { name: 'Guardar' });
screen.getByRole('button', { name: /guardar|save/i });
```

Por que:

- Las keys de traduccion son detalles de implementacion.
- Los strings en espanol chocan con el setup de Jest en ingles.
- Los regex que aceptan varios locales pueden ocultar mocks rotos.
- `testMessages` mantiene las expectativas conectadas con la fuente real en ingles.

## Guia De Mocks

Mockea solo lo que la prueba no posee.

Buenos candidatos:

- Componentes visuales de terceros dificiles de renderizar en jsdom, como librerias de cropper.
- APIs del navegador que jsdom no implementa.
- Utilidades costosas cuando una prueba de componente solo necesita validar el flujo de callbacks.

Evita mockear:

- Componentes de GlamUI bajo prueba.
- `next-intl` en pruebas individuales.
- Providers de estilos o theme. Usa `@/utils/test-utils`.

## Patrones Comunes

### Probar Un Boton Traducido

```tsx
import { render, screen } from '@/utils/test-utils';
import { testMessages } from '@/utils/test-messages';

render(<Modal onConfirm={onConfirm} />);

screen.getByRole('button', { name: testMessages.common.save }).click();

expect(onConfirm).toHaveBeenCalledTimes(1);
```

### Probar Un Mensaje Interpolado

```tsx
import { testT } from '@/utils/test-messages';

expect(
  screen.getByText(
    testT('inventoryAddProduct.fileInput', 'helperText', { maxSize: 10 }),
  ),
).toBeInTheDocument();
```

### Probar Ausencia

```tsx
expect(screen.queryByRole('menu')).not.toBeInTheDocument();
```

### Probar Un Control Deshabilitado

```tsx
expect(
  screen.getByRole('button', {
    name: testMessages.inventoryAddProduct.fileInput.browseLabel,
  }),
).toBeDisabled();
```

## Agregar Una Nueva Prueba De Componente

Cuando agregues un componente de GlamUI, incluye un archivo `.test.tsx` junto al componente.

Baseline recomendado:

1. Renderiza el elemento accesible principal.
2. Soporta labels, nombres o roles requeridos.
3. Maneja la interaccion principal de la persona usuaria.
4. Maneja estado disabled o de error si el componente lo soporta.
5. Usa copy traducido mediante `testMessages` o `testT`.
6. Usa assertions de estilos solo para contratos estables del componente.

## Antes De Abrir Un Pull Request

Ejecuta:

```bash
npm run test:ci
npm run typecheck
npm run lint
```

Si lint reporta warnings en archivos no relacionados con tu cambio, mencionalos en las notas del PR. Corrige los errores de lint antes de abrir el PR.

## Notas De Mantenimiento

- Manten alineado el comportamiento de `jest.setup.ts` y `src/utils/test-messages.ts`. Deben resolver traducciones de la misma forma.
- Si se agrega un nuevo namespace de mensajes, las pruebas pueden accederlo mediante `testMessages.<namespace>`.
- Si se introduce un nuevo patron de interpolacion, actualiza `testT` y el mock de Jest juntos.
- Si una prueba empieza a necesitar un provider local, considera agregarlo a `@/utils/test-utils` para que las pruebas futuras tengan el mismo setup.

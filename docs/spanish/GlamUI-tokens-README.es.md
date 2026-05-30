# Tokens de diseño

Este directorio contiene los tokens de diseño de **GlamUI**. Los tokens de diseño son los átomos visuales del sistema de diseño; específicamente, son entidades nombradas que almacenan atributos visuales. Los usamos en lugar de valores codificados directamente (como valores hexadecimales para colores o valores en píxeles para espaciados) para mantener un sistema visual escalable y coherente en el desarrollo de UI.

## Uso

Puedes importar tokens de forma individual o todos juntos.

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

### Colores (`colors.ts`)

Usamos un sistema de colores semántico. En lugar de usar colores de paleta sin contexto (por ejemplo, `pink[500]`), utilizamos nombres funcionales como `brand.primary`.

| Categoría      | Token          | Descripción                           |
| :------------- | :------------- | :------------------------------------ |
| **Brand**      | `primary`      | Color principal de la marca.          |
|                | `secondary`    | Color secundario de la marca.         |
|                | `primaryAlpha` | Versión transparente del color primario. |
| **Text**       | `primary`      | Color de texto principal (casi negro). |
|                | `secondary`    | Color de texto secundario (gris oscuro). |
|                | `muted`        | Texto atenuado (gris claro).          |
|                | `inverse`      | Texto sobre fondos oscuros (blanco).  |
|                | `danger`       | Texto para errores.                   |
|                | `success`      | Texto para mensajes de éxito.         |
| **Border**     | `default`      | Bordes estándar.                      |
|                | `subtle`       | Bordes sutiles.                       |
|                | `focus`        | Color del anillo de foco.             |
| **Background** | `page`         | Color de fondo de la página.          |
|                | `subtle`       | Fondo ligero para secciones.          |
|                | `muted`        | Fondo atenuado.                       |
| **Feedback**   | `errorBg`      | Fondo para mensajes de error.         |
|                | `successBg`    | Fondo para mensajes de éxito.         |

### Tipografía (`typography.ts`)

| Categoría       | Token      | Valor | Descripción                   |
| :------------- | :--------- | :---- | :---------------------------- |
| **Sizes**      | `xs`       | 12px  | Texto extra pequeño.          |
|                | `sm`       | 14px  | Texto pequeño.                |
|                | `md`       | 16px  | Texto base.                   |
|                | `lg`       | 18px  | Texto grande / subtítulos.    |
|                | `xl`       | 24px  | Encabezados.                  |
|                | `xxl`      | 32px  | Texto de display.             |
| **Weights**    | `regular`  | 400   | Texto normal.                 |
|                | `medium`   | 500   | Énfasis medio.                |
|                | `semibold` | 600   | Énfasis semi-negrita.        |
|                | `bold`     | 700   | Énfasis negrita.              |
| **LineHeight** | `tight`    | 1.2   | Encabezados.                  |
|                | `normal`   | 1.5   | Texto de cuerpo.              |
|                | `relaxed`  | 1.7   | Texto de lectura larga.       |

### Espaciado (`spacing.ts`)

Escala de espaciado consistente para márgenes, rellenos y separaciones.

| Token | Valor |
| :---- | :---- |
| `xs`  | 4px   |
| `sm`  | 8px   |
| `md`  | 12px  |
| `lg`  | 16px  |
| `xl`  | 24px  |

### Radio (`radius.ts`)

Valores de radio de borde para suavizar esquinas.

| Token | Valor |
| :---- | :---- |
| `sm`  | 6px   |
| `md`  | 8px   |
| `lg`  | 12px  |
| `xl`  | 16px  |

### Sombras (`shadows.ts`)

Elevación y profundidad.

| Token | Valor de box-shadow                  |
| :---- | :---------------------------------- |
| `sm`  | `0 1px 2px rgba(0, 0, 0, 0.05)`      |
| `md`  | `0 4px 6px rgba(0, 0, 0, 0.1)`       |
| `lg`  | `0 10px 15px rgba(0, 0, 0, 0.15)`    |

## Añadir nuevos tokens

Si necesitas agregar o modificar tokens:

1. Edita el archivo correspondiente (por ejemplo, `src/GlamUI/tokens/colors.ts`).
2. Ejecuta el comando de compilación para generar los archivos de distribución:

    ```bash
    npm run build:tokens
    ```

Esto comprueba los tipos y compila los tokens para su uso.

![GlamVault logo](../public/glamvault-complete.svg)

## Qué es

**GlamVault** es una plataforma de inventario donde los usuarios pueden iniciar sesión y agregar sus productos de maquillaje a su propio inventario digital, creando una colección personalizada para filtrar y organizar fácilmente. **GlamVault** también ayuda a los usuarios a rastrear cuándo expira su maquillaje y guardar artículos para comprar más tarde en una sección de lista de deseos.

## Primeros pasos

GlamVault todavía está en desarrollo, pero puedes probarlo clonando el repositorio en tu máquina local. Este proyecto usa `npm` como gestor de paquetes. Para instalar las dependencias, ejecuta:

```bash
npm install
```

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

## Estructura del proyecto

- glamvault-web
  - public/
    - glamvault-complete.svg
    - glamvault-logo.svg
    - glamvault-wordmark.svg
  - scripts/
    - generate-ui-component.js
  - messages/
    - en.json
    - es.json
  - src/
    - app/
      - api/
      - dashboard/
      - auth/
        - login/
        - register/
        - recover-password/
      - layout.tsx
      - page.tsx
    - GlamUI/
      - components/
      - tokens/
      - styles/
      - index.ts
    - features/
    - lib/
    - providers/
    - store/
    - types/
    - utils/
  - package.json

## GlamUI

GlamUI es una biblioteca de UI que se utiliza para construir la interfaz de GlamVault. En esta biblioteca puedes encontrar componentes, iconos y tokens que se usan en la plataforma GlamVault.

Si necesitas agregar un nuevo componente, puedes hacerlo ejecutando:

```bash
npm run generate:ui-component <component-name>
```

Esto creará algunos archivos para el nuevo componente en el directorio `src/GlamUI/components`.
En este directorio puedes encontrar el componente, las historias del componente, los estilos del componente y los tipos del componente. Por ejemplo:

- Avatar/
  - Avatar.tsx
  - Avatar.stories.tsx
  - Avatar.styles.ts
  - Avatar.types.ts
  - Avatar.test.tsx
  - index.ts

## Pruebas

Queremos mantener los componentes guiados por pruebas, por lo que cada componente debe tener un archivo de prueba. El objetivo con las pruebas es verificar el comportamiento y los estilos del componente más que la implementación, para que podamos centrarnos en lo que hace el componente y no en cómo lo hace.

Puedes encontrar el archivo de prueba en el mismo directorio que el componente. Se llamará igual que el componente pero con la extensión `.test.tsx`.

Tenemos una función `render` personalizada que envuelve el componente en un `ThemeProvider` y un `QueryClientProvider`. Puedes encontrarla en `src/utils/test-utils.tsx`. Cada prueba debe importar y usar esta función `render` en lugar de la función `render` predeterminada de `@testing-library/react`, para así asegurarnos de que nuestras pruebas sean consistentes y fiables.

Lo que probamos:

**Comportamiento del componente**

Siempre se debe probar el comportamiento del componente para asegurarnos de que nuestras pruebas sean coherentes y fiables.

```
render(<Button>Guardar</Button>)

expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
```

- ✔️ Valida lo que el usuario ve.
- ✔️ Sobrevive a refactorizaciones.
- ✔️ Documenta el comportamiento esperado.

**Variantes del componente**

Solo para estados relevantes, no para cada estado.

```
render(<Button variant="danger">Eliminar</Button>)

expect(screen.getByRole('button', { name: /eliminar/i })).toHaveClass('button-danger')
```

**Estilos del componente**

```
const { container } = render(<Button fullSize>Full Size</Button>);

expect(container.firstChild).toHaveStyle('width: 100%');
```

**Accesibilidad del componente**

Por favor usa:

- `getByRole`
- `aria-label`
- `aria-disabled`
- `role="alert"`
- `aria-expanded`

```
render(<Button>Guardar</Button>)

expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
```

**Si no puedes encontrar un elemento con `getByRole`, podría ser porque no es accesible. Asegúrate de que sea accesible añadiendo atributos `aria-label` o `role`.**

Puedes ejecutar las pruebas con:

```bash
npm run test
```

o

```bash
npm run test:watch
```

Si solo quieres ejecutar un archivo de prueba específico, puedes hacerlo con:

```bash
npm run test <ruta-al-archivo-de-prueba>
```

## Traducciones

Usamos `next-intl` para las traducciones. Puedes encontrar las traducciones en el directorio `messages`. Por ahora solo tenemos traducciones en inglés y español.
Usamos la siguiente estructura para las traducciones:

```
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar"
  },
  "auth": {
    "welcome": "Bienvenido",
    "password": "Contraseña",
    "email": "Correo electrónico",
    ...
  },
  "errors": {
    "invalidEmail": "Introduce un email válido",
    "emptyFields": "Completa todos los campos",
    ...
  }
}
```

Si necesitas agregar nuevas traducciones, añádelas al directorio `messages` en el mismo alcance que el resto de las traducciones. Asegúrate de añadir la traducción tanto en `en.json` como en `es.json`.

## Cómo contribuir a GlamVault

Para contribuir a GlamVault, debes comenzar creando una nueva rama desde la rama `main`.

```bash
git checkout -b <branch-name>
```

Después de eso, puedes empezar a hacer tus cambios y cuando estés listo para crear un pull request, ejecuta:

```bash
git add .
git commit -m "<type-of-change>(<scope>): <commit-message>"
git push origin <branch-name>
```

Donde `<type-of-change>` puede ser uno de los siguientes:

- feat: Una nueva funcionalidad
- fix: Una corrección de error
- docs: Cambios solo de documentación
- style: Cambios de estilo que no afectan el significado (espacios, formato, punto y coma faltante, etc.)
- refactor: Un refactor que no arregla un bug ni añade una nueva funcionalidad
- test: Pruebas
- strings: Cambios en las traducciones
- chore: Tareas auxiliares o de configuración

Y `<scope>` es el ámbito del cambio. Por ejemplo, si estás agregando un componente, el scope sería `components`.

Y `<commit-message>` es una breve descripción del cambio.

Por ejemplo:

```bash
git add .
git commit -m "feat(components): add avatar component"
git push origin <branch-name>
```

Después de eso, puedes crear un pull request y esperar la revisión de los mantenedores.

## Despliegue

El despliegue de la plataforma GlamVault se maneja con Vercel. Cuando se mergea un pull request, los cambios se despliegan automáticamente en la rama `main`.

![GlamVault logo](public/glamvault-complete.svg)

## What it is

**GlamVault** is an inventory platform where users can login and add their makeup items into their own digital inventory adding a custom “collection” for easy filtering/organize. **GlamVault** will also help users to track when their makeup will expire and save items to buy later in a wish list section.

## Getting Started

GlamVault stills on development, but you can try it out by pulling the repository to your local machine. This project uses `npm` as a package manager. To install dependencies, run:

```bash
npm install
```

To start the development server, run:

```bash
npm run dev
```

## Project Structure

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
    - utils/
  - package.json

## GlamUI

GlamUI is a UI library that is used to build the UI of the GlamVault platform. On this library you can find components, icons and tokens that are used in the GlamVault platform.

If you need to add a new component, you can do it by running:

```bash
npm run generate:ui-component <component-name>
```

This will create a some files for the new component in the `src/GlamUI/components` directory.
On this directory you can find the component, the component's stories, the component's styles and the component's types. Like:

- Avatar/
  - Avatar.tsx
  - Avatar.stories.tsx
  - Avatar.styles.ts
  - Avatar.types.ts
  - Avatar.test.tsx
  - index.ts

## Testings

We want to keep components test-driven, so every component must have a test file. The goal with testing is to test the component's behaviour and styles. more than implementation so we can focus on what the component does and not how it does it.
You can find the test file in the same directory as the component. It will be named like the component but with `.test.tsx` extension.

We have a custom `render` function that wraps the component in a `ThemeProvider` and a `QueryClientProvider`. You can find it in `src/utils/test-utils.tsx` And every test should import and use this `render` function instead of the default `render` function from `@testing-library/react` so we can make sure our tests are consistent and reliable.

What we test:

**Component's behaviour**

Always the component's behavior must be tested so we can make sure our tests are consistent and reliable.

```
render(<Button>Save</Button>)

expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
```

- ✔️ Validates what the user see.
- ✔️ Survives to refactors.
- ✔️ Documents the expected component's behavior.

**Component's variants**
just for relevant states, not for every state.

```
render(<Button variant="danger">Delete</Button>)

expect(screen.getByRole('button', { name: /delete/i })).toHaveClass('button-danger')
```

**Component's styles**

```
const { container } = render(<Button fullSize>Full Size</Button>);

expect(container.firstChild).toHaveStyle('width: 100%');
```

**Component's accessibility**
Please use:

- `getByRole`
- `aria-label`
- `aria-disabled`
- `role="alert"`
- `aria-expanded`

```
render(<Button>Save</Button>)

expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
```

**If you cannot find an element with `getByRole`, it could be because it's not accessible. Please make sure it is accessible by adding `aria-label` or `role` attributes.**

You can run tests with:

```bash
npm run test
```

or

```bash
npm run test:watch
```

If you only want to run an specific test file, you can do it by running:

```bash
npm run test <path-to-test-file>
```

## Translations

We use `next-intl` for translations. You can find the translations in the `messages` directory. By now we only have english and spanish translations.
We use the next structure for translations:

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

If you need to add new translations, do please add them to the `messages` directory in the same scope as the rest of the translations. Please make sure to add the translation to both `en.json` and `es.json` files.

## How to contribute to GlamVault

To contribute to GlamVault, you need to start by creating a new branch from the `main` branch.

```bash
git checkout -b <branch-name>
```

After that, you can start making your changes and when you are ready to create a pull request, run:

```bash
git add .
git commit -m "<type-of-change>(<scope>): <commit-message>"
git push origin <branch-name>
```

Where `<type-of-change>` can be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug or adds a feature
- test: Adding missing tests or correcting existing tests
- strings: Changes to the translations
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

And `<scope>` is the scope of the change. For example, if you are adding a new component, the scope would be `components`.

And `<commit-message>` is a short description of the change.

For example:

```bash
git add .
git commit -m "feat(components): add avatar component"
git push origin <branch-name>
```

After that, you can create a pull request. And wait for the review of the maintainers.

## Deployment

The deployment of the GlamVault platform is handled by Vercel. When a pull request is merged, the changes are automatically deployed to the `main` branch.

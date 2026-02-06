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
  - index.ts

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

# PepperStorm

PepperStorm is a recipe companion app built for collecting, browsing, and organizing cooking ideas in one place. It combines a recipe library, a lightweight inspiration board, and a shared planning list so users can move from "what should we cook?" to "what do we need to buy?" without leaving the app.

## What the app does

- Browse a recipe collection sorted from Firebase.
- Open detailed recipe pages with ingredients, method, images, and servings controls.
- Add and edit recipes through structured forms.
- Save quick cooking ideas and inspiration entries.
- Manage a to-do or shopping-style list.
- Share the planning list with other users by email.
- Sign in with Google for protected actions like creating recipes or using the private list.

## Tech stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Material UI with Emotion for styling

### Data and state

- Firebase Authentication for Google sign-in
- Cloud Firestore for recipes, ideas, settings, and to-do list data
- TanStack Query for server-state fetching and caching
- Zustand for client-side app state
- React Hook Form with Zod validation for form handling

### Quality and delivery

- Vitest and Testing Library for unit and component tests
- Playwright for end-to-end testing
- ESLint for code quality
- `vite-plugin-pwa` for progressive web app support

## Main areas

- `Recipes`: the core browsing experience, including list and details views.
- `New Recipe`: authenticated form flow for creating or updating recipes.
- `Ideas`: a lighter space for quick recipe inspiration.
- `Todo List`: a private/shared checklist for planning ingredients or cooking tasks.

## Project structure

```text
src/
  api/           Firebase setup
  components/    Reusable UI and feature components
  constants/     Routes, app labels, config values
  hooks/         Auth, database, and feature hooks
  pages/         Route-level screens
  schemas/       Zod validation schemas
  store/         Zustand store and slices
  test/          Vitest test setup and specs
```

## Getting started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Testing

```bash
npm run test
npm run test:e2e
```

## Notes

- Authentication-protected routes are used for actions like adding recipes and managing the to-do list.
- The app is configured as a PWA and includes a manifest plus Workbox runtime caching.
- Firebase configuration currently lives in the codebase, so if you plan to open-source or deploy this more broadly, moving secrets and environment-specific values into environment variables would be a good next step.

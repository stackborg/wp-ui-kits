# Contributing to WP UI Kits

Thank you for your interest in contributing to **WP UI Kits** — the shared React dashboard core for Stackborg WordPress plugins, providing API client, hooks, components, and design tokens. This is the shared frontend foundation that **all Stackborg plugin dashboards depend on**, so changes here have ecosystem-wide impact.

## Code of Conduct

We are committed to a welcoming and harassment-free environment. Be respectful, constructive, and professional in all interactions. Discrimination, personal attacks, and disruptive behavior will not be tolerated.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone git@github.com:YOUR_USERNAME/wp-ui-kits.git
   cd wp-ui-kits
   ```
3. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Requirements
- Node.js 18+
- npm

### Installation
```bash
# Install all dependencies
npm install

# Build the library
npm run build

# Run type checks
npm run typecheck
```

> **Note:** This is an npm library package (`@stackborg/wp-ui-kits`), not a WordPress plugin. It is consumed by plugin dashboards via npm. You do not need a running WordPress instance to develop or test UI kits.

## Project Structure

```
src/
├── components/     # Shared React components (tables, forms, modals, etc.)
├── hooks/          # Custom React hooks (useApi, useSettings, etc.)
├── styles/         # Design tokens and shared CSS
├── icons.ts        # Icon re-exports from lucide-react
├── index.ts        # Main entry point
tests/              # Vitest test files
```

Package: `@stackborg/wp-ui-kits`

## Coding Standards

- **TypeScript strict mode** — all code must be fully typed
- **React 18+** — use functional components and hooks only
- **ESM modules** — `"type": "module"` in package.json
- **Naming conventions:**
  - Components: `PascalCase` (e.g., `DataTable.tsx`)
  - Hooks: `camelCase` with `use` prefix (e.g., `useApiClient.ts`)
  - Utilities: `camelCase` (e.g., `formatDate.ts`)
- **No direct WordPress dependencies** — this library must remain framework-agnostic for the React side
- **Lint before committing** — run `npm run lint`

## Testing

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

Write tests in `tests/` using Vitest with `@testing-library/react`. Every exported component and hook should have test coverage.

## Submitting Changes

### Branch Naming
- `feature/short-description` — new features
- `fix/short-description` — bug fixes
- `docs/short-description` — documentation updates

### Commit Messages
Write clear, descriptive commit messages in English:
```
Add DataTable component with sortable columns and pagination

Fix useApiClient hook not refreshing on endpoint change
```

### Pull Request Process
1. Ensure all tests pass: `npm test`
2. Ensure linting passes: `npm run lint`
3. Ensure type checks pass: `npm run typecheck`
4. Ensure library builds cleanly: `npm run build`
5. Write a clear PR description explaining **what** and **why**
6. Note any downstream plugin dashboard impact
7. Reference any related issues (e.g., `Fixes #42`)

> **⚠️ Important:** Since all Stackborg plugin dashboards depend on this library, any breaking changes to exported APIs require a major version bump and must be discussed in an issue first.

## Security

If you discover a security vulnerability, **do not** open a public issue. Instead, email **security@stackborg.com** with a detailed description. We will respond within 48 hours and work with you to resolve the issue before any public disclosure.

---

Thank you for helping build beautiful WordPress dashboards! 🎨

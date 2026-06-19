# wp-ui-kits — Component Reference

> Shared React UI library for Stackborg WordPress plugin dashboards.
> Package: `@stackborg/wp-ui-kits` v1.0.5

---

## Installation

```bash
npm install @stackborg/wp-ui-kits
```

```tsx
// Import components
import { Button, Card, DataTable, DashboardShell } from '@stackborg/wp-ui-kits';

// Import styles (required once in your app entry)
import '@stackborg/wp-ui-kits/styles';

// Import icons
import { icons } from '@stackborg/wp-ui-kits/icons';
```

---

## Components

### Layout

| Component | Description | Props |
|-----------|-------------|-------|
| `DashboardShell` | Main dashboard layout wrapper with sidebar navigation | `children`, `nav`, `title` |
| `PageHeader` | Page title bar with optional actions | `title`, `description`, `actions` |

### Data Display

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `DataTable` | Sortable, paginated data table | `columns`, `data`, `onSort`, `pagination` |
| `Card` | Content card container | `children`, `title`, `footer` |
| `Badge` | Status/label badge | `variant`, `children` |
| `StatusBadge` | Colored status indicator | `status`, `label` |
| `EmptyState` | Empty data placeholder | `icon`, `title`, `description`, `action` |

### Forms & Inputs

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Button` | Action button with variants | `variant`, `size`, `loading`, `disabled`, `onClick` |
| `Input` | Text input field | `label`, `value`, `onChange`, `error`, `placeholder` |
| `Select` | Dropdown select | `options`, `value`, `onChange`, `label` |
| `Toggle` | On/off switch | `checked`, `onChange`, `label` |

### Feedback

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Alert` | Notification banner | `type` (success/error/warning/info), `message` |
| `Toast` | Temporary notification popup | `message`, `type`, `duration` |
| `Spinner` | Loading spinner | `size` |
| `LoadingState` | Full loading placeholder | `message` |
| `Skeleton` | Content skeleton loader | `width`, `height`, `count` |
| `ConfirmDialog` | Confirmation modal | `title`, `message`, `onConfirm`, `onCancel` |

### Addons

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `AddonCard` | Addon marketplace card | `addon`, `onInstall`, `onActivate` |
| `AddonsPage` | Full addon marketplace page | `addons`, `categories` |
| `FeatureGate` | Conditionally show content by license | `feature`, `children`, `fallback` |

### Error Handling

| Component | Description |
|-----------|-------------|
| `ErrorBoundary` | React error boundary with fallback UI |

---

## Hooks

### `useApi()`

REST API client hook with automatic nonce handling.

```tsx
import { useApi } from '@stackborg/wp-ui-kits';

function MyComponent() {
  const api = useApi();

  const fetchData = async () => {
    const response = await api.get('/settings');
    // response.data contains the result
  };

  const saveData = async (data) => {
    await api.post('/settings', data);
  };
}
```

### `useWordPressData(endpoint)`

Auto-fetching hook for REST endpoints.

```tsx
import { useWordPressData } from '@stackborg/wp-ui-kits';

function SettingsPage() {
  const { data, loading, error, refetch } = useWordPressData('/settings');

  if (loading) return <LoadingState />;
  if (error) return <Alert type="error" message={error} />;

  return <div>{JSON.stringify(data)}</div>;
}
```

### `useToast()`

Toast notification hook.

```tsx
import { useToast } from '@stackborg/wp-ui-kits';

function SaveButton() {
  const { showToast } = useToast();

  const onSave = async () => {
    await api.post('/settings', data);
    showToast('Settings saved!', 'success');
  };
}
```

### `useAddons()`

Addon management hook.

```tsx
import { useAddons } from '@stackborg/wp-ui-kits';

function AddonsManager() {
  const { addons, install, activate, deactivate, loading } = useAddons();
}
```

### `useFeature(featureName)`

Feature gate hook for license-based features.

```tsx
import { useFeature } from '@stackborg/wp-ui-kits';

function PremiumWidget() {
  const { isAvailable, upgrade } = useFeature('advanced-analytics');

  if (!isAvailable) return <Button onClick={upgrade}>Upgrade</Button>;
  return <AdvancedAnalytics />;
}
```

### `useLicense()`

License management hook.

```tsx
import { useLicense } from '@stackborg/wp-ui-kits';

function LicensePage() {
  const { license, activate, deactivate, status } = useLicense();
}
```

---

## API Client

### `client.ts`

Low-level REST API client.

```tsx
import { apiClient } from '@stackborg/wp-ui-kits';

// GET request
const data = await apiClient.get('/wp-json/sb-myplugin/v1/settings');

// POST request
await apiClient.post('/wp-json/sb-myplugin/v1/settings', { key: 'value' });
```

The client automatically:
- Includes `X-WP-Nonce` header for authentication
- Handles JSON serialization/deserialization
- Provides error handling

---

## Bootstrap

### `bootstrap(config)`

Initialize a plugin dashboard.

```tsx
import { bootstrap } from '@stackborg/wp-ui-kits';
import App from './App';

bootstrap({
  rootId: 'sb-myplugin-root',
  App: App,
});
```

---

## Icons

The library exports a set of consistent icons from Lucide React.

```tsx
import { icons } from '@stackborg/wp-ui-kits/icons';

// Use in components
<icons.Settings size={20} />
<icons.Save size={16} />
```

---

## Styling

Import the base stylesheet once in your app:

```tsx
import '@stackborg/wp-ui-kits/styles';
```

This provides:
- CSS custom properties (design tokens)
- Component styles
- Dark mode support
- WordPress admin integration styles

---

*Built by [Stackborg](https://stackborg.com) — © 2026*

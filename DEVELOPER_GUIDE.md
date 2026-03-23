# WP UI Kits — Developer Guide

Complete API reference for Stackborg dashboard development.

---

## Bootstrap

Replaces `main.tsx` boilerplate. One call mounts your React app with StrictMode.

```tsx
// main.tsx
import { createDashboard } from '@stackborg/wp-ui-kits';
import '@stackborg/wp-ui-kits/styles';
import App from './App';

createDashboard('sb-my-plugin-root', App);

// Options
createDashboard('sb-my-plugin-root', App, {
  disableStrictMode: true,  // disable React.StrictMode
});
```

---

## API Client

Typed WordPress REST client. Auto-reads nonce from `window.sb*Data`.

```tsx
import { createApiClient } from '@stackborg/wp-ui-kits';

const api = createApiClient('sbMyPluginData');

// Methods
const data = await api.get<Settings>('/settings');
await api.post<void>('/settings', { key: 'value' });
await api.put<void>('/settings/1', updated);
await api.del<void>('/settings/1');

// File upload (omits Content-Type, sends as FormData)
const form = new FormData();
form.append('file', fileInput);
await api.upload<ImportResult>('/import', form);
```

### Error Handling

```tsx
import { ApiError } from '@stackborg/wp-ui-kits';

try {
  await api.post('/action', data);
} catch (err) {
  if (err instanceof ApiError) {
    console.log(err.message);  // server message
    console.log(err.status);   // HTTP status
    console.log(err.errors);   // validation errors
  }
}
```

---

## Hooks

### useApi

Data fetching with loading, error, and refetch.

```tsx
import { useApi } from '@stackborg/wp-ui-kits';

function Dashboard() {
  const { data, loading, error, refetch } = useApi<Stats>(api, '/stats');

  if (loading) return <LoadingState />;
  if (error) return <p>{error.message}</p>;
  return <Card title="Users" value={data!.count} />;
}

// Re-fetch when dependencies change
const { data } = useApi<Items>(api, `/items?page=${page}`, [page]);
```

### useWordPressData

Typed access to WordPress-localized data.

```tsx
import { useWordPressData } from '@stackborg/wp-ui-kits';

interface MyPluginData extends WordPressPluginData {
  planType: string;
}

const wp = useWordPressData<MyPluginData>('sbMyPluginData');
console.log(wp.apiUrl, wp.nonce, wp.planType);
```

### useToast

```tsx
import { useToast, ToastContainer } from '@stackborg/wp-ui-kits';

function App() {
  const { toasts, addToast, removeToast, clearToasts } = useToast();

  const save = async () => {
    try {
      await api.post('/settings', data);
      addToast({ type: 'success', message: 'Settings saved!' });
    } catch {
      addToast({ type: 'error', message: 'Save failed.' });
    }
  };

  return (
    <>
      <button onClick={save}>Save</button>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </>
  );
}

// Toast options
addToast({ type: 'success', message: 'Done!' });              // auto-dismiss 4s
addToast({ type: 'error', message: 'Error!', duration: 0 });  // permanent
addToast({ type: 'warning', message: 'Warning!' });
addToast({ type: 'info', message: 'FYI' });
```

---

## Components

### PageHeader

```tsx
<PageHeader
  title="Dashboard"
  description="Overview of your plugin"
  actions={<button>Export</button>}
/>
```

### Card

```tsx
// Stat card
<Card title="Total Users" value={1234} description="+12% this month" />

// With icon
<Card title="Revenue" value="$5,420" icon={<DollarIcon />} />

// Content card
<Card title="Recent Activity">
  <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
</Card>
```

### StatusBadge

```tsx
<StatusBadge label="Active" variant="success" />
<StatusBadge label="Failed" variant="error" />
<StatusBadge label="Pending" variant="warning" />
<StatusBadge label="Draft" variant="info" />
<StatusBadge label="Archived" variant="neutral" />
```

### LoadingState

```tsx
<LoadingState />                          // 3 skeleton rows
<LoadingState rows={6} />                 // 6 skeleton rows
<LoadingState spinner />                  // spinning loader
<LoadingState spinner message="Loading..." />
```

### EmptyState

```tsx
<EmptyState
  title="No items yet"
  description="Create your first item to get started."
  icon={<InboxIcon />}
  action={<button>Create Item</button>}
/>
```

### ConfirmDialog

```tsx
const [open, setOpen] = useState(false);

<ConfirmDialog
  open={open}
  title="Delete this item?"
  message="This action cannot be undone."
  variant="danger"           // red confirm button
  confirmLabel="Delete"
  cancelLabel="Keep"
  onConfirm={() => { deleteItem(); setOpen(false); }}
  onCancel={() => setOpen(false)}
/>
```

### ErrorBoundary

```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Custom fallback
<ErrorBoundary fallback={<p>Something broke.</p>}>
  <RiskyComponent />
</ErrorBoundary>
```

---

## Layout

### DashboardShell

Sidebar navigation layout with collapsible sidebar. Uses React Router `<Outlet />`.

```tsx
import { DashboardShell } from '@stackborg/wp-ui-kits';
import type { NavItem } from '@stackborg/wp-ui-kits';
import { LayoutDashboard, Settings, Users } from 'lucide-react';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Users', path: '/users', icon: <Users size={18} /> },
  { label: 'Settings', path: '/settings', icon: <Settings size={18} /> },
];

// In your router layout:
<DashboardShell pluginName="MailPress" version="1.2.0" navItems={navItems} />
```

### DataTable

Sortable table with typed columns and custom cell renderers.

```tsx
import { DataTable, StatusBadge } from '@stackborg/wp-ui-kits';
import type { Column } from '@stackborg/wp-ui-kits';

interface User { id: number; name: string; status: string; }

const columns: Column<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge label={String(v)} variant="success" /> },
];

<DataTable columns={columns} data={users} keyField="id" onRowClick={(row) => navigate(`/users/${row.id}`)} />
```

---

## Design Tokens

All components use `--sb-*` CSS custom properties. Override in your plugin:

```css
:root {
  /* Colors */
  --sb-color-primary: #6366f1;
  --sb-color-primary-hover: #4f46e5;
  --sb-color-success: #22c55e;
  --sb-color-error: #ef4444;
  --sb-color-warning: #f59e0b;
  --sb-color-info: #3b82f6;

  /* Spacing: --sb-space-{1-12} */
  /* Typography: --sb-font-size-{xs,sm,base,lg,xl,2xl} */
  /* Borders: --sb-radius-{sm,md,lg,xl,full} */
  /* Shadows: --sb-shadow-{sm,md,lg} */
  /* Transitions: --sb-transition-{fast,normal,slow} */
}
```

---

## Types

```tsx
import type {
  WordPressPluginData,  // { apiUrl, nonce, version, adminUrl?, siteTitle?, siteUrl? }
  ApiResponse,          // { success, data, message? }
  PaginatedResponse,    // { success, data[], meta: { total, page, per_page, pages } }
  ApiClient,            // { get, post, put, del, upload }
  Toast,                // { id, type, message, duration? }
} from '@stackborg/wp-ui-kits';
```

---

## Addon System

### useAddons

Full addon management from dashboard.

```tsx
import { useAddons } from '@stackborg/wp-ui-kits';

function Addons() {
  const { addons, loading, install, uninstall, activate, deactivate, update, refetch } = useAddons(api);

  await install('automation', 'https://api.stackborg.com/addons/automation.zip');
  await activate('automation');
  await deactivate('automation');
  await uninstall('automation');
}
```

### useFeature

Check feature accessibility from addon state.

```tsx
import { useFeature } from '@stackborg/wp-ui-kits';

const { accessible, tier, addonActive, licenseStatus } = useFeature(addons, 'automation', 'conditional_logic');
```

### useLicense

License management with loading state.

```tsx
import { useLicense } from '@stackborg/wp-ui-kits';

const { activate, deactivate, activating, error } = useLicense(api, refetch);
await activate('automation', 'SB-LICENSE-KEY');
await deactivate('automation');
```

### AddonsPage

Full addon management page with tabs, search, and grid.

```tsx
import { AddonsPage } from '@stackborg/wp-ui-kits';

<AddonsPage
  addons={addons}
  loading={loading}
  onActivate={activate}
  onDeactivate={deactivate}
  onInstall={(slug) => install(slug, downloadUrl)}
  onUninstall={uninstall}
  onLicense={(slug) => openLicenseModal(slug)}
/>
```

### FeatureGate

Conditional rendering based on feature access.

```tsx
import { FeatureGate } from '@stackborg/wp-ui-kits';

<FeatureGate addons={addons} addon="automation" feature="conditional_logic" fallback={<UpgradePrompt />}>
  <ConditionalLogicEditor />
</FeatureGate>
```

### Types

```tsx
import type {
  AddonMeta,         // { slug, name, version, type, features, requires }
  AddonState,        // { ...AddonMeta, active, installed, tier, license }
  AddonListResponse, // { addons: AddonState[], count }
  AddonActionResult, // { success, message, errors?, meta? }
  LicenseActionResult, // { success, status, message, expiry? }
} from '@stackborg/wp-ui-kits';
```


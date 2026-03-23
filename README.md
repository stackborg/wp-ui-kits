# WP UI Kits

Shared React component library for WordPress plugin dashboards.

> **Internal package.** Maintained by [Stackborg](https://stackborg.com) for its own products. Public use permitted under MIT — no external support or guarantees. Use at your own risk.

## Requirements

- React 18+
- React Router Dom 7+
- Node.js 20+

## Install

```bash
npm install @stackborg/wp-ui-kits
```

## What's Inside

| Export | Type | Purpose |
|--------|------|---------|
| `createDashboard` | Bootstrap | Mount React app into WP admin |
| `createApiClient` | API | Typed REST client with auto-nonce |
| `useApi` | Hook | Data fetching (loading/error/refetch) |
| `useWordPressData` | Hook | Typed access to `window.sb*Data` |
| `useToast` | Hook | Toast notification state |
| `DashboardShell` | Layout | Collapsible sidebar + content area |
| `ErrorBoundary` | Component | Catches render errors |
| `PageHeader` | Component | Title + actions layout |
| `Card` | Component | Stat/info cards |
| `StatusBadge` | Component | Colored status labels |
| `LoadingState` | Component | Skeleton / spinner |
| `EmptyState` | Component | No data placeholder |
| `ToastContainer` | Component | Toast notifications |
| `ConfirmDialog` | Component | Destructive action modal |
| `DataTable` | Component | Sortable table with custom renderers |
| **Addon System** | | |
| `useAddons` | Hook | Addon listing, install, activate, update |
| `useFeature` | Hook | Feature accessibility check |
| `useLicense` | Hook | License activate/deactivate |
| `AddonsPage` | Component | Full addon management page |
| `AddonCard` | Component | Individual addon card with actions |
| `FeatureGate` | Component | Conditional render by feature access |

## Usage

See **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** for complete API reference and examples.

## Development

```bash
npm install
npm run lint && npm run typecheck && npm test
```

## License

MIT — No warranty. No external support.

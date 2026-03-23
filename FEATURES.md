# wp-ui-kits Features

## Bootstrap
- **createDashboard** — one-line React mount for WordPress admin pages

## API Client
- **createApiClient** — WordPress REST API client with nonce auth
- **ApiError** — typed error with validation details

## Hooks
- **useApi** — data fetching with loading/error states
- **useWordPressData** — typed access to `wp_localize_script` data
- **useToast** — lightweight toast notification system
- **useAddons** — addon CRUD operations
- **useFeature** — feature access control (addon + license check)
- **useLicense** — license activation/deactivation

## Layout
- **DashboardShell** — collapsible sidebar navigation layout

## Primitives
- **Button** — 5 variants (primary/secondary/danger/warning/ghost), 3 sizes, loading spinner
- **Input** — 3 sizes, optional icon, fullWidth
- **Badge** — 5 semantic variants + custom color override
- **Alert** — 4 variants (info/warning/error/success), dismissible, icon override

## Components
- **Card** — stats/info display with icon, value, description
- **StatusBadge** — semantic status labels
- **PageHeader** — page title with description and action slot
- **DataTable** — sortable, paginated table with column definitions
- **ConfirmDialog** — modal confirmation for destructive actions
- **ErrorBoundary** — React error catch with recovery UI
- **LoadingState** — animated loading spinner
- **EmptyState** — placeholder for empty data
- **ToastContainer** — stacked notification display

## Addon Components
- **AddonsPage** — full addon management with tabs, search, grid, batch update
- **AddonCard** — individual addon display with actions, icons, pricing, dependencies
- **FeatureGate** — conditional rendering based on feature access

## Design System
- **tokens.css** — CSS Custom Properties for all design tokens
- All components use `var(--sb-*)` tokens — plugins override via `:root`
- Addon-specific tokens for card, badge, icon, price theming

## TypeScript Types
- Full type definitions for addon state, API responses, license results
- Exported for plugin-level type safety

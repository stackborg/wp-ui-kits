# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-23

### Added

- **API Client**: `createApiClient()` — typed WordPress REST API client with auto-nonce, error handling, and file upload support
- **Bootstrap**: `createDashboard()` — mount helper that replaces main.tsx boilerplate
- **Hooks**: `useApi` (data fetching), `useWordPressData` (typed WP data access), `useToast` (notification system)
- **Components**: `ErrorBoundary`, `PageHeader`, `Card`, `StatusBadge`, `LoadingState`, `EmptyState`, `ToastContainer`, `ConfirmDialog`, `DataTable`
- **Addon System**: `useAddons` (addon management hook), `useFeature` (feature access check), `useLicense` (license management), `AddonsPage` (full addon management UI), `AddonCard` (addon display card), `FeatureGate` (conditional rendering by feature)
- **Types**: `WordPressPluginData`, `ApiResponse`, `PaginatedResponse`, `AddonMeta`, `AddonState`, `AddonListResponse`, `AddonActionResult`, `LicenseActionResult`
- **Design Tokens**: CSS Custom Properties for colors, spacing, typography, borders, shadows, transitions
- WP admin CSS reset for clean dashboard rendering
- Tree-shakeable named exports via `index.ts`

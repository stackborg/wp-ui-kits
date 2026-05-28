/**
 * @stackborg/wp-ui-kits — Public API
 *
 * Central export for all shared UI components, hooks, and utilities.
 * Named exports for tree-shaking — plugins only bundle what they use.
 *
 * Path Convention:
 *   Internal imports use @/ alias (e.g. @/components/Button)
 *   This file uses @/ as the package entry point.
 *
 * Theming:
 *   All components use CSS Custom Properties from tokens.css.
 *   Plugins override via :root { --sb-color-primary: #your-color; }
 */
// ── Bootstrap ──
export { createDashboard } from './bootstrap';
// ── API ──
export { createApiClient, ApiError } from './api/client';
// ── Hooks ──
export { useApi } from './hooks/useApi';
export { useWordPressData } from './hooks/useWordPressData';
export { useToast } from './hooks/useToast';
// ── Layout ──
export { DashboardShell } from './components/DashboardShell';
// ── Components ──
export { ErrorBoundary } from './components/ErrorBoundary';
export { PageHeader } from './components/PageHeader';
export { Card } from './components/Card';
export { StatusBadge } from './components/StatusBadge';
export { LoadingState } from './components/LoadingState';
export { EmptyState } from './components/EmptyState';
export { ToastContainer } from './components/Toast';
export { ConfirmDialog } from './components/ConfirmDialog';
export { DataTable } from './components/DataTable';
// ── Primitives ──
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Badge } from './components/Badge';
export { Alert } from './components/Alert';
export { Skeleton } from './components/Skeleton';
export { Toggle } from './components/Toggle';
export { Select } from './components/Select';
export { Spinner } from './components/Spinner';
// ── Addon Hooks ──
export { useAddons } from './hooks/useAddons';
export { useFeature } from './hooks/useFeature';
export { useLicense } from './hooks/useLicense';
// ── Addon Components ──
export { AddonsPage } from './components/AddonsPage';
export { AddonCard } from './components/AddonCard';
export { FeatureGate } from './components/FeatureGate';

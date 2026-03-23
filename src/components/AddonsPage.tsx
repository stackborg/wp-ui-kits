/**
 * AddonsPage — full addon management page with tabs, search, and grid.
 *
 * Provides the main addons dashboard tab content with:
 * - Tab filtering: All | Active | Inactive
 * - Search by name
 * - Responsive grid of AddonCards
 * - Loading and empty states
 */

import React, { useState, useMemo } from 'react';
import type { AddonState } from '@/types/addon.d';
import { AddonCard } from '@/components/AddonCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

type TabFilter = 'all' | 'active' | 'inactive';

interface AddonsPageProps {
  addons: AddonState[];
  loading: boolean;
  error?: string | null;
  onActivate?: (slug: string) => Promise<void>;
  onDeactivate?: (slug: string) => Promise<void>;
  onInstall?: (slug: string) => Promise<void>;
  onUninstall?: (slug: string) => Promise<void>;
  onUpdate?: (slug: string) => Promise<void>;
  onBatchUpdate?: () => Promise<void>;
  onLicense?: (slug: string) => void;
}

const TABS: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

export function AddonsPage({
  addons,
  loading,
  error,
  onActivate,
  onDeactivate,
  onInstall,
  onUninstall,
  onUpdate,
  onBatchUpdate,
  onLicense,
}: AddonsPageProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [search, setSearch] = useState('');
  const [batchUpdating, setBatchUpdating] = useState(false);

  // Filter addons based on tab and search
  const filtered = useMemo(() => {
    let result = addons;

    // Tab filter
    if (activeTab === 'active') {
      result = result.filter((a) => a.active);
    } else if (activeTab === 'inactive') {
      result = result.filter((a) => !a.active);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.name.toLowerCase().includes(q) || a.slug.includes(q)
      );
    }

    return result;
  }, [addons, activeTab, search]);

  // Tab counts
  const counts = useMemo(
    () => ({
      all: addons.length,
      active: addons.filter((a) => a.active).length,
      inactive: addons.filter((a) => !a.active).length,
    }),
    [addons]
  );

  // Update counts
  const updatableAddons = addons.filter((a) => a.update_available);
  const autoUpdateCount = updatableAddons.filter(
    (a) => (a.update_policy ?? 'auto') !== 'manual'
  ).length;
  const manualUpdateCount = updatableAddons.length - autoUpdateCount;

  const handleBatchUpdate = async () => {
    if (!onBatchUpdate) return;
    setBatchUpdating(true);
    try {
      await onBatchUpdate();
    } finally {
      setBatchUpdating(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="addons-loading" style={{ padding: '40px', textAlign: 'center', color: 'var(--sb-color-text-muted, #9ca3af)' }}>
        Loading addons...
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="addons-error" style={{ padding: '40px', textAlign: 'center', color: 'var(--sb-color-error, #dc2626)' }}>
        {error}
      </div>
    );
  }

  return (
    <div data-testid="addons-page" className="sb-addons-page">
      {/* Header with tabs and search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        {/* Tabs */}
        <div data-testid="addons-tabs" style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--sb-color-bg-muted, #f3f4f6)', borderRadius: '8px', padding: '3px' }}>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              data-testid={`tab-${key}`}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                backgroundColor: activeTab === key ? 'var(--sb-color-bg, #fff)' : 'transparent',
                color: activeTab === key ? 'var(--sb-color-text, #111827)' : 'var(--sb-color-text-secondary, #6b7280)',
                boxShadow: activeTab === key ? 'var(--sb-shadow-sm, 0 1px 2px rgba(0,0,0,0.05))' : 'none',
                transition: 'all var(--sb-transition-fast, 0.15s)',
              }}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>

        {/* Search */}
        <Input
          data-testid="addons-search"
          placeholder="Search addons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="md"
        />
      </div>

      {/* Update summary bar */}
      {updatableAddons.length > 0 && (
        <div
          data-testid="update-summary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            fontSize: '13px',
            color: '#92400e',
          }}
        >
          <span>
            {autoUpdateCount > 0 && `${autoUpdateCount} auto-update${autoUpdateCount > 1 ? 's' : ''} pending`}
            {autoUpdateCount > 0 && manualUpdateCount > 0 && ', '}
            {manualUpdateCount > 0 && `${manualUpdateCount} need${manualUpdateCount > 1 ? '' : 's'} confirmation`}
          </span>
          {autoUpdateCount > 0 && onBatchUpdate && (
            <Button
              data-testid="batch-update-btn"
              variant="warning"
              size="sm"
              loading={batchUpdating}
              onClick={handleBatchUpdate}
            >
              Update All ({autoUpdateCount})
            </Button>
          )}
        </div>
      )}

      {/* Addon grid */}
      {filtered.length === 0 ? (
        <div data-testid="addons-empty" style={{ padding: '40px', textAlign: 'center', color: 'var(--sb-color-text-muted, #9ca3af)' }}>
          No addons found
        </div>
      ) : (
        <div
          data-testid="addons-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {filtered.map((addon) => (
            <AddonCard
              key={addon.slug}
              slug={addon.slug}
              name={addon.name}
              description={addon.description}
              version={addon.version}
              type={addon.type}
              icon={addon.icon}
              iconType={addon.icon_type}
              active={addon.active}
              installed={addon.installed}
              tier={addon.tier}
              license={addon.license}
              updateAvailable={addon.update_available}
              dependencyErrors={addon.dependency_errors}
              priceDisplay={addon.price_display}
              priceUrl={addon.price_url}
              onActivate={onActivate ? async (s) => { await onActivate(s); } : undefined}
              onDeactivate={onDeactivate ? async (s) => { await onDeactivate(s); } : undefined}
              onInstall={onInstall ? async (s) => { await onInstall(s); } : undefined}
              onUninstall={onUninstall ? async (s) => { await onUninstall(s); } : undefined}
              onUpdate={onUpdate ? async (s) => { await onUpdate(s); } : undefined}
              onLicense={onLicense}
            />
          ))}
        </div>
      )}
    </div>
  );
}

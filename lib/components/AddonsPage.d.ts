/**
 * AddonsPage — full addon management page with tabs, search, and grid.
 *
 * Provides the main addons dashboard tab content with:
 * - Tab filtering: All | Active | Inactive
 * - Search by name
 * - Responsive grid of AddonCards
 * - Loading and empty states
 */
import React from 'react';
import type { AddonState } from '../types/addon.d';
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
export declare function AddonsPage({ addons, loading, error, onActivate, onDeactivate, onInstall, onUninstall, onUpdate, onBatchUpdate, onLicense, }: AddonsPageProps): React.ReactElement;
export {};

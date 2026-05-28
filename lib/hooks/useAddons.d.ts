/**
 * useAddons — React hook for addon management.
 *
 * Provides addon listing, installation, activation, and all
 * lifecycle operations through the REST API.
 *
 * Usage:
 *   const { addons, loading, install, activate, deactivate, uninstall } = useAddons(api);
 */
import type { ApiClient } from '../api/client';
import type { AddonState, AddonActionResult } from '../types/addon.d';
interface UseAddonsResult {
    addons: AddonState[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    install: (slug: string, zipUrl: string, checksum?: string) => Promise<AddonActionResult>;
    uninstall: (slug: string) => Promise<AddonActionResult>;
    activate: (slug: string) => Promise<AddonActionResult>;
    deactivate: (slug: string) => Promise<AddonActionResult>;
    update: (slug: string, zipUrl: string, checksum?: string) => Promise<AddonActionResult>;
}
export declare function useAddons(api: ApiClient): UseAddonsResult;
export {};

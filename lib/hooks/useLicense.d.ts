/**
 * useLicense — React hook for license management.
 *
 * Provides license activation/deactivation for paid addons.
 *
 * Usage:
 *   const { activate, deactivate, activating } = useLicense(api);
 *   await activate('automation', 'SB-LICENSE-KEY');
 */
import type { ApiClient } from '../api/client';
import type { LicenseActionResult } from '../types/addon.d';
interface UseLicenseResult {
    activate: (slug: string, licenseKey: string) => Promise<LicenseActionResult>;
    deactivate: (slug: string) => Promise<LicenseActionResult>;
    activating: boolean;
    error: string | null;
}
export declare function useLicense(api: ApiClient, onSuccess?: () => void): UseLicenseResult;
export {};

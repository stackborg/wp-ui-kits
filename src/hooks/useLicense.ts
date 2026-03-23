/**
 * useLicense — React hook for license management.
 *
 * Provides license activation/deactivation for paid addons.
 *
 * Usage:
 *   const { activate, deactivate, activating } = useLicense(api);
 *   await activate('automation', 'SB-LICENSE-KEY');
 */

import { useState, useCallback } from 'react';
import type { ApiClient } from '@/api/client';
import type { LicenseActionResult } from '@/types/addon.d';

interface UseLicenseResult {
  activate: (slug: string, licenseKey: string) => Promise<LicenseActionResult>;
  deactivate: (slug: string) => Promise<LicenseActionResult>;
  activating: boolean;
  error: string | null;
}

export function useLicense(
  api: ApiClient,
  onSuccess?: () => void
): UseLicenseResult {
  const [activating, setActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activate = useCallback(
    async (slug: string, licenseKey: string): Promise<LicenseActionResult> => {
      setActivating(true);
      setError(null);
      try {
        const result = await api.post<LicenseActionResult>(`/addons/${slug}/license`, {
          license_key: licenseKey,
        });
        if (result.success) {
          onSuccess?.();
        } else {
          setError(result.message);
        }
        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'License activation failed';
        setError(message);
        return { success: false, status: 'error', message };
      } finally {
        setActivating(false);
      }
    },
    [api, onSuccess]
  );

  const deactivate = useCallback(
    async (slug: string): Promise<LicenseActionResult> => {
      try {
        const result = await api.del<LicenseActionResult>(`/addons/${slug}/license`);
        onSuccess?.();
        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'License deactivation failed';
        return { success: false, status: 'error', message };
      }
    },
    [api, onSuccess]
  );

  return { activate, deactivate, activating, error };
}

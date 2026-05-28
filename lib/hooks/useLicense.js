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
export function useLicense(api, onSuccess) {
    const [activating, setActivating] = useState(false);
    const [error, setError] = useState(null);
    const activate = useCallback(async (slug, licenseKey) => {
        setActivating(true);
        setError(null);
        try {
            const result = await api.post(`/addons/${slug}/license`, {
                license_key: licenseKey,
            });
            if (result.success) {
                onSuccess?.();
            }
            else {
                setError(result.message ?? null);
            }
            return result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'License activation failed';
            setError(message);
            return { success: false, status: 'error', message };
        }
        finally {
            setActivating(false);
        }
    }, [api, onSuccess]);
    const deactivate = useCallback(async (slug) => {
        try {
            const result = await api.del(`/addons/${slug}/license`);
            onSuccess?.();
            return result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'License deactivation failed';
            return { success: false, status: 'error', message };
        }
    }, [api, onSuccess]);
    return { activate, deactivate, activating, error };
}

/**
 * useAddons — React hook for addon management.
 *
 * Provides addon listing, installation, activation, and all
 * lifecycle operations through the REST API.
 *
 * Usage:
 *   const { addons, loading, install, activate, deactivate, uninstall } = useAddons(api);
 */

import { useState, useEffect, useCallback } from 'react';
import type { ApiClient } from '@/api/client';
import type { AddonState, AddonListResponse, AddonActionResult } from '@/types/addon.d';

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

export function useAddons(api: ApiClient): UseAddonsResult {
  const [addons, setAddons] = useState<AddonState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  // Fetch addon list
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<AddonListResponse>('/addons')
      .then((result) => {
        if (!cancelled) {
          setAddons(result.addons);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load addons');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [api, trigger]);

  // Action helpers — perform action then refetch
  const postAction = useCallback(
    async (endpoint: string, body?: Record<string, unknown>) => {
      const result = await api.post<AddonActionResult>(endpoint, body);
      refetch();
      return result;
    },
    [api, refetch]
  );

  const deleteAction = useCallback(
    async (endpoint: string) => {
      const result = await api.del<AddonActionResult>(endpoint);
      refetch();
      return result;
    },
    [api, refetch]
  );

  const install = useCallback(
    (slug: string, zipUrl: string, checksum?: string) =>
      postAction(`/addons/${slug}/install`, { zip_url: zipUrl, checksum }),
    [postAction]
  );

  const uninstall = useCallback(
    (slug: string) => deleteAction(`/addons/${slug}`),
    [deleteAction]
  );

  const activate = useCallback(
    (slug: string) => postAction(`/addons/${slug}/activate`),
    [postAction]
  );

  const deactivate = useCallback(
    (slug: string) => postAction(`/addons/${slug}/deactivate`),
    [postAction]
  );

  const update = useCallback(
    (slug: string, zipUrl: string, checksum?: string) =>
      postAction(`/addons/${slug}/update`, { zip_url: zipUrl, checksum }),
    [postAction]
  );

  return { addons, loading, error, refetch, install, uninstall, activate, deactivate, update };
}

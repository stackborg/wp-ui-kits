/**
 * useAddons — React hook for addon management.
 *
 * Provides addon listing, installation, activation, and all
 * lifecycle operations through the REST API.
 *
 * Usage:
 *   const { addons, loading, install, activate, deactivate, uninstall } = useAddons(api);
 */

import { useReducer, useEffect, useCallback } from 'react';
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

interface AddonFetchState {
  addons: AddonState[];
  loading: boolean;
  error: string | null;
  trigger: number;
}

type AddonAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; addons: AddonState[] }
  | { type: 'FETCH_ERROR'; message: string }
  | { type: 'REFETCH' };

function addonReducer(state: AddonFetchState, action: AddonAction): AddonFetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, addons: action.addons };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.message };
    case 'REFETCH':
      return { ...state, trigger: state.trigger + 1 };
  }
}

const initialState: AddonFetchState = {
  addons: [],
  loading: true,
  error: null,
  trigger: 0,
};

export function useAddons(api: ApiClient): UseAddonsResult {
  const [state, dispatch] = useReducer(addonReducer, initialState);

  const refetch = useCallback(() => dispatch({ type: 'REFETCH' }), []);

  // Fetch addon list on mount and when trigger changes
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    api
      .get<AddonListResponse>('/addons')
      .then((result) => {
        dispatch({ type: 'FETCH_SUCCESS', addons: result.addons });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERROR', message: err.message || 'Failed to load addons' });
      });
  }, [api, state.trigger]);

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

  const { addons, loading, error } = state;
  return { addons, loading, error, refetch, install, uninstall, activate, deactivate, update };
}

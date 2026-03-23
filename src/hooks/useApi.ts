/**
 * useApi — React hook for data fetching from WordPress REST API.
 *
 * Handles loading state, error state, and data refetching.
 * Works with the ApiClient from @stackborg/wp-ui-kits.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi<Stats>(api, '/stats');
 */

import { useState, useEffect, useCallback } from 'react';
import type { ApiClient, ApiError } from '@/api/client';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useApi<T>(
  api: ApiClient,
  endpoint: string,
  deps: unknown[] = []
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<T>(endpoint)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, trigger, ...deps]);

  return { data, loading, error, refetch };
}

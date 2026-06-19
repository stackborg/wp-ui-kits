import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';
import type { ApiClient } from '@/api/client';
import { ApiError } from '@/api/client';

/**
 * Create a mock ApiClient for testing.
 * Each method returns a vi.fn() so we can control resolved/rejected values.
 */
function createMockApi(overrides: Partial<ApiClient> = {}): ApiClient {
  return {
    get: vi.fn().mockResolvedValue(null),
    post: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue(null),
    del: vi.fn().mockResolvedValue(null),
    upload: vi.fn().mockResolvedValue(null),
    ...overrides,
  };
}

describe('useApi', () => {
  let mockApi: ApiClient;

  beforeEach(() => {
    mockApi = createMockApi();
  });

  it('starts in loading state with null data', () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useApi(mockApi, '/test'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches data and transitions to loaded state', async () => {
    const mockData = { users: 42, active: true };
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    const { result } = renderHook(() => useApi<typeof mockData>(mockApi, '/stats'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockApi.get).toHaveBeenCalledWith('/stats');
  });

  it('handles ApiError correctly', async () => {
    const apiError = new ApiError('Not found', 404, { detail: 'Resource missing' });
    (mockApi.get as ReturnType<typeof vi.fn>).mockRejectedValue(apiError);

    const { result } = renderHook(() => useApi(mockApi, '/missing'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error?.message).toBe('Not found');
    expect(result.current.error?.status).toBe(404);
    expect(result.current.data).toBeNull();
  });

  it('wraps non-ApiError exceptions into ApiError', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockRejectedValue(new TypeError('Network failed'));

    const { result } = renderHook(() => useApi(mockApi, '/broken'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error?.message).toBe('Request failed');
    expect(result.current.error?.status).toBe(0);
  });

  it('refetch triggers a new API call', async () => {
    let callCount = 0;
    (mockApi.get as ReturnType<typeof vi.fn>).mockImplementation(() => {
      callCount++;
      return Promise.resolve({ count: callCount });
    });

    const { result } = renderHook(() => useApi<{ count: number }>(mockApi, '/counter'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data?.count).toBe(1);

    // Trigger refetch
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data?.count).toBe(2);
    });

    expect(mockApi.get).toHaveBeenCalledTimes(2);
  });

  it('re-fetches when endpoint changes', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockImplementation((endpoint: string) =>
      Promise.resolve({ endpoint })
    );

    const { result, rerender } = renderHook(
      ({ endpoint }) => useApi<{ endpoint: string }>(mockApi, endpoint),
      { initialProps: { endpoint: '/first' } }
    );

    await waitFor(() => {
      expect(result.current.data?.endpoint).toBe('/first');
    });

    rerender({ endpoint: '/second' });

    await waitFor(() => {
      expect(result.current.data?.endpoint).toBe('/second');
    });

    expect(mockApi.get).toHaveBeenCalledWith('/first');
    expect(mockApi.get).toHaveBeenCalledWith('/second');
  });

  it('re-fetches when deps change', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: true });

    const { result, rerender } = renderHook(
      ({ deps }) => useApi(mockApi, '/data', deps),
      { initialProps: { deps: ['a'] as unknown[] } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(mockApi.get).toHaveBeenCalledTimes(1);

    rerender({ deps: ['b'] });

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledTimes(2);
    });
  });

  it('cancels in-flight request on unmount (does not set state)', async () => {
    // Use a delayed resolve to simulate in-flight request
    let resolvePromise: (value: unknown) => void;
    (mockApi.get as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise((resolve) => { resolvePromise = resolve; })
    );

    const { result, unmount } = renderHook(() => useApi(mockApi, '/slow'));

    expect(result.current.loading).toBe(true);

    // Unmount before the request completes
    unmount();

    // Resolve after unmount — should NOT cause state update errors
    resolvePromise!({ data: 'late' });

    // No assertion needed for state — the fact that no warning/error is thrown is the test
    expect(mockApi.get).toHaveBeenCalledWith('/slow');
  });
});

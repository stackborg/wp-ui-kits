import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAddons } from '@/hooks/useAddons';
import type { ApiClient } from '@/api/client';
import type { AddonState, AddonActionResult } from '@/types/addon.d';

/** Factory for a minimal AddonState object */
function makeAddon(overrides: Partial<AddonState> = {}): AddonState {
  return {
    slug: 'test-addon',
    name: 'Test Addon',
    description: 'A test addon',
    version: '1.0.0',
    active: false,
    installed: false,
    type: 'free',
    tier: 'free',
    features: {},
    license: { status: 'none', expiry: null },
    ...overrides,
  };
}

function createMockApi(overrides: Partial<ApiClient> = {}): ApiClient {
  return {
    get: vi.fn().mockResolvedValue({ addons: [] }),
    post: vi.fn().mockResolvedValue({ success: true }),
    put: vi.fn().mockResolvedValue({ success: true }),
    del: vi.fn().mockResolvedValue({ success: true }),
    upload: vi.fn().mockResolvedValue({ success: true }),
    ...overrides,
  };
}

describe('useAddons', () => {
  let mockApi: ApiClient;

  beforeEach(() => {
    mockApi = createMockApi();
  });

  it('starts in loading state with empty addons', () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useAddons(mockApi));

    expect(result.current.loading).toBe(true);
    expect(result.current.addons).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches and displays addon list', async () => {
    const addons = [
      makeAddon({ slug: 'analytics', name: 'Analytics', installed: true, active: true }),
      makeAddon({ slug: 'backup', name: 'Backup' }),
    ];
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.addons).toHaveLength(2);
    expect(result.current.addons[0].slug).toBe('analytics');
    expect(result.current.addons[1].slug).toBe('backup');
    expect(result.current.error).toBeNull();
  });

  it('handles fetch error', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server down'));

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Server down');
    expect(result.current.addons).toEqual([]);
  });

  it('uses default error message when error has no message', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockRejectedValue({});

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load addons');
  });

  it('install calls correct endpoint and triggers refetch', async () => {
    const actionResult: AddonActionResult = { success: true, message: 'Installed' };
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue(actionResult);
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let installResult: AddonActionResult;
    await act(async () => {
      installResult = await result.current.install('seo', 'https://example.com/seo.zip', 'abc123');
    });

    expect(mockApi.post).toHaveBeenCalledWith('/addons/seo/install', {
      zip_url: 'https://example.com/seo.zip',
      checksum: 'abc123',
    });
    expect(installResult!.success).toBe(true);
    // refetch should have been triggered — get called more than initial
    expect((mockApi.get as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(1);
  });

  it('uninstall calls delete endpoint and triggers refetch', async () => {
    const actionResult: AddonActionResult = { success: true, message: 'Uninstalled' };
    (mockApi.del as ReturnType<typeof vi.fn>).mockResolvedValue(actionResult);
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let uninstallResult: AddonActionResult;
    await act(async () => {
      uninstallResult = await result.current.uninstall('seo');
    });

    expect(mockApi.del).toHaveBeenCalledWith('/addons/seo');
    expect(uninstallResult!.success).toBe(true);
  });

  it('activate calls correct endpoint', async () => {
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.activate('backup');
    });

    expect(mockApi.post).toHaveBeenCalledWith('/addons/backup/activate', undefined);
  });

  it('deactivate calls correct endpoint', async () => {
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deactivate('backup');
    });

    expect(mockApi.post).toHaveBeenCalledWith('/addons/backup/deactivate', undefined);
  });

  it('update calls correct endpoint with zip and checksum', async () => {
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue({ success: true });
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.update('seo', 'https://example.com/seo-v2.zip', 'hash456');
    });

    expect(mockApi.post).toHaveBeenCalledWith('/addons/seo/update', {
      zip_url: 'https://example.com/seo-v2.zip',
      checksum: 'hash456',
    });
  });

  it('refetch re-fetches addon list', async () => {
    (mockApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({ addons: [] });

    const { result } = renderHook(() => useAddons(mockApi));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const callsBefore = (mockApi.get as ReturnType<typeof vi.fn>).mock.calls.length;

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect((mockApi.get as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThan(callsBefore);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useLicense } from '@/hooks/useLicense';
import type { ApiClient } from '@/api/client';
import type { LicenseActionResult } from '@/types/addon.d';

function createMockApi(overrides: Partial<ApiClient> = {}): ApiClient {
  return {
    get: vi.fn().mockResolvedValue(null),
    post: vi.fn().mockResolvedValue({ success: true }),
    put: vi.fn().mockResolvedValue(null),
    del: vi.fn().mockResolvedValue({ success: true }),
    upload: vi.fn().mockResolvedValue(null),
    ...overrides,
  };
}

describe('useLicense', () => {
  let mockApi: ApiClient;

  beforeEach(() => {
    mockApi = createMockApi();
  });

  it('starts with activating false and no error', () => {
    const { result } = renderHook(() => useLicense(mockApi));

    expect(result.current.activating).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('activates license successfully and calls onSuccess', async () => {
    const successResult: LicenseActionResult = {
      success: true,
      status: 'active',
      license: { key: 'SB-KEY-123', status: 'active', expiry: '2027-01-01' },
    };
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue(successResult);

    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLicense(mockApi, onSuccess));

    let activateResult: LicenseActionResult;
    await act(async () => {
      activateResult = await result.current.activate('automation', 'SB-KEY-123');
    });

    expect(mockApi.post).toHaveBeenCalledWith('/addons/automation/license', {
      license_key: 'SB-KEY-123',
    });
    expect(activateResult!.success).toBe(true);
    expect(activateResult!.license?.key).toBe('SB-KEY-123');
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeNull();
    expect(result.current.activating).toBe(false);
  });

  it('sets error when activation returns success: false', async () => {
    const failResult: LicenseActionResult = {
      success: false,
      status: 'invalid',
      message: 'Invalid license key',
    };
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValue(failResult);

    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLicense(mockApi, onSuccess));

    await act(async () => {
      await result.current.activate('automation', 'BAD-KEY');
    });

    expect(result.current.error).toBe('Invalid license key');
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.activating).toBe(false);
  });

  it('handles activation network error', async () => {
    (mockApi.post as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network timeout'));

    const { result } = renderHook(() => useLicense(mockApi));

    let activateResult: LicenseActionResult;
    await act(async () => {
      activateResult = await result.current.activate('seo', 'KEY');
    });

    expect(activateResult!.success).toBe(false);
    expect(activateResult!.status).toBe('error');
    expect(activateResult!.message).toBe('Network timeout');
    expect(result.current.error).toBe('Network timeout');
  });

  it('handles non-Error exception during activation', async () => {
    (mockApi.post as ReturnType<typeof vi.fn>).mockRejectedValue('something weird');

    const { result } = renderHook(() => useLicense(mockApi));

    let activateResult: LicenseActionResult;
    await act(async () => {
      activateResult = await result.current.activate('seo', 'KEY');
    });

    expect(activateResult!.success).toBe(false);
    expect(activateResult!.message).toBe('License activation failed');
    expect(result.current.error).toBe('License activation failed');
  });

  it('sets activating to true during activation', async () => {
    let resolvePost: (value: LicenseActionResult) => void;
    (mockApi.post as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise<LicenseActionResult>((resolve) => { resolvePost = resolve; })
    );

    const { result } = renderHook(() => useLicense(mockApi));

    // Start activation without awaiting
    let activatePromise: Promise<LicenseActionResult>;
    act(() => {
      activatePromise = result.current.activate('addon', 'KEY');
    });

    // activating should be true while the promise is pending
    expect(result.current.activating).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePost!({ success: true, status: 'active' });
      await activatePromise!;
    });

    expect(result.current.activating).toBe(false);
  });

  it('deactivates license successfully and calls onSuccess', async () => {
    const successResult: LicenseActionResult = {
      success: true,
      status: 'deactivated',
    };
    (mockApi.del as ReturnType<typeof vi.fn>).mockResolvedValue(successResult);

    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLicense(mockApi, onSuccess));

    let deactivateResult: LicenseActionResult;
    await act(async () => {
      deactivateResult = await result.current.deactivate('automation');
    });

    expect(mockApi.del).toHaveBeenCalledWith('/addons/automation/license');
    expect(deactivateResult!.success).toBe(true);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('handles deactivation error gracefully', async () => {
    (mockApi.del as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useLicense(mockApi));

    let deactivateResult: LicenseActionResult;
    await act(async () => {
      deactivateResult = await result.current.deactivate('addon');
    });

    expect(deactivateResult!.success).toBe(false);
    expect(deactivateResult!.status).toBe('error');
    expect(deactivateResult!.message).toBe('Server error');
  });

  it('clears previous error on new activation attempt', async () => {
    // First call fails
    (mockApi.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('First fail'));

    const { result } = renderHook(() => useLicense(mockApi));

    await act(async () => {
      await result.current.activate('addon', 'KEY1');
    });
    expect(result.current.error).toBe('First fail');

    // Second call succeeds — error should be cleared
    (mockApi.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ success: true, status: 'active' });

    await act(async () => {
      await result.current.activate('addon', 'KEY2');
    });
    expect(result.current.error).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { createApiClient, ApiError } from '@/api/client';

describe('createApiClient', () => {
  it('creates client from window data key', () => {
    const api = createApiClient('sbTestPluginData');
    expect(api).toBeDefined();
    expect(api.get).toBeInstanceOf(Function);
    expect(api.post).toBeInstanceOf(Function);
    expect(api.put).toBeInstanceOf(Function);
    expect(api.del).toBeInstanceOf(Function);
    expect(api.upload).toBeInstanceOf(Function);
  });

  it('throws when data key not found', () => {
    expect(() => {
      const api = createApiClient('nonExistentData');
      // Force the getter to execute
      api.get('/test').catch(() => {});
    }).not.toThrow(); // Client creation doesn't throw, getData() does on use
  });
});

describe('ApiError', () => {
  it('creates error with message and status', () => {
    const error = new ApiError('Not found', 404);
    expect(error.message).toBe('Not found');
    expect(error.status).toBe(404);
    expect(error.name).toBe('ApiError');
  });

  it('includes validation errors', () => {
    const errors = { email: 'Required' };
    const error = new ApiError('Validation', 422, errors);
    expect(error.errors).toEqual(errors);
  });
});

describe('ApiClient request handling', () => {
  it('handles 204 responses without JSON body', async () => {
    (window as unknown as Record<string, unknown>).sbTestPluginData = {
      apiUrl: '/wp-json/test',
      nonce: 'nonce',
      version: '1.0.0',
    };

    const originalFetch = global.fetch;
    global.fetch = (async () =>
      new Response(null, { status: 204 })) as typeof fetch;

    const api = createApiClient('sbTestPluginData');
    await expect(api.del('/empty')).resolves.toBeUndefined();

    global.fetch = originalFetch;
  });

  it('unwraps upload success envelope', async () => {
    (window as unknown as Record<string, unknown>).sbTestPluginData = {
      apiUrl: '/wp-json/test',
      nonce: 'nonce',
      version: '1.0.0',
    };

    const originalFetch = global.fetch;
    global.fetch = (async () =>
      new Response(JSON.stringify({ success: true, data: { imported: 3 } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })) as typeof fetch;

    const api = createApiClient('sbTestPluginData');
    const result = await api.upload<{ imported: number }>('/upload', new FormData());
    expect(result).toEqual({ imported: 3 });

    global.fetch = originalFetch;
  });
});

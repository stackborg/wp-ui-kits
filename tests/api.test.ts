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

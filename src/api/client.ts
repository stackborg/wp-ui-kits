/**
 * WordPress Dashboard API Client.
 *
 * Creates a typed, reusable REST API client that handles nonce
 * authentication, error formatting, and response parsing.
 *
 * Usage:
 *   const api = createApiClient('sbMailPressData');
 *   const settings = await api.get<Settings>('/settings');
 *   await api.post('/settings', { key: 'value' });
 */

/** Shape of the WordPress-injected data on window */
export interface WordPressData {
  apiUrl: string;
  nonce: string;
  version: string;
  adminUrl?: string;
  siteTitle?: string;
  siteUrl?: string;
  [key: string]: unknown;
}

/** Standard API error */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** API client instance */
export interface ApiClient {
  get: <T = unknown>(endpoint: string) => Promise<T>;
  post: <T = unknown>(endpoint: string, data?: unknown) => Promise<T>;
  put: <T = unknown>(endpoint: string, data?: unknown) => Promise<T>;
  del: <T = unknown>(endpoint: string) => Promise<T>;
  upload: <T = unknown>(endpoint: string, formData: FormData) => Promise<T>;
}

/**
 * Create an API client from the WordPress-injected data key.
 *
 * @param dataKey - The key on window (e.g. 'sbMailPressData')
 * @returns Typed API client
 */
export function createApiClient(dataKey: string): ApiClient {
  const getData = (): WordPressData => {
    const data = (window as unknown as Record<string, unknown>)[dataKey] as WordPressData | undefined;
    if (!data) {
      throw new Error(`WordPress data not found: window.${dataKey}`);
    }
    return data;
  };

  async function request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const { apiUrl, nonce } = getData();
    const url = `${apiUrl}${endpoint}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new ApiError(
        error.message || 'Request failed',
        res.status,
        error.errors
      );
    }

    return res.json();
  }

  return {
    get: <T>(endpoint: string) =>
      request<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown) =>
      request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),

    put: <T>(endpoint: string, data?: unknown) =>
      request<T>(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }),

    del: <T>(endpoint: string) =>
      request<T>(endpoint, { method: 'DELETE' }),

    upload: async <T>(endpoint: string, formData: FormData) => {
      const { apiUrl, nonce } = getData();
      const url = `${apiUrl}${endpoint}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'X-WP-Nonce': nonce },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new ApiError(error.message || 'Upload failed', res.status);
      }

      return res.json() as Promise<T>;
    },
  };
}

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
export declare class ApiError extends Error {
    status: number;
    errors?: unknown | undefined;
    constructor(message: string, status: number, errors?: unknown | undefined);
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
export declare function createApiClient(dataKey: string): ApiClient;

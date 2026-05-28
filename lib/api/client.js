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
/** Standard API error */
export class ApiError extends Error {
    constructor(message, status, errors) {
        super(message);
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: status
        });
        Object.defineProperty(this, "errors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: errors
        });
        this.name = 'ApiError';
    }
}
function isWrappedSuccess(value) {
    return Boolean(value &&
        typeof value === 'object' &&
        'success' in value &&
        'data' in value);
}
/**
 * Create an API client from the WordPress-injected data key.
 *
 * @param dataKey - The key on window (e.g. 'sbMailPressData')
 * @returns Typed API client
 */
export function createApiClient(dataKey) {
    const getData = () => {
        const data = window[dataKey];
        if (!data) {
            throw new Error(`WordPress data not found: window.${dataKey}`);
        }
        return data;
    };
    async function request(endpoint, options = {}) {
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
            throw new ApiError(error.message || 'Request failed', res.status, error.errors);
        }
        if (res.status === 204) {
            return undefined;
        }
        const text = await res.text();
        if (text.trim() === '') {
            return undefined;
        }
        const json = JSON.parse(text);
        // Auto-unwrap Response::success() wrapper { success: true, data: {...} }
        // so consumers get the inner payload directly
        if (isWrappedSuccess(json)) {
            return json.data;
        }
        return json;
    }
    return {
        get: (endpoint) => request(endpoint, { method: 'GET' }),
        post: (endpoint, data) => request(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),
        put: (endpoint, data) => request(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),
        del: (endpoint) => request(endpoint, { method: 'DELETE' }),
        upload: async (endpoint, formData) => {
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
            if (res.status === 204) {
                return undefined;
            }
            const text = await res.text();
            if (text.trim() === '') {
                return undefined;
            }
            const json = JSON.parse(text);
            if (isWrappedSuccess(json)) {
                return json.data;
            }
            return json;
        },
    };
}

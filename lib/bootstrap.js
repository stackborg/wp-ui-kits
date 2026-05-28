import { jsx as _jsx } from "react/jsx-runtime";
/**
 * createDashboard — mount helper for WordPress plugin dashboards.
 *
 * Replaces the ~15 lines of boilerplate each plugin has in main.tsx
 * with a single function call.
 *
 * Usage:
 *   import { createDashboard } from '@stackborg/wp-ui-kits';
 *   import App from './App';
 *   createDashboard('sb-mailpress-root', App);
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * Mount a React dashboard into a WordPress admin container.
 *
 * @param rootId - The DOM element ID to mount into
 * @param App - The root React component
 * @param options - Optional configuration
 */
export function createDashboard(rootId, App, options = {}) {
    const container = document.getElementById(rootId);
    if (!container) {
        console.error(`[wp-ui-kits] Root element #${rootId} not found`);
        return;
    }
    // Clear WordPress placeholder content
    container.innerHTML = '';
    const app = options.disableStrictMode ? (_jsx(App, {})) : (_jsx(React.StrictMode, { children: _jsx(App, {}) }));
    ReactDOM.createRoot(container).render(app);
}

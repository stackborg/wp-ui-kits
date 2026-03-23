import '@testing-library/jest-dom';

// Mock window.sb*Data for WordPress API tests
Object.defineProperty(window, 'sbTestPluginData', {
  value: {
    apiUrl: 'https://test.local/wp-json/test/v1',
    nonce: 'test_nonce_123',
    version: '1.0.0',
    adminUrl: 'https://test.local/wp-admin/',
    siteTitle: 'Test Site',
  },
  writable: true,
});

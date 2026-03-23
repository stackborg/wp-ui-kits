import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import { useWordPressData } from '@/hooks/useWordPressData';

/**
 * Real-world useWordPressData edge cases.
 *
 * Tests: missing fields in WP data, partial data,
 * type safety when data shape doesn't match expected.
 */
describe('useWordPressData — Edge Cases', () => {
  beforeEach(() => {
    // Set up various data shapes on window
    (window as any).sbCompleteData = {
      apiUrl: 'https://example.com/wp-json/v1',
      nonce: 'abc123',
      version: '2.1.0',
      adminUrl: 'https://example.com/wp-admin/',
      siteTitle: 'My Site',
    };
    (window as any).sbPartialData = {
      apiUrl: 'https://example.com/wp-json/v1',
      nonce: 'xyz',
    };
    (window as any).sbEmptyData = {};
  });

  it('returns all fields from complete data', () => {
    const { result } = renderHook(() => useWordPressData('sbCompleteData'));
    expect(result.current.apiUrl).toBe('https://example.com/wp-json/v1');
    expect(result.current.nonce).toBe('abc123');
    expect(result.current.version).toBe('2.1.0');
    expect(result.current.adminUrl).toBe('https://example.com/wp-admin/');
  });

  it('handles partial data without crashing', () => {
    const { result } = renderHook(() => useWordPressData('sbPartialData'));
    expect(result.current.apiUrl).toBe('https://example.com/wp-json/v1');
    expect(result.current.nonce).toBe('xyz');
    // Optional fields should be undefined but not crash
    expect(result.current.version).toBeUndefined();
  });

  it('handles empty object data', () => {
    const { result } = renderHook(() => useWordPressData('sbEmptyData'));
    // Should not crash — returns empty-ish object
    expect(result.current).toBeDefined();
    expect(result.current.apiUrl).toBeUndefined();
  });

  it('throws for completely missing key', () => {
    expect(() => {
      renderHook(() => useWordPressData('sbTotallyMissing'));
    }).toThrow();
  });

  it('data is stable across rerenders (memoized)', () => {
    const { result, rerender } = renderHook(() => useWordPressData('sbCompleteData'));
    const first = result.current;
    rerender();
    const second = result.current;
    expect(first).toBe(second); // same reference = memoized
  });
});

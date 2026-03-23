import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from '@/hooks/useToast';
import { useWordPressData } from '@/hooks/useWordPressData';

describe('useToast', () => {
  it('starts with no toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.addToast({ type: 'success', message: 'Saved!', duration: 0 });
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Saved!');
    expect(result.current.toasts[0].type).toBe('success');
  });

  it('removes a toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.addToast({ type: 'info', message: 'Test', duration: 0 });
    });
    const id = result.current.toasts[0].id;
    act(() => {
      result.current.removeToast(id);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('clears all toasts', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.addToast({ type: 'success', message: 'One', duration: 0 });
      result.current.addToast({ type: 'error', message: 'Two', duration: 0 });
    });
    act(() => {
      result.current.clearToasts();
    });
    expect(result.current.toasts).toHaveLength(0);
  });
});

describe('useWordPressData', () => {
  it('returns WordPress data from window', () => {
    const { result } = renderHook(() => useWordPressData('sbTestPluginData'));
    expect(result.current.apiUrl).toBe('https://test.local/wp-json/test/v1');
    expect(result.current.nonce).toBe('test_nonce_123');
  });

  it('throws when key not found', () => {
    expect(() => {
      renderHook(() => useWordPressData('nonExistentKey'));
    }).toThrow('WordPress data not found');
  });
});

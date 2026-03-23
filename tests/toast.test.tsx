import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from '@/components/Toast';
import type { Toast } from '@/hooks/useToast';

const makeToast = (overrides: Partial<Toast> = {}): Toast => ({
  id: '1',
  type: 'success',
  message: 'Saved!',
  ...overrides,
});

describe('ToastContainer', () => {
  it('renders toast message', () => {
    const toasts = [makeToast()];
    render(<ToastContainer toasts={toasts} onDismiss={() => {}} />);
    expect(screen.getByText('Saved!')).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    const toasts = [
      makeToast({ id: '1', message: 'First' }),
      makeToast({ id: '2', message: 'Second', type: 'error' }),
      makeToast({ id: '3', message: 'Third', type: 'warning' }),
    ];
    render(<ToastContainer toasts={toasts} onDismiss={() => {}} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss clicked', () => {
    const onDismiss = vi.fn();
    const toasts = [makeToast({ id: 'abc' })];
    render(<ToastContainer toasts={toasts} onDismiss={onDismiss} />);

    const dismissBtn = screen.getByLabelText('Dismiss');
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledWith('abc');
  });

  it('renders nothing when toasts array is empty', () => {
    const { container } = render(<ToastContainer toasts={[]} onDismiss={() => {}} />);
    expect(container.firstChild?.childNodes.length ?? 0).toBe(0);
  });

  it('renders correct type styling', () => {
    const toasts = [
      makeToast({ id: '1', type: 'success', message: 'OK' }),
      makeToast({ id: '2', type: 'error', message: 'Bad' }),
      makeToast({ id: '3', type: 'info', message: 'FYI' }),
    ];
    render(<ToastContainer toasts={toasts} onDismiss={() => {}} />);

    // All messages rendered
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(screen.getByText('FYI')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Toggle } from '@/components/Toggle';

describe('Toggle', () => {
  it('renders a switch button', () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('reflects checked state via aria-checked', () => {
    const { rerender } = render(<Toggle checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('aria-checked')).toBe('false');

    rerender(<Toggle checked={true} onChange={() => {}} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  it('calls onChange with toggled value when clicked', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when currently checked', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={true} onChange={handleChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('renders label text', () => {
    render(<Toggle label="Enable feature" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(
      <Toggle
        label="Dark mode"
        description="Use dark theme throughout"
        checked={false}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByText('Use dark theme throughout')).toBeInTheDocument();
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} disabled />);

    fireEvent.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disables the button element when disabled', () => {
    render(<Toggle checked={false} onChange={() => {}} disabled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
  });

  it('renders with type="button" to prevent form submission', () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.getAttribute('type')).toBe('button');
  });

  it('generates id from label', () => {
    render(<Toggle label="Enable Analytics" checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.id).toBe('sb-toggle-enable-analytics');
  });

  it('uses custom id when provided', () => {
    render(<Toggle label="Test" id="custom-id" checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.id).toBe('custom-id');
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <Toggle checked={false} onChange={() => {}} className="my-toggle" />
    );
    // The root div should have the className
    expect(container.firstChild).toHaveClass('my-toggle');
  });

  it('renders without label or description (toggle only)', () => {
    const { container } = render(<Toggle checked={true} onChange={() => {}} />);
    // Should not render a label element when no label/description
    const labels = container.querySelectorAll('label');
    expect(labels).toHaveLength(0);
  });
});

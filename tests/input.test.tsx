import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Input } from '@/components/Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    // Label should be associated with the input via htmlFor
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
  });

  it('renders required asterisk when required', () => {
    const { container } = render(<Input label="Name" required />);
    const asterisk = container.querySelector('.sb-input__required');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk?.textContent).toBe('*');
  });

  it('renders hint text', () => {
    render(<Input hint="Found in your dashboard" />);
    expect(screen.getByText('Found in your dashboard')).toBeInTheDocument();
  });

  it('renders error message and applies error class', () => {
    const { container } = render(<Input label="Key" error="Invalid key format" />);
    expect(screen.getByText('Invalid key format')).toBeInTheDocument();

    const input = container.querySelector('input');
    expect(input?.className).toContain('sb-input--error');
  });

  it('shows error instead of hint when both are provided', () => {
    render(<Input hint="Some help" error="Field is required" />);
    expect(screen.getByText('Field is required')).toBeInTheDocument();
    expect(screen.queryByText('Some help')).not.toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders with different input types', () => {
    const { container } = render(<Input type="password" placeholder="Password" />);
    const input = container.querySelector('input');
    expect(input?.type).toBe('password');
  });

  it('renders as disabled', () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container, unmount } = render(<Input size={size} />);
      const input = container.querySelector('input');
      expect(input?.className).toContain(`sb-input--${size}`);
      unmount();
    }
  });

  it('applies fullWidth class', () => {
    const { container } = render(<Input fullWidth />);
    const wrap = container.querySelector('.sb-input-wrap');
    expect(wrap?.className).toContain('sb-input-wrap--full');
  });

  it('renders leading icon', () => {
    const { container } = render(<Input icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(container.querySelector('.sb-input__icon')).toBeInTheDocument();
  });

  it('renders trailing element', () => {
    const { container } = render(<Input trailing={<span data-testid="trail">👁️</span>} />);
    expect(screen.getByTestId('trail')).toBeInTheDocument();
    expect(container.querySelector('.sb-input__trailing')).toBeInTheDocument();
  });

  it('generates an id from label for label-input association', () => {
    const { container } = render(<Input label="API Key" />);
    const input = container.querySelector('input');
    const label = screen.getByText('API Key');
    expect(input?.id).toBe('sb-input-api-key');
    expect(label.getAttribute('for')).toBe('sb-input-api-key');
  });
});

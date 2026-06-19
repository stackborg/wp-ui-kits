import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('applies primary variant class by default', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('sb-btn--primary');
    expect(btn.className).toContain('sb-btn--md');
  });

  it('applies each variant class correctly', () => {
    const variants = ['primary', 'secondary', 'danger', 'warning', 'ghost', 'outline', 'link'] as const;

    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      const btn = screen.getByText(variant);
      expect(btn.className).toContain(`sb-btn--${variant}`);
      unmount();
    }
  });

  it('applies each size class correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      const btn = screen.getByText(size);
      expect(btn.className).toContain(`sb-btn--${size}`);
      unmount();
    }
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows spinner element when loading', () => {
    const { container } = render(<Button loading>Loading...</Button>);
    const spinner = container.querySelector('.sb-btn__spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('disables the button when loading is true', () => {
    render(<Button loading>Saving...</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Nope</Button>);

    fireEvent.click(screen.getByText('Nope'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Wait</Button>);

    fireEvent.click(screen.getByText('Wait'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies icon mode class', () => {
    render(<Button icon>🗑️</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('sb-btn--icon');
  });

  it('applies fullWidth class', () => {
    render(<Button fullWidth>Full</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('sb-btn--full');
  });

  it('appends custom className', () => {
    render(<Button className="custom-extra">Styled</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('custom-extra');
    expect(btn.className).toContain('sb-btn');
  });

  it('renders as a standard button element', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
  });

  it('applies whiteSpace nowrap style', () => {
    render(<Button>No wrap</Button>);
    const btn = screen.getByRole('button');
    expect(btn.style.whiteSpace).toBe('nowrap');
  });
});

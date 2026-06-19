import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Select } from '@/components/Select';

const defaultOptions = [
  { value: 's3', label: 'Amazon S3' },
  { value: 'gcs', label: 'Google Cloud Storage' },
  { value: 'azure', label: 'Azure Blob' },
];

describe('Select', () => {
  it('renders all options', () => {
    render(<Select options={defaultOptions} onChange={() => {}} />);

    expect(screen.getByText('Amazon S3')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud Storage')).toBeInTheDocument();
    expect(screen.getByText('Azure Blob')).toBeInTheDocument();
  });

  it('renders with selected value', () => {
    const { container } = render(
      <Select options={defaultOptions} value="gcs" onChange={() => {}} />
    );
    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select.value).toBe('gcs');
  });

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Select options={defaultOptions} value="s3" onChange={handleChange} />
    );

    const select = container.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'azure' } });
    expect(handleChange).toHaveBeenCalledWith('azure');
  });

  it('renders label', () => {
    render(<Select label="Provider" options={defaultOptions} onChange={() => {}} />);
    expect(screen.getByText('Provider')).toBeInTheDocument();
    const label = screen.getByText('Provider');
    expect(label.tagName).toBe('LABEL');
  });

  it('renders required asterisk', () => {
    const { container } = render(
      <Select label="Provider" options={defaultOptions} onChange={() => {}} required />
    );
    const asterisk = container.querySelector('.sb-select__required');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk?.textContent).toBe('*');
  });

  it('renders placeholder option', () => {
    render(
      <Select options={defaultOptions} onChange={() => {}} placeholder="Choose a provider" />
    );
    expect(screen.getByText('Choose a provider')).toBeInTheDocument();
  });

  it('renders hint text', () => {
    render(
      <Select options={defaultOptions} onChange={() => {}} hint="Select your storage provider" />
    );
    expect(screen.getByText('Select your storage provider')).toBeInTheDocument();
  });

  it('renders error and applies error class', () => {
    const { container } = render(
      <Select options={defaultOptions} onChange={() => {}} error="Provider is required" />
    );
    expect(screen.getByText('Provider is required')).toBeInTheDocument();

    const select = container.querySelector('select');
    expect(select?.className).toContain('sb-select--error');
  });

  it('shows error instead of hint when both provided', () => {
    render(
      <Select options={defaultOptions} onChange={() => {}} hint="Help" error="Error!" />
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('disables the select when disabled prop is true', () => {
    const { container } = render(
      <Select options={defaultOptions} onChange={() => {}} disabled />
    );
    const select = container.querySelector('select');
    expect(select).toBeDisabled();
  });

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container, unmount } = render(
        <Select options={defaultOptions} onChange={() => {}} size={size} />
      );
      const select = container.querySelector('select');
      expect(select?.className).toContain(`sb-select--${size}`);
      unmount();
    }
  });

  it('applies fullWidth class', () => {
    const { container } = render(
      <Select options={defaultOptions} onChange={() => {}} fullWidth />
    );
    const wrap = container.querySelector('.sb-select-wrap');
    expect(wrap?.className).toContain('sb-select-wrap--full');
  });

  it('generates id from label for label-select association', () => {
    const { container } = render(
      <Select label="Cloud Provider" options={defaultOptions} onChange={() => {}} />
    );
    const select = container.querySelector('select');
    const label = screen.getByText('Cloud Provider');
    expect(select?.id).toBe('sb-select-cloud-provider');
    expect(label.getAttribute('for')).toBe('sb-select-cloud-provider');
  });

  it('renders disabled options', () => {
    const optionsWithDisabled = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true },
    ];
    render(<Select options={optionsWithDisabled} onChange={() => {}} />);

    const optB = screen.getByText('Option B') as HTMLOptionElement;
    expect(optB.disabled).toBe(true);
  });
});

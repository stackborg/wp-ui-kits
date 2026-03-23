import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import type { NavItem } from '@/components/DashboardShell';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'Settings', path: '/settings' },
  { label: 'Users', path: '/users', icon: <span data-testid="user-icon">👤</span> },
];

function renderShell(props = {}) {
  return render(
    <MemoryRouter>
      <DashboardShell pluginName="TestPlugin" navItems={navItems} {...props}>
        <div data-testid="child-content">Page Content</div>
      </DashboardShell>
    </MemoryRouter>
  );
}

describe('DashboardShell', () => {
  it('renders plugin name', () => {
    renderShell();
    expect(screen.getByText('TestPlugin')).toBeInTheDocument();
  });

  it('renders all nav items', () => {
    renderShell();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders nav item icons', () => {
    renderShell();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderShell();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders version when provided', () => {
    renderShell({ version: '2.1.0' });
    expect(screen.getByText('v2.1.0')).toBeInTheDocument();
  });

  it('toggles sidebar collapse', () => {
    renderShell();
    const toggle = screen.getByLabelText('Collapse sidebar');
    fireEvent.click(toggle);

    // After collapse, plugin name should be hidden
    expect(screen.queryByText('TestPlugin')).not.toBeInTheDocument();
    // Toggle label changes
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
  });

  it('shows plugin name after expanding sidebar', () => {
    renderShell();
    const collapse = screen.getByLabelText('Collapse sidebar');
    fireEvent.click(collapse);
    const expand = screen.getByLabelText('Expand sidebar');
    fireEvent.click(expand);

    expect(screen.getByText('TestPlugin')).toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    renderShell({ logo: <span data-testid="logo">🔧</span> });
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});

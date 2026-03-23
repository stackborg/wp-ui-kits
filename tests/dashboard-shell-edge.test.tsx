import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import type { NavItem } from '@/components/DashboardShell';

/**
 * Real-world DashboardShell edge cases.
 *
 * Tests: empty nav, no version, long plugin names,
 * many nav items, rapid toggle, no children.
 */
describe('DashboardShell — Edge Cases', () => {
  function renderShell(props: Partial<Parameters<typeof DashboardShell>[0]> = {}) {
    const defaults = {
      pluginName: 'TestPlugin',
      navItems: [{ label: 'Home', path: '/' }],
    };
    return render(
      <MemoryRouter>
        <DashboardShell {...defaults} {...props} />
      </MemoryRouter>
    );
  }

  it('renders without children (should show Outlet)', () => {
    renderShell();
    // Should not crash when no children provided
    expect(screen.getByText('TestPlugin')).toBeInTheDocument();
  });

  it('handles empty nav items gracefully', () => {
    renderShell({ navItems: [] });
    expect(screen.getByText('TestPlugin')).toBeInTheDocument();
  });

  it('handles very long plugin name', () => {
    const longName = 'Super Duper Long Plugin Name That Should Be Truncated';
    renderShell({ pluginName: longName });
    expect(screen.getByText(longName)).toBeInTheDocument();
  });

  it('handles many nav items without overflow crash', () => {
    const manyItems: NavItem[] = Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i}`,
      path: `/item-${i}`,
    }));
    renderShell({ navItems: manyItems });
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 19')).toBeInTheDocument();
  });

  it('rapid toggle does not crash', () => {
    renderShell();
    const toggle = screen.getByLabelText('Collapse sidebar');
    // Rapidly toggle 10 times
    for (let i = 0; i < 10; i++) {
      fireEvent.click(toggle.closest('button') || screen.getByRole('button'));
    }
    // Should not crash — just verify component still renders
    expect(document.querySelector('.sb-shell')).toBeInTheDocument();
  });

  it('hides version in collapsed state', () => {
    renderShell({ version: '1.0.0' });
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    expect(screen.queryByText('v1.0.0')).not.toBeInTheDocument();
  });

  it('nav items have correct href paths', () => {
    const items: NavItem[] = [
      { label: 'Dashboard', path: '/' },
      { label: 'Settings', path: '/settings' },
    ];
    renderShell({ navItems: items });
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/settings');
  });
});

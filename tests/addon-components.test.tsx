/**
 * AddonsPage + AddonCard + FeatureGate component tests.
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddonsPage } from '@/components/AddonsPage';
import { AddonCard } from '@/components/AddonCard';
import { FeatureGate } from '@/components/FeatureGate';
import type { AddonState } from '@/types/addon.d';

// ── Test data ───────────────────────────────────────

const freeAddon: AddonState = {
  slug: 'templates',
  name: 'Email Templates',
  version: '1.0.0',
  type: 'free',
  description: 'Beautiful email templates',
  active: true,
  installed: true,
  tier: 'free',
  features: { basic: { tier: 'free', accessible: true } },
  license: { status: 'none', expiry: null },
};

const paidAddon: AddonState = {
  slug: 'automation',
  name: 'Automation',
  version: '2.0.0',
  type: 'paid',
  description: 'Advanced email automation',
  active: true,
  installed: true,
  tier: 'pro',
  features: {
    sequences: { tier: 'free', accessible: true },
    conditional: { tier: 'pro', accessible: true },
  },
  license: { status: 'active', expiry: '2027-03-23' },
};

const inactiveAddon: AddonState = {
  slug: 'analytics',
  name: 'Analytics',
  version: '1.0.0',
  type: 'freemium',
  description: 'Email analytics dashboard',
  active: false,
  installed: true,
  tier: 'none',
  features: { reports: { tier: 'free', accessible: false } },
  license: { status: 'none', expiry: null },
};

const allAddons = [freeAddon, paidAddon, inactiveAddon];

// ── AddonsPage Tests ────────────────────────────────

describe('AddonsPage', () => {
  it('renders loading state', () => {
    render(<AddonsPage addons={[]} loading={true} />);
    expect(screen.getByTestId('addons-loading')).toBeTruthy();
  });

  it('renders error state', () => {
    render(<AddonsPage addons={[]} loading={false} error="Network error" />);
    expect(screen.getByTestId('addons-error')).toBeTruthy();
    expect(screen.getByText('Network error')).toBeTruthy();
  });

  it('renders empty state when no addons', () => {
    render(<AddonsPage addons={[]} loading={false} />);
    expect(screen.getByTestId('addons-empty')).toBeTruthy();
  });

  it('renders addon cards', () => {
    render(<AddonsPage addons={allAddons} loading={false} />);
    expect(screen.getByTestId('addons-grid')).toBeTruthy();
    expect(screen.getByTestId('addon-card-templates')).toBeTruthy();
    expect(screen.getByTestId('addon-card-automation')).toBeTruthy();
    expect(screen.getByTestId('addon-card-analytics')).toBeTruthy();
  });

  it('shows tabs with counts', () => {
    render(<AddonsPage addons={allAddons} loading={false} />);
    expect(screen.getByTestId('tab-all').textContent).toContain('3');
    expect(screen.getByTestId('tab-active').textContent).toContain('2');
    expect(screen.getByTestId('tab-inactive').textContent).toContain('1');
  });

  it('filters by active tab', () => {
    render(<AddonsPage addons={allAddons} loading={false} />);
    fireEvent.click(screen.getByTestId('tab-active'));

    expect(screen.getByTestId('addon-card-templates')).toBeTruthy();
    expect(screen.getByTestId('addon-card-automation')).toBeTruthy();
    expect(screen.queryByTestId('addon-card-analytics')).toBeNull();
  });

  it('filters by inactive tab', () => {
    render(<AddonsPage addons={allAddons} loading={false} />);
    fireEvent.click(screen.getByTestId('tab-inactive'));

    expect(screen.getByTestId('addon-card-analytics')).toBeTruthy();
    expect(screen.queryByTestId('addon-card-templates')).toBeNull();
  });

  it('filters by search', () => {
    render(<AddonsPage addons={allAddons} loading={false} />);
    fireEvent.change(screen.getByTestId('addons-search'), { target: { value: 'auto' } });

    expect(screen.getByTestId('addon-card-automation')).toBeTruthy();
    expect(screen.queryByTestId('addon-card-templates')).toBeNull();
  });
});

// ── AddonCard Tests ─────────────────────────────────

describe('AddonCard', () => {
  it('renders name, description, version', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="A test addon"
        version="1.0.0" type="free" active={false} installed={true}
        tier="free" license={{ status: 'none', expiry: null }}
      />
    );
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('A test addon')).toBeTruthy();
    expect(screen.getByText('v1.0.0')).toBeTruthy();
  });

  it('shows type badge', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="paid" active={false} installed={true} tier="free"
        license={{ status: 'none', expiry: null }}
      />
    );
    expect(screen.getByTestId('type-badge-test').textContent).toBe('Pro');
  });

  it('shows activate button for inactive installed addon', () => {
    const onActivate = vi.fn().mockResolvedValue(undefined);
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="free" active={false} installed={true} tier="free"
        license={{ status: 'none', expiry: null }}
        onActivate={onActivate}
      />
    );
    expect(screen.getByTestId('activate-btn-test')).toBeTruthy();
  });

  it('shows deactivate button for active addon', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="free" active={true} installed={true} tier="free"
        license={{ status: 'none', expiry: null }}
      />
    );
    expect(screen.getByTestId('deactivate-btn-test')).toBeTruthy();
  });

  it('shows update badge when update available', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="free" active={true} installed={true} tier="free"
        license={{ status: 'none', expiry: null }}
        updateAvailable={{ version: '2.0.0' }}
      />
    );
    expect(screen.getByTestId('update-badge-test').textContent).toContain('2.0.0');
  });

  it('shows license status for paid addon', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="paid" active={true} installed={true} tier="pro"
        license={{ status: 'active', expiry: '2027-03-23' }}
      />
    );
    expect(screen.getByTestId('license-status-test').textContent).toContain('active');
    expect(screen.getByTestId('license-status-test').textContent).toContain('2027-03-23');
  });

  it('shows license activate button for paid addon without license', () => {
    render(
      <AddonCard
        slug="test" name="Test" description="" version="1.0.0"
        type="paid" active={true} installed={true} tier="free"
        license={{ status: 'none', expiry: null }}
      />
    );
    expect(screen.getByTestId('license-btn-test')).toBeTruthy();
  });
});

// ── FeatureGate Tests ───────────────────────────────

describe('FeatureGate', () => {
  it('renders children when feature is accessible', () => {
    render(
      <FeatureGate addons={allAddons} addon="templates" feature="basic">
        <div data-testid="child">Visible</div>
      </FeatureGate>
    );
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('renders fallback when feature is not accessible', () => {
    render(
      <FeatureGate addons={allAddons} addon="analytics" feature="reports" fallback={<div data-testid="fallback">Upgrade</div>}>
        <div data-testid="child">Hidden</div>
      </FeatureGate>
    );
    expect(screen.queryByTestId('child')).toBeNull();
    expect(screen.getByTestId('fallback')).toBeTruthy();
  });

  it('renders nothing when feature not accessible and no fallback', () => {
    const { container } = render(
      <FeatureGate addons={allAddons} addon="analytics" feature="reports">
        <div data-testid="child">Hidden</div>
      </FeatureGate>
    );
    expect(screen.queryByTestId('child')).toBeNull();
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing for non-existent addon', () => {
    const { container } = render(
      <FeatureGate addons={allAddons} addon="ghost" feature="anything">
        <div>Hidden</div>
      </FeatureGate>
    );
    expect(container.innerHTML).toBe('');
  });
});

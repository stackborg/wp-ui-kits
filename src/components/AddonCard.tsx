/**
 * AddonCard — individual addon display card.
 *
 * Shows addon info (name, description, type, version),
 * state-aware action buttons, license status, and version warnings.
 *
 * Uses shared primitives: Button, Badge, Alert.
 */

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Alert } from '@/components/Alert';

interface AddonCardProps {
  slug: string;
  name: string;
  description: string;
  version: string;
  type: 'free' | 'paid' | 'freemium';
  icon?: string;
  iconType?: 'url' | 'svg' | 'emoji' | 'none';
  active: boolean;
  installed: boolean;
  tier: 'free' | 'pro' | 'none';
  license: { status: string; expiry: string | null };
  updateAvailable?: { version: string };
  dependencyErrors?: string[];
  priceDisplay?: string;
  priceUrl?: string;
  onActivate?: (slug: string) => Promise<void>;
  onDeactivate?: (slug: string) => Promise<void>;
  onInstall?: (slug: string) => Promise<void>;
  onUninstall?: (slug: string) => Promise<void>;
  onUpdate?: (slug: string) => Promise<void>;
  onLicense?: (slug: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  free: 'var(--sb-addon-badge-free, #10b981)',
  paid: 'var(--sb-addon-badge-pro, #8b5cf6)',
  freemium: 'var(--sb-addon-badge-freemium, #3b82f6)',
};

const TYPE_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Pro',
  freemium: 'Freemium',
};

export function AddonCard({
  slug,
  name,
  description,
  version,
  type,
  icon,
  iconType,
  active,
  installed,
  license,
  updateAvailable,
  dependencyErrors,
  priceDisplay,
  priceUrl,
  onActivate,
  onDeactivate,
  onInstall,
  onUninstall,
  onUpdate,
  onLicense,
}: AddonCardProps): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const hasDependencyIssues = dependencyErrors && dependencyErrors.length > 0;

  const handleAction = async (action?: (slug: string) => Promise<void>) => {
    if (!action) return;
    setLoading(true);
    try {
      await action(slug);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sb-addon-card"
      data-testid={`addon-card-${slug}`}
      style={{
        border: '1px solid var(--sb-addon-card-border, #e5e7eb)',
        borderRadius: 'var(--sb-addon-card-radius, 12px)',
        padding: '20px',
        backgroundColor: 'var(--sb-addon-card-bg, #fff)',
        position: 'relative',
        opacity: loading ? 0.7 : 1,
        transition: 'opacity var(--sb-transition-normal, 0.2s), box-shadow var(--sb-transition-normal, 0.2s)',
      }}
    >
      {/* Update badge */}
      {updateAvailable && (
        <div
          data-testid={`update-badge-${slug}`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'var(--sb-addon-update-bg, #f59e0b)',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          v{updateAvailable.version} available
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: active ? 'var(--sb-addon-icon-bg-active, #ede9fe)' : 'var(--sb-addon-icon-bg-inactive, #f3f4f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            overflow: 'hidden',
          }}
        >
          {iconType === 'url' && icon ? (
            <img src={icon} alt={name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          ) : iconType === 'svg' && icon ? (
            <span
              style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          ) : icon && iconType === 'emoji' ? (
            <span>{icon}</span>
          ) : (
            <span>{active ? '⚡' : '📦'}</span>
          )}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--sb-color-text, #111827)' }}>{name}</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
            <span style={{ fontSize: '12px', color: 'var(--sb-color-text-secondary, #6b7280)' }}>v{version}</span>
            <Badge data-testid={`type-badge-${slug}`} color={TYPE_COLORS[type]}>
              {TYPE_LABELS[type] || 'Free'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--sb-color-text-secondary, #6b7280)', lineHeight: 1.4 }}>
        {description}
      </p>

      {/* Price display for paid/freemium */}
      {type !== 'free' && priceDisplay && (
        <div
          data-testid={`price-display-${slug}`}
          style={{
            fontSize: '12px',
            padding: '6px 10px',
            borderRadius: '6px',
            marginBottom: '12px',
            backgroundColor: 'var(--sb-addon-price-bg, #f5f3ff)',
            color: 'var(--sb-addon-price-color, #6d28d9)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 600 }}>{priceDisplay}</span>
          {priceUrl && (
            <a
              href={priceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '11px' }}
            >
              View Plans →
            </a>
          )}
        </div>
      )}

      {/* License status for paid/freemium */}
      {type !== 'free' && license.status !== 'none' && (
        <Alert
          data-testid={`license-status-${slug}`}
          variant={license.status === 'active' ? 'success' : 'error'}
          icon={license.status === 'active' ? '✓' : '✕'}
        >
          License: {license.status}
          {license.expiry && ` · Expires ${license.expiry}`}
        </Alert>
      )}

      {/* Dependency errors */}
      {hasDependencyIssues && (
        <Alert data-testid={`dependency-errors-${slug}`} variant="warning" icon="⚠">
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Missing Dependencies:</div>
          {dependencyErrors!.map((err, i) => (
            <div key={i} style={{ marginLeft: '8px' }}>• {err}</div>
          ))}
        </Alert>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {!installed && (
          <Button
            data-testid={`install-btn-${slug}`}
            variant="primary"
            size="md"
            loading={loading}
            onClick={() => handleAction(onInstall)}
          >
            Install
          </Button>
        )}

        {installed && !active && (
          <>
            <Button
              data-testid={`activate-btn-${slug}`}
              variant="primary"
              size="md"
              loading={loading}
              disabled={!!hasDependencyIssues}
              onClick={() => handleAction(onActivate)}
            >
              Activate
            </Button>
            <Button
              data-testid={`uninstall-btn-${slug}`}
              variant="danger"
              size="md"
              loading={loading}
              onClick={() => handleAction(onUninstall)}
            >
              Uninstall
            </Button>
          </>
        )}

        {installed && active && (
          <Button
            data-testid={`deactivate-btn-${slug}`}
            variant="secondary"
            size="md"
            loading={loading}
            onClick={() => handleAction(onDeactivate)}
          >
            Deactivate
          </Button>
        )}

        {updateAvailable && (
          <Button
            data-testid={`update-btn-${slug}`}
            variant="warning"
            size="md"
            loading={loading}
            onClick={() => handleAction(onUpdate)}
          >
            Update
          </Button>
        )}

        {type !== 'free' && license.status !== 'active' && installed && (
          <Button
            data-testid={`license-btn-${slug}`}
            variant="primary"
            size="md"
            loading={loading}
            onClick={() => onLicense?.(slug)}
          >
            Activate License
          </Button>
        )}
      </div>
    </div>
  );
}

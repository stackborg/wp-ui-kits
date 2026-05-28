/**
 * AddonCard — individual addon display card.
 *
 * Shows addon info (name, description, type, version),
 * state-aware action buttons, license status, and version warnings.
 *
 * Uses shared primitives: Button, Badge, Alert.
 */
import React from 'react';
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
    license: {
        status: string;
        expiry: string | null;
    };
    updateAvailable?: {
        version: string;
    };
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
export declare function AddonCard({ slug, name, description, version, type, icon, iconType, active, installed, license, updateAvailable, dependencyErrors, priceDisplay, priceUrl, onActivate, onDeactivate, onInstall, onUninstall, onUpdate, onLicense, }: AddonCardProps): React.ReactElement;
export {};

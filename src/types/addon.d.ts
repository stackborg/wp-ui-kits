/**
 * Addon system TypeScript types.
 *
 * These types mirror the PHP backend's data structures
 * for type-safe communication between dashboard and REST API.
 */

export interface AddonMeta {
  slug: string;
  name: string;
  version: string;
  type: 'free' | 'paid' | 'freemium';
  description: string;
  icon?: string;
  features: Record<string, 'free' | 'pro'>;
  requires?: Record<string, string>;
  price?: { display?: string; url?: string };
  update_policy?: 'auto' | 'manual' | 'security';
}

export interface AddonState {
  slug: string;
  name: string;
  version: string;
  type: 'free' | 'paid' | 'freemium';
  description: string;
  icon?: string;
  icon_type?: 'url' | 'svg' | 'emoji' | 'none';
  active: boolean;
  installed: boolean;
  tier: 'free' | 'pro' | 'none';
  features: Record<string, { tier: string; accessible: boolean }>;
  license: {
    status: 'active' | 'expired' | 'invalid' | 'none';
    expiry: string | null;
  };
  installed_at?: string;
  update_available?: {
    version: string;
    download_url: string;
  };
  dependency_errors?: string[];
  price_display?: string;
  price_url?: string;
  update_policy?: 'auto' | 'manual' | 'security';
}

export interface AddonListResponse {
  addons: AddonState[];
  count: number;
}

export interface AddonActionResult {
  success: boolean;
  message: string;
  errors?: string[];
  meta?: AddonMeta;
}

export interface LicenseActionResult {
  success: boolean;
  status: string;
  message: string;
  expiry?: string;
}

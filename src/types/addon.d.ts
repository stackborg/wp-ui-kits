/**
 * Addon system type definitions for the dashboard kit.
 *
 * These types define the shape of addon data flowing between
 * the WordPress backend and the React dashboard frontend.
 */

export interface AddonMeta {
  slug: string;
  name: string;
  description: string;
  version: string;
  icon?: string;
  features?: Record<string, string>;
}

export interface AddonFeatureInfo {
  accessible: boolean;
  tier: string;
  [key: string]: unknown;
}

export interface AddonState {
  slug: string;
  name: string;
  description: string;
  version: string;
  active: boolean;
  installed: boolean;

  // Type & tier classification
  type: 'free' | 'paid' | 'freemium';
  tier: 'free' | 'pro' | 'none';

  // Display
  icon?: string;
  icon_type?: 'url' | 'svg' | 'emoji' | 'none';

  // Features & dependencies
  features: Record<string, AddonFeatureInfo>;
  dependency_errors?: string[];

  // Licensing
  license: {
    status: string;
    expiry: string | null;
    key?: string;
  };

  // Pricing
  price_display?: string;
  price_url?: string;

  // Updates
  update_available?: { version: string };
  update_policy?: 'auto' | 'manual';
}

export interface AddonListResponse {
  addons: AddonState[];
}

export interface AddonActionResult {
  success: boolean;
  message?: string;
  addon?: AddonState;
}

export interface LicenseActionResult {
  success: boolean;
  status?: string;
  message?: string;
  license?: {
    key: string;
    status: string;
    expiry?: string;
  };
}

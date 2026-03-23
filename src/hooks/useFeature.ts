/**
 * useFeature — React hook for feature access control.
 *
 * Checks if a specific addon feature is accessible based on
 * the addon's state and license status.
 *
 * Usage:
 *   const { accessible, tier, loading } = useFeature(addons, 'automation', 'conditional_logic');
 */

import { useMemo } from 'react';
import type { AddonState } from '@/types/addon.d';

interface UseFeatureResult {
  accessible: boolean;
  tier: string;
  addonActive: boolean;
  licenseStatus: string;
}

export function useFeature(
  addons: AddonState[],
  addonSlug: string,
  feature: string
): UseFeatureResult {
  return useMemo(() => {
    const addon = addons.find((a) => a.slug === addonSlug);

    if (!addon) {
      return { accessible: false, tier: 'none', addonActive: false, licenseStatus: 'none' };
    }

    const featureInfo = addon.features[feature];
    const accessible = featureInfo?.accessible ?? false;
    const tier = featureInfo?.tier ?? 'none';

    return {
      accessible,
      tier,
      addonActive: addon.active,
      licenseStatus: addon.license.status,
    };
  }, [addons, addonSlug, feature]);
}

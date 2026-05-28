/**
 * useFeature — React hook for feature access control.
 *
 * Checks if a specific addon feature is accessible based on
 * the addon's state and license status.
 *
 * Usage:
 *   const { accessible, tier, loading } = useFeature(addons, 'automation', 'conditional_logic');
 */
import type { AddonState } from '../types/addon.d';
interface UseFeatureResult {
    accessible: boolean;
    tier: string;
    addonActive: boolean;
    licenseStatus: string;
}
export declare function useFeature(addons: AddonState[], addonSlug: string, feature: string): UseFeatureResult;
export {};

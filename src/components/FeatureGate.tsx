/**
 * FeatureGate — conditional rendering based on feature accessibility.
 *
 * Wraps content that should only be visible when a specific
 * addon feature is accessible (installed + active + licensed if paid).
 *
 * Usage:
 *   <FeatureGate addons={addons} addon="automation" feature="conditional_logic" fallback={<UpgradePrompt />}>
 *     <ConditionalLogicEditor />
 *   </FeatureGate>
 */

import React from 'react';
import { useFeature } from '@/hooks/useFeature';
import type { AddonState } from '@/types/addon.d';

interface FeatureGateProps {
  addons: AddonState[];
  addon: string;
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({
  addons,
  addon,
  feature,
  children,
  fallback = null,
}: FeatureGateProps): React.ReactElement | null {
  const { accessible } = useFeature(addons, addon, feature);

  if (accessible) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useFeature } from '../hooks/useFeature';
export function FeatureGate({ addons, addon, feature, children, fallback = null, }) {
    const { accessible } = useFeature(addons, addon, feature);
    if (accessible) {
        return _jsx(_Fragment, { children: children });
    }
    return fallback ? _jsx(_Fragment, { children: fallback }) : null;
}

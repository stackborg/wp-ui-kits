/**
 * Skeleton — shimmer loading placeholder block.
 *
 * Renders a pulsing placeholder used in loading states.
 * Customize dimensions and shape via style prop.
 *
 * Usage:
 *   <Skeleton style={{ height: '1rem', width: '8rem' }} />
 *   <Skeleton style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} />
 */
import React from 'react';
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export declare function Skeleton({ className, style, ...props }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
export {};

/**
 * Spinner — inline loading spinner with size variants.
 *
 * Usage:
 *   <Spinner />
 *   <Spinner size="lg" />
 *   <Button><Spinner size="sm" /> Loading...</Button>
 */
import React from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
interface SpinnerProps {
    size?: SpinnerSize;
    className?: string;
}
export declare function Spinner({ size, className }: SpinnerProps): React.ReactElement;
export {};

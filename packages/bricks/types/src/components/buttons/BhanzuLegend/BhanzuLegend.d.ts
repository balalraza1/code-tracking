import { ButtonProps } from '@mui/material';
import React from 'react';
export interface BhanzuLegendButtonProps extends ButtonProps {
    children: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    [key: string]: unknown;
}
export declare const BhanzuButtonLegend: ({ children, size, ...props }: BhanzuLegendButtonProps) => import("react/jsx-runtime").JSX.Element;

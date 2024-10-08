import { ButtonOwnProps, ButtonProps } from '@mui/material';
import React from 'react';
export declare const getTypographyVariant: (size: BhanzuButtonProps["size"]) => "buttonSmall" | "buttonMedium" | "buttonLarge";
export interface BhanzuButtonProps extends ButtonProps {
    children: React.ReactNode;
    size: 'small' | 'medium' | 'large';
    color: ButtonOwnProps['color'];
    [key: string]: unknown;
}

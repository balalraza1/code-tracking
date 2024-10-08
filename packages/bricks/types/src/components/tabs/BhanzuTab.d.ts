import * as React from 'react';
declare module '@mui/material/Tabs' {
    interface TabsPropsIndicatorColorOverrides {
        inherit: true;
        size: 'small' | 'large';
    }
}
export declare function BhanzuTab({ tabLabels, handleChange, value, size, ...props }: {
    tabLabels?: {
        label: React.ReactNode;
        icon?: React.ReactNode;
    }[];
    handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
    value?: number;
    size?: 'small' | 'large';
    props?: unknown;
}): import("react/jsx-runtime").JSX.Element;

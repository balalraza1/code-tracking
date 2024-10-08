import { TypographyProps } from '@mui/material';
declare const _default: {
    title: string;
    component: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").TypographyTypeMap<{}, "span">>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        children: {
            control: string;
        };
        variant: {
            control: {
                type: string;
            };
            options: string[];
        };
    };
    args: {
        children: string;
        variant: string;
    };
};
export default _default;
export declare const TypographyStyles: (args: {
    children: React.ReactNode;
    variant: TypographyProps["variant"];
}) => import("react/jsx-runtime").JSX.Element;

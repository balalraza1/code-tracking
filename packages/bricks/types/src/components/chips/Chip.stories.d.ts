import { JSX } from 'react/jsx-runtime';
declare const _default: {
    title: string;
    component: import("@mui/material/OverridableComponent").OverridableComponent<import("@mui/material").ChipTypeMap<{}, "div">>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        color: {
            control: {
                type: string;
            };
            options: string[];
        };
        size: {
            control: {
                type: string;
            };
            options: string[];
        };
        disabled: {
            control: {
                type: string;
            };
            options: boolean[];
        };
    };
    args: {
        disabled: boolean;
        size: string;
        color: string;
        label: string;
    };
};
export default _default;
export declare const Basic: {
    args: {
        color: string;
        label: JSX.Element;
        size: string;
    };
    render: (args: JSX.IntrinsicAttributes) => JSX.Element;
    decorators: ((Story: React.FC) => JSX.Element)[];
};

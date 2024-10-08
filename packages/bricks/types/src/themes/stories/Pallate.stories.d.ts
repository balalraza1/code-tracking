declare const _default: {
    title: string;
    component: import("@mui/material").ExtendButtonBase<import("@mui/material").ButtonTypeMap<{}, "button">>;
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
        background: {
            control: {
                type: string;
            };
            options: string[];
        };
    };
    args: {
        color: string;
        background: string;
    };
};
export default _default;
export declare const Template: (args: {
    color: unknown;
    background?: unknown;
}) => import("react/jsx-runtime").JSX.Element;

import { BhanzuButtonProps } from '../common/utils';
declare const _default: {
    title: string;
    component: (props: import("react/jsx-runtime").JSX.IntrinsicAttributes & BhanzuButtonProps) => import("react/jsx-runtime").JSX.Element;
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
        onClick: {
            action: string;
        };
        children: {
            control: string;
        };
        size: {
            control: {
                type: string;
                options: string[];
            };
        };
        disabled: {
            control: {
                type: string;
            };
        };
    };
    args: {
        onClick: import("@vitest/spy").Mock<any, any>;
        children: string;
        color: string;
        size: string;
        disabled: boolean;
    };
};
export default _default;
export declare const BhanzuButtonContained: (args: BhanzuButtonProps) => import("react/jsx-runtime").JSX.Element;
export declare const BhanzuButtonOutlined: (args: BhanzuButtonProps) => import("react/jsx-runtime").JSX.Element;
export declare const BhanzuButtonText: (args: BhanzuButtonProps) => import("react/jsx-runtime").JSX.Element;

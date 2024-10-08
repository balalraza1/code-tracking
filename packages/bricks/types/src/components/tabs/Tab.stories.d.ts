import { JSX } from 'react/jsx-runtime';
import { BhanzuTab } from './BhanzuTab';
declare const _default: {
    title: string;
    component: typeof BhanzuTab;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        size: {
            control: {
                type: string;
            };
            options: string[];
        };
    };
    args: {
        size: string;
        value: number;
    };
};
export default _default;
export declare const Basic: {
    args: {
        tabLabels: {
            label: JSX.Element;
        }[];
        handleChange: () => void;
        value: number;
        size: string;
    };
    render: (args: JSX.IntrinsicAttributes) => JSX.Element;
    decorators: ((Story: React.FC) => JSX.Element)[];
};
export declare const WithIcons: {
    args: {
        tabLabels: {
            label: JSX.Element;
            icon: JSX.Element;
        }[];
        iconPosition: string;
        handleChange: () => void;
        value: number;
        size: string;
    };
    render: (args: JSX.IntrinsicAttributes) => JSX.Element;
    decorators: ((Story: React.FC) => JSX.Element)[];
};
export declare const LargeTabs: {
    args: {
        tabLabels: {
            label: JSX.Element;
        }[];
        iconPosition: string;
        handleChange: () => void;
        value: number;
        size: string;
    };
    render: (args: JSX.IntrinsicAttributes) => JSX.Element;
    decorators: ((Story: React.FC) => JSX.Element)[];
};

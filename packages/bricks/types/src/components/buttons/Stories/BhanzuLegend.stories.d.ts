import { BhanzuLegendButtonProps } from '../BhanzuLegend/BhanzuLegend';
declare const _default: {
    title: string;
    component: ({ children, size, ...props }: BhanzuLegendButtonProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
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
        size: string;
        disabled: boolean;
    };
};
export default _default;
export declare const BhanzuButtonLegend: (args: BhanzuLegendButtonProps) => import("react/jsx-runtime").JSX.Element;

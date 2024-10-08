import { fn } from '@storybook/test';

import { ThemeProvider } from '../../../themes';
import { BhanzuButtonLegend as ButtonLegend } from '../BhanzuLegend/BhanzuLegend';
import { ButtonStoryBookArguments } from '../common/args';
import { BhanzuLegendButtonProps } from '../BhanzuLegend/BhanzuLegend';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Bhanzu/Buttons/BhanzuButtonLegend',
	component: ButtonLegend,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		...ButtonStoryBookArguments,
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		onClick: fn(),
		children: 'Button',
		size: 'medium',
		disabled: false,
	},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BhanzuButtonLegend = (args: BhanzuLegendButtonProps) => (
	<ThemeProvider>
		<ButtonLegend {...args} />
	</ThemeProvider>
);

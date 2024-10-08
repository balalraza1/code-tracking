import { fn } from '@storybook/test';

import { ThemeProvider } from '../../../themes';
import { BhanzuButtonContained as Contained } from '../BhanzuContained/BhanzuContained';
import { BhanzuButtonOutlined as Outlined } from '../BhanzuOutlined/BhanzuOutlined';
import { BhanzuButtonText as Text } from '../BhanzuText/BhanzuText';
import { ButtonStoryBookArguments } from '../common/args';
import { BhanzuButtonProps } from '../common/utils';
import { Palette as ThemePalette } from '../../../themes/pallate';
const optons = Object.keys(ThemePalette).filter(
	key => key !== 'mode' && key !== 'background' && key !== 'text'
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Bhanzu/Buttons/BhanzuButton',
	component: Contained,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		...ButtonStoryBookArguments,
		color: {
			control: {
				type: 'select',
			},
			options: [...optons],
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		onClick: fn(),
		children: 'Button',
		color: 'secondary',
		size: 'medium',
		disabled: false,
	},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BhanzuButtonContained = (args: BhanzuButtonProps) => (
	<ThemeProvider>
		<Contained {...args} />
	</ThemeProvider>
);

export const BhanzuButtonOutlined = (args: BhanzuButtonProps) => (
	<ThemeProvider>
		<Outlined {...args} />
	</ThemeProvider>
);

export const BhanzuButtonText = (args: BhanzuButtonProps) => (
	<ThemeProvider>
		<Text {...args} />
	</ThemeProvider>
);

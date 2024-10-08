import { ThemeProvider } from '../../themes';
import { BhanzuChips } from './BhanzuChips';
import { JSX } from 'react/jsx-runtime';
import { Box, Typography } from '@mui/material';
import { Palette as ThemePalette } from '../../themes/pallate';

const options = Object.keys(ThemePalette).filter(
	key => key !== 'mode' && key !== 'background' && key !== 'text'
);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Bhanzu/Chip',
	component: BhanzuChips,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		color: {
			control: {
				type: 'select',
			},
			options: [...options],
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			options: [true, false],
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		disabled: false,
		size: 'small',
		color: 'primary',
		label: 'Chips',
	},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
	args: {
		color: 'primary',
		label: <Typography variant="subtitle2">Chips</Typography>,
		size: 'small',
	},
	render: (args: JSX.IntrinsicAttributes) => (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				width: '35em',
			}}
		>
			<BhanzuChips {...args} />
		</Box>
	),
	decorators: [
		(Story: React.FC) => (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		),
	],
};

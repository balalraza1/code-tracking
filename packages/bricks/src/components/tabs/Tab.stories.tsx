import { ThemeProvider } from '../../themes';
import { JSX } from 'react/jsx-runtime';
import { Box, Typography } from '@mui/material';
import { BhanzuTab } from './BhanzuTab';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
	title: 'Bhanzu/Tabs',
	component: BhanzuTab,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'large'],
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		size: 'small',
		value: 0,
	},
};

const defaultValue = 0;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
	args: {
		tabLabels: [
			{ label: <Typography variant="subtitle1">Tab 1</Typography> },
			{ label: <Typography variant="subtitle1">Tab 2</Typography> },
			{ label: <Typography variant="subtitle1">Tab 3</Typography> },
			{ label: <Typography variant="subtitle1">Tab 4</Typography> },
		],
		handleChange: () => {},
		value: defaultValue,
		size: 'small',
	},
	render: (args: JSX.IntrinsicAttributes) => (
		<Box style={{ display: 'flex', justifyContent: 'space-around' }}>
			<BhanzuTab {...args} />
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

export const WithIcons = {
	args: {
		tabLabels: [
			{
				label: <Typography variant="subtitle1">Tab 1</Typography>,
				icon: <AccessTimeIcon fontSize="small" sx={{ pr: 0.5 }} />,
			},
			{
				label: <Typography variant="subtitle1">Tab 2</Typography>,
				icon: <AccessTimeIcon fontSize="small" sx={{ pr: 0.5 }} />,
			},
			{
				label: <Typography variant="subtitle1">Tab 3</Typography>,
				icon: <AccessTimeIcon fontSize="small" sx={{ pr: 0.5 }} />,
			},
			{
				label: <Typography variant="subtitle1">Tab 4</Typography>,
				icon: <AccessTimeIcon fontSize="small" sx={{ pr: 0.5 }} />,
			},
		],
		iconPosition: 'start',
		handleChange: () => {},
		value: defaultValue,
		size: 'small',
	},
	render: (args: JSX.IntrinsicAttributes) => (
		<Box style={{ display: 'flex', justifyContent: 'space-around' }}>
			<BhanzuTab {...args} />
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

export const LargeTabs = {
	args: {
		tabLabels: [
			{ label: <Typography variant="subtitle1">Tab 1</Typography> },
			{ label: <Typography variant="subtitle1">Tab 2</Typography> },
			{ label: <Typography variant="subtitle1">Tab 3</Typography> },
			{ label: <Typography variant="subtitle1">Tab 4</Typography> },
		],
		iconPosition: 'start',
		handleChange: () => {},
		value: defaultValue,
		size: 'large',
	},
	render: (args: JSX.IntrinsicAttributes) => (
		<Box style={{ display: 'flex', justifyContent: 'space-around' }}>
			<BhanzuTab {...args} />
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

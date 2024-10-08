import {
	Box,
	Button,
	ButtonOwnProps,
	Checkbox,
	CheckboxProps,
	Switch,
	TypeBackground,
	Typography,
	Card,
} from '@mui/material';
import { Palette as ThemePalette } from '../pallate';
import { ThemeProvider } from '../index';

import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const options = Object.keys(ThemePalette).filter(
	key => key !== 'mode' && key !== 'background' && key !== 'text'
);

const backgroundOptions = Object.keys(ThemePalette.background);

export default {
	title: 'Bhanzu/Pallate',
	component: Button,
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
		background: {
			control: {
				type: 'select',
			},
			options: [...backgroundOptions],
		},
	},
	args: {
		color: 'primary',
		background: 'pricklyPink',
	},
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Template = (args: { color: unknown; background?: unknown }) => (
	<ThemeProvider>
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '2rem',
				gap: 5,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					gap: 5,
					'& .MuiTypography-root': {
						marginBottom: '1rem',
					},
				}}
			>
				<Box>
					<Typography variant="body1">Light</Typography>

					<Box
						sx={{
							width: '5rem',
							height: '5rem',
							borderRadius: '10px	',
							backgroundColor: `${args.color as ButtonOwnProps['color']}.light`,
						}}
					/>
				</Box>
				<Box>
					<Typography variant="body1">Main</Typography>
					<Box
						sx={{
							width: '5rem',
							height: '5rem',
							borderRadius: '10px	',
							backgroundColor: `${args.color as ButtonOwnProps['color']}.main`,
						}}
					/>
				</Box>
				<Box>
					<Typography variant="body1">Dark</Typography>
					<Box
						sx={{
							width: '5rem',
							height: '5rem',
							borderRadius: '10px	',
							backgroundColor: `${args.color as ButtonOwnProps['color']}.dark`,
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: 5,
				}}
			>
				<Typography variant="body1">Button</Typography>
				<Button
					color={args.color as ButtonOwnProps['color']}
					variant="contained"
				>
					{args.color as React.ReactNode}
				</Button>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: 5,
				}}
			>
				<Typography variant="body1">Checkbox</Typography>
				<Checkbox
					color={args.color as CheckboxProps['color']}
					defaultChecked
				/>
			</Box>
			{/* <Switch color={args.color as CheckboxProps['color']} />
			 */}
			<Box
				sx={{
					display: 'flex',
					gap: 5,
				}}
			>
				<Typography variant="body1">Switch</Typography>
				<Switch
					color={args.color as CheckboxProps['color']}
					defaultChecked
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: 5,
				}}
			>
				<Typography variant="body1">Background colors</Typography>
				<Card
					sx={{
						minWidth: '15em',
						minHeight: '15em',
						background: theme =>
							theme.palette.background[
								(args?.background as keyof TypeBackground) ||
									'pricklyPink'
							],
					}}
				/>
			</Box>
		</Box>
	</ThemeProvider>
);

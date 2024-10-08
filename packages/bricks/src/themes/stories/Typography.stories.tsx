import { Box, Typography, TypographyProps } from '@mui/material';
import { Typography as ThemeTypography } from '../typography';
import { ThemeProvider } from '../index';
import { useEffect, useRef, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const options = Object.keys(ThemeTypography).filter(
	key => key !== 'fontFamily' && key !== 'fontSize'
);

export default {
	title: 'Bhanzu/Typography',
	component: Typography,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		children: { control: 'text' },
		variant: {
			control: {
				type: 'select',
			},
			options: [...options],
		},
	},

	args: {
		children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.
			Phasellus et semper felis, vel hendrerit felis. Donec ac orci auctor,
			ullamcorper nisi sit amet, tincidunt purus. Sed nec orci nec eros
			`,
		variant: 'h1',
	},
};

const FontDetials = () => {
	useEffect(() => {
		if (timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setInterval(() => {
			const section = document.getElementById('typography-section');
			const fontFamily = window.getComputedStyle(section!).fontFamily;
			const fontSize = window.getComputedStyle(section!).fontSize;
			const fontWeight = window.getComputedStyle(section!).fontWeight;
			const lineHeight = window.getComputedStyle(section!).lineHeight;
			setFont({
				fontFamily,
				fontSize,
				fontWeight,
				lineHeight,
			});
		}, 500);
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	const timer = useRef<NodeJS.Timeout | null>(null);
	const [font, setFont] = useState<{
		fontFamily: string;
		fontSize: string;
		fontWeight: string;
		lineHeight: string;
	}>({
		fontFamily: 'un',
		fontSize: 'un',
		fontWeight: 'un',
		lineHeight: 'un',
	});
	return (
		<Box>
			<Typography
				variant={'body1'}
			>{`Font Family: ${font.fontFamily}`}</Typography>
			<Typography
				variant={'body1'}
			>{`Font Size: ${font.fontSize}`}</Typography>
			<Typography
				variant={'body1'}
			>{`Font Weight: ${font.fontWeight}`}</Typography>
			<Typography
				variant={'body1'}
			>{`Line Height: ${font.lineHeight}`}</Typography>
		</Box>
	);
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TypographyStyles = (args: {
	children: React.ReactNode;
	variant: TypographyProps['variant'];
}) => (
	<ThemeProvider>
		<Box
			sx={{
				margin: 'auto',
				padding: '2rem',
				border: '1px solid #ccc',
				borderRadius: 4,
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',

				gap: '1rem',
			}}
		>
			<Typography
				variant={'body1'}
			>{`Variant: ${args.variant}`}</Typography>
			<FontDetials />
			<Typography id="typography-section" variant={args.variant}>
				{args.children}
			</Typography>
		</Box>
	</ThemeProvider>
);

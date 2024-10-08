import { ButtonOwnProps, ButtonProps } from '@mui/material';

import React from 'react';

export const getTypographyVariant = (size: BhanzuButtonProps['size']) => {
	switch (size) {
		case 'small':
			return 'buttonSmall';
		case 'medium':
			return 'buttonMedium';
		case 'large':
			return 'buttonLarge';
		default:
			return 'buttonMedium';
	}
};
export interface BhanzuButtonProps extends ButtonProps {
	children: React.ReactNode;
	size: 'small' | 'medium' | 'large';
	color: ButtonOwnProps['color'];
	[key: string]: unknown;
}

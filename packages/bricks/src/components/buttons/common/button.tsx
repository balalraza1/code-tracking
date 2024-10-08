import { Typography } from '@mui/material';
import {
	StyledButtonContained as StyledButton,
	StyledButtonText,
} from '../common/styled';
import { BhanzuButtonProps, getTypographyVariant } from './utils';

export const BhanzuButton = ({
	children,
	size = 'medium',
	color,
	...props
}: BhanzuButtonProps) => {
	return (
		<StyledButton {...{ ...props, size, color }}>
			<Typography variant={getTypographyVariant(size)}>
				{children}
			</Typography>
		</StyledButton>
	);
};

export const BhanzuButtonText = ({
	children,
	size = 'medium',
	color,
	...props
}: BhanzuButtonProps) => {
	return (
		<StyledButtonText {...{ ...props, size, color }}>
			<Typography variant={getTypographyVariant(size)}>
				{children}
			</Typography>
		</StyledButtonText>
	);
};

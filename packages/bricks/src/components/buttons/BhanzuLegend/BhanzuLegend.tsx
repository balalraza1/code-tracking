import { Box, ButtonProps, Typography, styled } from '@mui/material';
import React from 'react';
import { StyledButtonLegend as StyledButton } from '../common/styled';
import { getTypographyVariant } from '../common/utils';
import { keyframes } from '@mui/material/styles';
export interface BhanzuLegendButtonProps extends ButtonProps {
	children: React.ReactNode;
	size: 'small' | 'medium' | 'large';
	[key: string]: unknown;
}
const offsetLegend = {
	vertical: '4px',
	horizontal: '3px',
};

const move = keyframes`
	0% {
		visibility: visible;
		left: -100%;
	}
	50% {
		left: 100%;
		visibility: visible;
	}
	51% {
		visibility: hidden;
		left: 100%;
	}
	100% {
		visibility: hidden;
		left: -100%;
	}
`;

const StyledContainerForShineEffect = styled(Box)<{ disabled?: boolean }>(
	({ theme, disabled }) => ({
		position: 'relative',
		width: 'fit-content',
		'& .shine': {
			width: '100%',
			height: '100%',
			position: 'absolute',
			zIndex: '1',
			pointerEvents: 'none',
			animation: `${move} 6s  cubic-bezier(0.1, -0.6, 0.2, 0);`,
			animationDirection: 'normal',
			animationIterationCount: 'infinite',
		},
		'& .bottom-layer': {
			content: '""',
			borderRadius: '2.5rem',
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: offsetLegend.vertical,
			left: offsetLegend.horizontal,
			zIndex: '0',
			backgroundColor: disabled
				? '#746558 !important'
				: theme.palette.primary.dark,
		},
		'& .MuiButton-root:active': {
			top: offsetLegend.vertical,
			left: offsetLegend.horizontal,
		},
	})
);

export const BhanzuButtonLegend = ({
	children,
	size,
	...props
}: BhanzuLegendButtonProps) => {
	return (
		<StyledContainerForShineEffect disabled={props.disabled}>
			<StyledButton
				{...{ ...props, variant: 'contained', size }}
				color="primary"
			>
				{' '}
				<div className="shine">
					<svg
						width="53"
						height="54"
						viewBox="0 0 53 54"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g opacity="0.2">
							<rect
								x="31.3149"
								y="-9"
								width="11"
								height="70"
								transform="rotate(26.574 31.3149 -9)"
								fill="#D9D9D9"
							/>
							<rect
								x="47.3149"
								y="-7.4563"
								width="6.30956"
								height="70"
								transform="rotate(26.574 47.3149 -7.4563)"
								fill="#D9D9D9"
							/>
						</g>
					</svg>
				</div>
				<Typography variant={getTypographyVariant(size)}>
					{children}
				</Typography>
			</StyledButton>
			<div className="bottom-layer" />
		</StyledContainerForShineEffect>
	);
};

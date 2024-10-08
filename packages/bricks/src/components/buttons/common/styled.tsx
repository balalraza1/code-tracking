import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
const offset = '10px';

export const StyledButtonGeneral = styled(Button)(({ size }) => ({
	position: 'relative',
	borderRadius: '2.5rem',
	boxShadow: 'none !important',
	borderWidth: '1px',
	padding:
		size === 'small'
			? '0.5rem 0.75rem'
			: size === 'medium'
				? '0.5rem 1.25rem'
				: '0.5rem 1.88rem',
	'& .MuiTypography-root': {
		textTransform: 'none',
		fontWeight: 'normal',
	},

	'&.Mui-disabled': {
		border: '2px solid #746558',
		backgroundColor: '#EFECEA !important',
		'& .MuiTypography-root': {
			color: '#746558',
			fontWeight: 'lighter',
		},
		'&:before,:after': {
			visibility: 'hidden',
		},
	},
}));

export const StyledButtonLegend = styled(StyledButtonGeneral)(({ theme }) => {
	return {
		outlineColor: theme.palette.primary.dark,
		border: `2px solid ${theme.palette.primary.dark}`,
		position: 'relative',
		overflow: 'hidden',
		zIndex: 1,

		':hover': {
			backgroundColor: theme.palette.primary.light,
		},
		':active': {
			backgroundColor: theme.palette.primary.main,
			'&:before': {
				display: 'none',
			},
		},
		':disabled': {
			backgroundColor: '#bebebe !important',
		},
	};
});

export const StyledButtonContained = styled(StyledButtonGeneral)(
	({ theme, color }) => ({
		margin: '1px',
		border: `2px solid ${color && color !== 'inherit' ? theme.palette[color].dark : theme.palette.primary.dark}`,
		'&:before': {
			content: '""',
			borderRadius: '2.5rem',
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: '-1',
			vissibility: 'visible',
			transition: 'all 0.25s ease-in-out !important',
		},
		':hover': {
			border: `2px solid ${color && color !== 'inherit' ? theme.palette[color].dark : theme.palette.primary.dark}`,
			'&:before': {
				width: `calc( 100% + ${offset})`,
				height: `calc( 100% + ${offset})`,
				border: `1px solid ${color && color !== 'inherit' ? theme.palette[color].dark : theme.palette.primary.dark}`,
			},
		},
		'&:active': {
			borderWidth: '2px',
			margin: '0px',
			outline: 'none',
			'&:before': {
				visibility: 'hidden',
			},
		},
	})
);

export const StyledButtonText = styled(StyledButtonGeneral)(
	({ theme, color }) => ({
		border: 'none',
		'&:hover': {
			backgroundColor: `${color && color !== 'inherit' ? theme.palette[color].light : theme.palette.primary.light}`,
		},
		'&.Mui-disabled': {
			border: 'none',
			backgroundColor: 'transparent !important',
		},
	})
);

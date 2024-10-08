// Supports weights 300-700
// We are following the Material Design Typography Scale
// Scaled using Mobile First approach
// Breakpoints: 600px, 1280px, 1920px
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
import '@fontsource-variable/quicksand';
import { Theme, createTheme } from '@mui/material';
const intitalTheme = createTheme();
const fontWeights = {
	regular: 400,
	medium: 500,
	semiBold: 600,
	bold: 700,
};
const toRemFromPx = {
	10: '0.625rem',
	12: '0.75rem',
	14: '0.875rem',
	16: '1rem',
	18: '1.125rem',
	20: '1.25rem',
	22: '1.375rem',

	24: '1.5rem',
	26: '1.625rem',
	28: '1.75rem',

	30: '1.875rem',
	32: '2rem',
	34: '2.125rem',
	36: '2.25rem',
	38: '2.375rem',
	40: '2.5rem',
	42: '2.625rem',
	44: '2.75rem',
	46: '2.875rem',
	48: '3rem',
	50: '3.125rem',
	52: '3.25rem',
	54: '3.375rem',
	56: '3.5rem',
	58: '3.625rem',
	60: '3.75rem',
};

const createTypography = (theme: Theme) => ({
	fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
	h1: {
		fontSize: '2rem',
		fontWeight: fontWeights.bold,
		lineHeight: '2.5rem',
		[theme.breakpoints.between('sm', 'lg')]: {
			fontSize: '2.5rem',
			lineHeight: '3rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '3.75rem',
			lineHeight: '4.25rem',
		},
	},
	h2: {
		fontSize: '1.5rem',
		fontWeight: fontWeights.bold,
		lineHeight: '2rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: '2rem',
			lineHeight: '2.5rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '2.5rem',
			lineHeight: '3rem',
		},
	},
	h3: {
		fontSize: '1.25rem',
		fontWeight: fontWeights.bold,
		lineHeight: '1.75rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.5rem',
			lineHeight: '2rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '2rem',
			lineHeight: '2.5rem',
		},
	},

	h4: {
		fontSize: '1rem',
		fontWeight: fontWeights.bold,
		lineHeight: '1.5rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1.25rem',
			lineHeight: '1.75rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '1.5rem',
			lineHeight: '2rem',
		},
	},
	h5: {
		fontSize: '0.875rem',
		fontWeight: fontWeights.bold,
		lineHeight: '1.375rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: '1rem',
			lineHeight: '1.5rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '1.25rem',
			lineHeight: '1.75rem',
		},
	},
	h6: undefined,

	subtitle1: {
		fontWeight: fontWeights.bold,
		fontSize: toRemFromPx[14],
		lineHeight: toRemFromPx[28],

		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[16],
			lineHeight: toRemFromPx[24],
		},
	},
	subtitle2: {
		fontWeight: fontWeights.bold,
		fontSize: toRemFromPx[12],
		lineHeight: toRemFromPx[20],
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[14],
			lineHeight: toRemFromPx[22],
		},
	},
	body1: {
		fontWeight: fontWeights.medium,
		fontSize: toRemFromPx[14],
		lineHeight: toRemFromPx[28],
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[16],
			lineHeight: toRemFromPx[24],
		},
	},
	body2: {
		fontWeight: fontWeights.medium,
		fontSize: toRemFromPx[12],
		lineHeight: toRemFromPx[28],
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[14],
			lineHeight: toRemFromPx[22],
		},
	},
	body3: {
		fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
		fontWeights: fontWeights.medium + '!important', // '500!important
		fontSize: toRemFromPx[10],
		lineHeight: toRemFromPx[18],
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[12],
			lineHeight: toRemFromPx[20],
		},
	},
	overline: {
		fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
		fontWeight: fontWeights.bold + '!important', // '700!important
		fontSize: toRemFromPx[12],
		lineHeight: toRemFromPx[20],
	},
	buttonSmall: {
		fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
		fontSize: toRemFromPx[12],
		fontWeight: fontWeights.bold + '!important', // '700!important
		lineHeight: '1rem',
	},
	buttonMedium: {
		fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
		fontSize: toRemFromPx[12], // '0.75rem',
		fontWeight: fontWeights.bold + '!important', // '700!important
		lineHeight: toRemFromPx[20], // '1.25rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[14], // '0.875rem',
			lineHeight: toRemFromPx[22], // '1.25rem',
		},
	},
	buttonLarge: {
		fontFamily: 'Quicksand Variable,Roboto, Arial, sans-serif',
		fontSize: toRemFromPx[14], // '0.875rem',
		fontWeight: fontWeights.bold + '!important', // '700!important
		lineHeight: toRemFromPx[22], // '1.5rem',
		[theme.breakpoints.up('sm')]: {
			fontSize: toRemFromPx[16], // '1rem',
			lineHeight: toRemFromPx[24], // '1.5rem',
		},
	},
});

function addImportant(obj: Record<string, unknown>) {
	const newObj: Record<string, unknown> = {};
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			newObj[key] = addImportant(obj[key] as Record<string, unknown>);
		} else {
			if (
				typeof obj[key] === 'string' &&
				obj[key].includes('!important')
			) {
				newObj[key] = obj[key];
			} else {
				newObj[key] = obj[key] + ' !important';
			}
		}
	}
	return newObj;
}

export const Typography = addImportant(createTypography(intitalTheme));

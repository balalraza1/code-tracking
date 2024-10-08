import { Palette as MuiPalete } from '@mui/material/styles/createPalette';

export const Palette = {
	mode: 'light' as MuiPalete['mode'],
	//*********** EXISTING COLORS OVERWRITE ***********
	primary: {
		main: '#F15D22',
		light: '#F69D7A',
		dark: '#C04A1B',
		contrastText: '#fff',
	},
	secondary: {
		main: '#5E91FF',
		light: '#9EBDFF',
		dark: '#3870EB',
		contrastText: '#fff',
	},
	error: {
		main: '#FF2432',
		light: '#CC4B4B',
		dark: '#A6000B',
		contrastText: '#fff',
	},
	warning: {
		main: '#FAA728',
		light: '#FCD47F',
		dark: '#CD7C00',
		contrastText: '#000',
	},
	success: {
		main: '#31C853',
		light: '#6BE0BD',
		dark: '#00993D',
		contrastText: '#fff',
	},
	//*********** EXTRA COLORS ***********
	//magical moonlight
	grey: {
		50: '#EFECEA', // slight
		100: '#F2EFED', // contrastText
		200: '#E5E1DE', // light
		300: '#E5E1DE', // main (duplicated to maintain 200-300 as main)
		400: '#908B85', // dark1
		500: '#534C44', // dark2
		600: '#413930', // dark3
		700: '#292622', // dark4
		800: '#292622', // dark4 (duplicated to fill 800 range)
		900: '#292622', // dark4 (duplicated to fill 900 range)
		A100: '#E5E1DE', // main (duplicated to fill A100)
		A200: '#E5E1DE', // main (duplicated to fill A200)
		A400: '#292622', // dark4 (duplicated to fill A400)
		A700: '#292622',
		dark4: '#292622',
		dark3: '#413930',
		dark2: '#534C44',
		dark1: '#908B85',
		main: '#E5E1DE',
		light: '#EFECEA',
		slight: '#F2EFED',
		contrastText: '#fff',
	},
	//text color
	text: {
		primary: '#413930',
		secondary: '#534C44',
		disabled: '#908B85',
	},
	//light colors-card background
	background: {
		paper: '#fff',
		default: '#fff',
		bhanzuOrange: '#FDEEE8',
		fusionRed: '#FFEEEE',
		pricklyPink: '#FDEAF3',
		pinkDream: '#FFF5F5',
		orangePersimmon: '#FEF5F1',
		hotSunYellow: '#FEF7E9',
		patriceGreen: '#F2FBF4',
		underwaterFerngreen: '#E6F9F4',
		nirvanaJewel: '#EEF6F6',
		shovelKnight: '#E9F7FE',
		deepRiver: '#E5F1F7',
		coldLips: '#F4F4FD',
		purplishBlue: '#EFEAFD',
		blueChaos: '#EEF4FF',
		magicalMoonlightS: '#F2EFED',
	},
	//*********** PLAYFULL NEW COLORS ***********
	moonLight: {
		main: '#534C44',
		light: '#F2EFED',
		dark: '#413930',
		contrastText: '#fff',
	},
	tertiary: {
		main: '#FAB82B',
		light: '#FCD47F',
		dark: '#C89322',
		contrastText: '#000',
	},
	bhanzuOrange: {
		main: '#F15D22',
		light: '#FDEEE8',
		dark: '#C04A1B',
		contrastText: '#fff',
	},
	fusionRed: {
		main: '#FF5E5E',
		light: '#FF9E9E',
		dark: '#CC4B4B',
		contrastText: '#fff',
	},
	pricklyPink: {
		main: '#F12D8B',
		light: '#F681B9',
		dark: '#C0246F',
		contrastText: '#fff',
	},
	pinkDream: {
		main: '#FFA0A0',
		light: '#FFC6C6',
		dark: '#CC8080',
		contrastText: '#000',
	},
	orangePersimmon: {
		main: '#FC9E77',
		light: '#FDC4AD',
		dark: '#C97E5F',
		contrastText: '#fff',
	},
	hotSunYellow: {
		main: '#FAB82B',
		light: '#FCD47F',
		dark: '#C89322',
		contrastText: '#000',
	},
	patriceGreen: {
		main: '#86DB99',
		light: '#B6E9C1',
		dark: '#6BAF7A',
		contrastText: '#fff',
	},
	underwaterFerngreen: {
		main: '#09CC91',
		light: '#6BE0BD',
		dark: '#07A374',
		contrastText: '#fff',
	},
	nirvanaJewel: {
		main: '#5EA5AA',
		light: '#9EC9CC',
		dark: '#4B8488',
		contrastText: '#fff',
	},
	shovelKnight: {
		main: '#2AB5F9',
		light: '#7FD2FB',
		dark: '#2190C7',
		contrastText: '#fff',
	},
	deepRiver: {
		main: '#0079B5',
		light: '#66AED2',
		dark: '#006090',
		contrastText: '#fff',
	},
	coldLips: {
		main: '#9795F0',
		light: '#C0BFF6',
		dark: '#7877C0',
		contrastText: '#fff',
	},
	purplishBlue: {
		main: '#6034F2',
		light: '#9F85F7',
		dark: '#4C29C1',
		contrastText: '#fff',
	},
};

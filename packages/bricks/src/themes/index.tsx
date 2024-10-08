import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';
import { theme } from './theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

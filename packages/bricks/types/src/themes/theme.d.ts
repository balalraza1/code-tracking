import React from 'react';
declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        moonLight: Palette['primary'];
        bhanzuOrange: Palette['primary'];
        fusionRed: Palette['primary'];
        pricklyPink: Palette['primary'];
        pinkDream: Palette['primary'];
        orangePersimmon: Palette['primary'];
        hotSunYellow: Palette['primary'];
        patriceGreen: Palette['primary'];
        underwaterFerngreen: Palette['primary'];
        nirvanaJewel: Palette['primary'];
        shovelKnight: Palette['primary'];
        deepRiver: Palette['primary'];
        coldLips: Palette['primary'];
        purplishBlue: Palette['primary'];
        grey: Palette['grey'];
        background: Palette['background'];
        text: Palette['text'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
        moonLight?: Palette['primary'];
        bhanzuOrange?: Palette['primary'];
        fusionRed?: Palette['primary'];
        pricklyPink?: Palette['primary'];
        pinkDream?: Palette['primary'];
        orangePersimmon?: Palette['primary'];
        hotSunYellow?: Palette['primary'];
        patriceGreen?: Palette['primary'];
        underwaterFerngreen?: Palette['primary'];
        nirvanaJewel?: Palette['primary'];
        shovelKnight?: Palette['primary'];
        deepRiver?: Palette['primary'];
        coldLips?: Palette['primary'];
        purplishBlue?: Palette['primary'];
        grey?: Partial<Palette['grey']>;
        background?: Partial<Palette['background']>;
        text?: Partial<Palette['text']>;
    }
    interface TypographyVariants {
        buttonSmall: React.CSSProperties;
        buttonMedium: React.CSSProperties;
        buttonLarge: React.CSSProperties;
        body3: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        buttonSmall?: React.CSSProperties;
        buttonMedium?: React.CSSProperties;
        buttonLarge?: React.CSSProperties;
        body3?: React.CSSProperties;
        overline?: React.CSSProperties;
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        buttonSmall: true;
        buttonMedium: true;
        buttonLarge: true;
        body3: true;
        overline?: React.CSSProperties;
    }
}
export declare const theme: import("@mui/material").Theme;

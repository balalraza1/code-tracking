import { Box, Grid, IconButton } from '@mui/material';

import {
	BigrobbieGameSticker,
	BigrobbieRightSticker,
	BigrobbieSitSticker,
	BigrobbieStarSticker,
	Duck,
	Lamb,
	Panda,
	StickerAstronaut,
	StickerPlanet,
	StickerRocket1,
	StickerRocket,
} from '@exploring-infinities/icon-pack';

export default {
	title: 'Bhanzu/IconPack/Stickers',
	component: Box,
};

const stickers = [
	{ name: 'BigrobbieGameSticker', Icon: BigrobbieGameSticker },
	{ name: 'BigrobbieRightSticker', Icon: BigrobbieRightSticker },
	{ name: 'BigrobbieSitSticker', Icon: BigrobbieSitSticker },
	{ name: 'BigrobbieStarSticker', Icon: BigrobbieStarSticker },
	{ name: 'Duck', Icon: Duck },
	{ name: 'Lamb', Icon: Lamb },
	{ name: 'Panda', Icon: Panda },
	{ name: 'StickerAstronaut', Icon: StickerAstronaut },
	{ name: 'StickerPlanet', Icon: StickerPlanet },
	{ name: 'StickerRocket1', Icon: StickerRocket1 },
	{ name: 'StickerRocket', Icon: StickerRocket },
];

export const Stickers = () => (
	<Grid container spacing={2}>
		{stickers.map(({ name, Icon }) => (
			<Grid item xs={4} sm={3} md={2} key={name}>
				<Box display="flex" flexDirection="column" alignItems="center">
					<IconButton>
						<Icon fontSize="large" />
					</IconButton>
					<Box>{name}</Box>
				</Box>
			</Grid>
		))}
	</Grid>
);

import { Box, IconButton, Grid } from '@mui/material';

import {
	RobbieLevelUp,
	BigrobbieGame,
	BigrobbieQueen,
	BigrobbieRight,
	BigrobbieSit,
	BigrobbieStand,
	BigrobbieStar,
	IllustrationRocket,
	Panda1,
	Panda2,
	Panda3,
	Panda4,
	RobOnelegstand,
	RobPeekaboo,
	RobSad,
	RobSitting,
	RobStanding,
	RobStretching,
	TiltedRobbie,
} from '@exploring-infinities/icon-pack';

export default {
	title: 'Bhanzu/IconPack/Mascots',
	component: Box,
};

const icons = [
	{ name: 'RobbieLevelUp', Icon: RobbieLevelUp },
	{ name: 'BigrobbieGame', Icon: BigrobbieGame },
	{ name: 'BigrobbieQueen', Icon: BigrobbieQueen },
	{ name: 'BigrobbieRight', Icon: BigrobbieRight },
	{ name: 'BigrobbieSit', Icon: BigrobbieSit },
	{ name: 'BigrobbieStand', Icon: BigrobbieStand },
	{ name: 'BigrobbieStar', Icon: BigrobbieStar },
	{ name: 'IllustrationRocket', Icon: IllustrationRocket },
	{ name: 'Panda1', Icon: Panda1 },
	{ name: 'Panda2', Icon: Panda2 },
	{ name: 'Panda3', Icon: Panda3 },
	{ name: 'Panda4', Icon: Panda4 },
	{ name: 'RobOnelegstand', Icon: RobOnelegstand },
	{ name: 'RobPeekaboo', Icon: RobPeekaboo },
	{ name: 'RobSad', Icon: RobSad },
	{ name: 'RobSitting', Icon: RobSitting },
	{ name: 'RobStanding', Icon: RobStanding },
	{ name: 'RobStretching', Icon: RobStretching },
	{ name: 'TiltedRobbie', Icon: TiltedRobbie },
];

export const Mascots = () => (
	<Grid container spacing={2}>
		{icons.map(({ name, Icon }) => (
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

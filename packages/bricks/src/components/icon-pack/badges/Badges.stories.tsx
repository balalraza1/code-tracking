import { Box, Grid, IconButton } from '@mui/material';

import {
	BadgeRocket,
	BadgeComet,
	BadgeFire,
	BadgeLevel1,
	BadgeLevel2,
	BadgeLevel3,
	BadgeNumber10,
	BadgeNumber3,
	BadgeNumber5,
	BadgeNumber8,
} from '@exploring-infinities/icon-pack';

export default {
	title: 'Bhanzu/IconPack/Badges',
	component: Box,
};

const badges = [
	{ name: 'BadgeRocket', Icon: BadgeRocket },
	{ name: 'BadgeComet', Icon: BadgeComet },
	{ name: 'BadgeFire', Icon: BadgeFire },
	{ name: 'BadgeLevel1', Icon: BadgeLevel1 },
	{ name: 'BadgeLevel2', Icon: BadgeLevel2 },
	{ name: 'BadgeLevel3', Icon: BadgeLevel3 },
	{ name: 'BadgeNumber10', Icon: BadgeNumber10 },
	{ name: 'BadgeNumber3', Icon: BadgeNumber3 },
	{ name: 'BadgeNumber5', Icon: BadgeNumber5 },
	{ name: 'BadgeNumber8', Icon: BadgeNumber8 },
];

export const Badges = () => (
	<Grid container spacing={2}>
		{badges.map(({ name, Icon }) => (
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

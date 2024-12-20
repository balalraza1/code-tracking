import { Box, Grid, IconButton } from '@mui/material';
import * as Icons from '@exploring-infinities/icon-pack';

const extractIconsFromSubmodule = (submoduleName: string) => {
	return Object.entries(Icons).filter(([key]) =>
		key.toLowerCase().startsWith(submoduleName.toLowerCase())
	);
};

export default {
	title: 'Bhanzu/IconPack/All Icons',
	component: Box,
};

export const IconsPack = () => {
	const icons = extractIconsFromSubmodule('Ic');

	return (
		<Grid container spacing={2}>
			{icons.map(([name, Icon]) => (
				<Grid item xs={4} sm={3} md={2} key={name}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<IconButton>
							<Icon fontSize="large" />
						</IconButton>
						<Box mt={1} textAlign="center">
							{name}
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

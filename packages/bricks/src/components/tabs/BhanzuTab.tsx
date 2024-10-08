import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Palette } from '../../themes/pallate';
import { styled } from '@mui/material/styles';

// Extending Tabs component to include custom properties
declare module '@mui/material/Tabs' {
	interface TabsPropsIndicatorColorOverrides {
		inherit: true;
		size: 'small' | 'large';
	}
}

// Accessibility properties function for tabs
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

// Styled component for Tab
const StyledTab = styled(Tab)<{ size: 'small' | 'large'; selected: boolean }>`
	${({ size, selected }) => `
    padding: ${size === 'large' ? '1.063rem' : '0.375rem'};
    width: 11.25rem;
    min-height: auto;
    text-transform: none;
    color: ${Palette.grey.dark1};

    ${
		selected &&
		`
      background: ${Palette.secondary.main};
      border: 4px solid ${Palette.secondary.light};
      color: white;
      border-radius: ${size === 'large' ? '17px' : '10px'};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `
	}
  `}
`;

// Styled component for Tabs container
const StyledTabs = styled(Tabs)`
	min-height: auto;
`;

// Styled component for Box container
const StyledBox = styled(Box)`
	border: 2px solid ${Palette.grey.main};
	border-radius: 20px;
	padding: 0.4em;
	width: auto;
`;

// Main component
export function BhanzuTab({
	tabLabels,
	handleChange,
	value = 0,
	size = 'small',
	...props
}: {
	tabLabels?: { label: React.ReactNode; icon?: React.ReactNode }[];
	handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
	value?: number;
	size?: 'small' | 'large';
	props?: unknown;
}) {
	return (
		<StyledBox>
			<StyledTabs
				textColor="inherit"
				indicatorColor="inherit"
				value={value}
				onChange={handleChange}
				{...props}
			>
				{tabLabels?.map((tab, index) => (
					<StyledTab
						key={index}
						label={tab.label}
						icon={<>{tab?.icon}</>}
						size={size}
						selected={value === index}
						{...props}
						{...a11yProps(index)}
					/>
				))}
			</StyledTabs>
		</StyledBox>
	);
}

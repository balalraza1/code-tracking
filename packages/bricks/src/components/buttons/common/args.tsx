// Arguments defined in storybook for Button component
export const ButtonStoryBookArguments = {
	onClick: { action: 'clicked' },
	children: { control: 'text' },
	size: {
		control: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
	disabled: {
		control: {
			type: 'boolean',
		},
	},
};

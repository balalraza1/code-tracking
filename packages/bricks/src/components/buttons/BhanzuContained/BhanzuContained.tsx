import { JSX } from 'react/jsx-runtime';
import { BhanzuButton } from '../common/button';
import { BhanzuButtonProps } from '../common/utils';

export const BhanzuButtonContained = (
	props: JSX.IntrinsicAttributes & BhanzuButtonProps
) => {
	return <BhanzuButton {...props} variant="contained" />;
};

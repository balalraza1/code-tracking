import { JSX } from 'react/jsx-runtime';

import { BhanzuButtonText as BhanzuButton } from '../common/button';
import { BhanzuButtonProps } from '../common/utils';
export const BhanzuButtonText = (
	props: JSX.IntrinsicAttributes & BhanzuButtonProps
) => {
	return <BhanzuButton {...props} variant="text" />;
};

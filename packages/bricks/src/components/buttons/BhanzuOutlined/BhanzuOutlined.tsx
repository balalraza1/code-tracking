import { BhanzuButton } from '../common/button';
import { BhanzuButtonProps } from '../common/utils';

export const BhanzuButtonOutlined = (
	props: JSX.IntrinsicAttributes & BhanzuButtonProps
) => {
	return <BhanzuButton {...props} variant="outlined" />;
};

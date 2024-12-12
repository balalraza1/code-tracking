import { clsm } from '../../utils';

export const defaultViewerStreamActionTransition = {
  duration: 0.2,
  transition: { ease: 'easeInOut' }
};

export const defaultSlideUpVariant = {
  visible: { y: 0 },
  hidden: { y: 15 }
};

const defaultViewerStreamActionVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: defaultViewerStreamActionTransition
  },
  hidden: { y: 15, opacity: 0, transition: defaultViewerStreamActionTransition }
};

export const reversedViewerStreamActionVariants = {
  ...defaultViewerStreamActionVariants,
  hidden: {
    y: -15,
    opacity: 0,
    transition: defaultViewerStreamActionTransition
  }
};

export const defaultViewerStreamActionAnimationProps = {
  animate: 'visible',
  exit: 'hidden',
  initial: 'hidden'
};

export const correctAnswerClasses = clsm([
  'bg-green-700',
  'hover:bg-green-700 ',
  'text-white',
  'font-bold',
  'rounded',
  'border',
  'border-green-700'
]);
export const incorrectAnswerClasses = clsm([
  'bg-red-700',
  'hover:bg-red-700 ',
  'text-white',
  'font-bold',
  'rounded',
  'border',
  'border-red-700'
]);

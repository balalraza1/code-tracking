import clsx from 'clsx';
import { extendTailwindMerge, fromTheme } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
    classGroups: {
      shadow: [
        {
          shadow: [
            fromTheme('shadow'),
            'focus',
            'focusOuter',
            'hover',
            'hoverOuter'
          ],
          'shadow-color': [
            {
              shadow: [
                (value) => {
                  const colorModeRegex = /(darkMode|lightMode)/i;
                  colorModeRegex.test(value);
                  return value;
                }
              ]
            }
          ]
        }
      ],
      text: ['text-p1', 'text-p2', 'text-p3', 'text-p4', 'text-h3']
    }
  });

export const noop = () => {};
export const clsm = (...classes) => {
    if (!classes) return;
  
    return customTwMerge(clsx(classes));
  };

  export const isiOS = () =>
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  export const bound = (value, min = null, max = null) => {
    let boundedValue = value;
  
    if (min !== null) boundedValue = Math.max(min, value);
    if (max !== null) boundedValue = Math.min(max, boundedValue);
  
    return boundedValue;
  };

  export const isTextColorInverted = (color) => ['green', 'blue'].includes(color);
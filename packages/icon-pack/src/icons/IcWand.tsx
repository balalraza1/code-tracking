import * as React from "react";
import { SVGProps } from "react";
const SvgIcWand = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#ic_wand_svg__a)" stroke="#413930" strokeLinejoin="round">
      <path
        fill="#413930"
        d="m10.038 16.866 2.828-2.829L33.118 34.29l-2.829 2.828z"
      />
      <path
        d="M8.414 15.242a2 2 0 1 1 2.829-2.828l4.319 4.32-2.829 2.827-4.319-4.319Z"
        fill="#534C44"
      />
    </g>
    <path
      d="m15 4 1.293 2.22 2.511.544-1.712 1.916.26 2.556L15 10.2l-2.351 1.036.259-2.556-1.712-1.916 2.51-.544L15 4Z"
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="ic_wand_svg__a"
        x={4.328}
        y={8.328}
        width={34.289}
        height={34.289}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_497_230" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_497_230"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcWand;

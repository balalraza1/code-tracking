import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMousePointer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <g filter="url(#ic_mouse_pointer_svg__a)">
      <path
        fill="#5E91FF"
        fillRule="evenodd"
        d="m31.667 25.538-6.127 6.129-16.331-16.33a1.04 1.04 0 0 1-.316-.656l-.56-6.348 6.355.543c.246.038.473.155.647.333z"
        clipRule="evenodd"
      />
      <path
        fill="#413930"
        d="m31.667 25.538.353.354a.5.5 0 0 0 0-.708zm-6.127 6.129-.354.353a.5.5 0 0 0 .707 0zM9.209 15.337l.353-.353-.007-.007zm-.316-.656-.498.044zm-.56-6.348.043-.498a.5.5 0 0 0-.54.542zm6.355.543.077-.494-.017-.002-.017-.002zm.647.333-.356.35.003.003zm15.978 15.976-6.127 6.128.707.707 6.127-6.129zm-5.42 6.128L9.563 14.984l-.707.707 16.331 16.33zM9.555 14.977a.54.54 0 0 1-.164-.34l-.996.088c.033.371.2.716.467.973zm-.164-.34-.56-6.348-.996.088.56 6.348zm-1.1-5.805 6.355.542.085-.996-6.355-.543zm6.32.538a.66.66 0 0 1 .368.19l.713-.702a1.66 1.66 0 0 0-.927-.476zm.37.192 16.332 16.33.707-.708L15.69 8.855z"
      />
    </g>
    <defs>
      <filter
        id="ic_mouse_pointer_svg__a"
        width={32.333}
        height={32.333}
        x={3.833}
        y={5.833}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_497_521" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_497_521"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcMousePointer;

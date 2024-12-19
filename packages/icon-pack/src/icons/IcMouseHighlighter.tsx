import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMouseHighlighter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 41"
    {...props}
  >
    <g filter="url(#ic_mouse_highlighter_svg__a)">
      <path
        fill="#5E91FF"
        d="M11.065 7.885a.6.6 0 0 0-1.009.29l-.874 3.787a.6.6 0 0 0 .16.56l3.713 3.712a.6.6 0 0 0 .849 0l2.33-2.33a.6.6 0 0 0 0-.85z"
      />
      <path
        fill="#F2EFED"
        stroke="#413930"
        strokeLinejoin="round"
        d="M15.697 22.41a.1.1 0 0 1-.025-.043l-1.155-3.916a1.1 1.1 0 0 0-.277-.467L11.5 15.246a.1.1 0 0 1 0-.142l3.603-3.603a.1.1 0 0 1 .142 0l2.738 2.738c.13.13.29.226.467.278l3.916 1.155a.1.1 0 0 1 .042.025l11.49 11.49a.1.1 0 0 1 0 .141L27.33 33.9a.1.1 0 0 1-.142 0z"
      />
      <path fill="#5E91FF" d="m17.719 23.018 5.3-5.3 3.013 3.013-5.3 5.3z" />
    </g>
    <defs>
      <filter
        id="ic_mouse_highlighter_svg__a"
        width={33.262}
        height={34.72}
        x={5.167}
        y={5.709}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_497_533" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_497_533"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcMouseHighlighter;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcMousePointer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#ic_mouse_pointer_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m31.667 25.538-6.127 6.129-16.331-16.33a1.036 1.036 0 0 1-.316-.656l-.56-6.348 6.355.543c.246.038.473.155.647.333l16.332 16.329Z"
        fill="#5E91FF"
      />
      <path
        d="m31.667 25.538.353.354a.5.5 0 0 0 0-.708l-.353.354Zm-6.127 6.129-.354.353a.5.5 0 0 0 .707 0l-.353-.353ZM9.209 15.337l.353-.353-.007-.007-.346.36Zm-.316-.656-.498.044.498-.044Zm-.56-6.348.043-.498a.5.5 0 0 0-.54.542l.497-.044Zm6.355.543.077-.494-.017-.002-.017-.002-.043.498Zm.647.333-.356.35.003.003.353-.353Zm15.978 15.976-6.127 6.128.707.707 6.127-6.129-.707-.706Zm-5.42 6.128L9.563 14.984l-.707.707 16.331 16.33.707-.708ZM9.555 14.977a.536.536 0 0 1-.164-.34l-.996.088c.033.371.2.716.467.973l.693-.721Zm-.164-.34-.56-6.348-.996.088.56 6.348.996-.088Zm-1.1-5.806 6.354.543.086-.996-6.355-.543-.085.997Zm6.32.54a.659.659 0 0 1 .368.189l.713-.702a1.659 1.659 0 0 0-.927-.476l-.154.988Zm.37.191 16.332 16.33.707-.708L15.69 8.855l-.707.707Z"
        fill="#413930"
      />
    </g>
    <defs>
      <filter
        id="ic_mouse_pointer_svg__a"
        x={3.833}
        y={5.833}
        width={32.333}
        height={32.333}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
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

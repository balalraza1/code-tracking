import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMouseRubber = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <g stroke="#413930" filter="url(#ic_mouse_rubber_svg__a)">
      <path
        fill="#F2EFED"
        d="M17.645 7.745A.5.5 0 0 0 17 7.69l-10.724 7.66a.5.5 0 0 0-.063.761l16.136 16.136a.5.5 0 0 0 .707 0l9.192-9.192a.5.5 0 0 0 0-.707z"
      />
      <path fill="#F15D22" d="m11.624 21.524 9.9-9.9 11.078 11.079-9.9 9.9z" />
      <path fill="#F15D22" d="m15.16 25.059 9.9-9.9 5.184 5.186-9.899 9.9z" />
    </g>
    <defs>
      <filter
        id="ic_mouse_rubber_svg__a"
        width={35.742}
        height={34.21}
        x={1.567}
        y={5.098}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_497_523" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_497_523"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcMouseRubber;

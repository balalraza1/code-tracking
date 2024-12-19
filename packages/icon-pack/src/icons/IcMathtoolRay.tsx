import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolRay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M30.9 10 11.1 29.799"
    />
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M13.243 27.414a2 2 0 1 1-2.828 2.829 2 2 0 0 1 2.828-2.829Z"
    />
    <circle
      cx={23.828}
      cy={16.828}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 23.828 16.828)"
    />
  </svg>
);
export default SvgIcMathtoolRay;

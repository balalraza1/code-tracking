import * as React from "react";
import { SVGProps } from "react";
const SvgIcMathtoolRay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M30.9 10 11.1 29.799"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.243 27.414a2 2 0 1 1-2.828 2.829 2 2 0 0 1 2.828-2.829Z"
      fill="#F15D22"
      stroke="#413930"
    />
    <circle
      cx={23.828}
      cy={16.828}
      r={2}
      transform="rotate(-45 23.828 16.828)"
      fill="#F15D22"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcMathtoolRay;

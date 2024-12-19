import * as React from "react";
import { SVGProps } from "react";
const SvgIcHappy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={19.773}
      cy={19.773}
      r={13.273}
      fill="#FAB82B"
      stroke="#413930"
    />
    <path
      d="M19.94 28c8.939 0 9.06-8 9.06-8H11s0 8 8.94 8Z"
      fill="#F15D22"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 16c0-.375.211-3 2-3 1.5 0 2 2.25 2 3M23 16c0-.375.211-3 2-3 1.5 0 2 2.25 2 3"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcHappy;

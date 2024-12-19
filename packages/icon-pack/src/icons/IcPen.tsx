import * as React from "react";
import type { SVGProps } from "react";
const SvgIcPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#5E91FF"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.46 28.484 23.862 7l5.196 3-12.404 21.484z"
    />
    <path
      fill="#F15D22"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.363 9.598 23.863 7l5.196 3-1.5 2.598zM16.56 31.65l-5.197-3-.883 7.258z"
    />
    <path
      fill="#534C44"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.827 34.115-1.732-1-.16 2.217z"
    />
  </svg>
);
export default SvgIcPen;

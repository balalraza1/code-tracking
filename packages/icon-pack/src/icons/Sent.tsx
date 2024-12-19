import * as React from "react";
import type { SVGProps } from "react";
const SvgSent = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      d="M5.667 34 34.75 21.533c1.35-.583 1.35-2.483 0-3.066L5.667 6c-1.1-.483-2.317.333-2.317 1.517L3.333 15.2c0 .833.617 1.55 1.45 1.65L19.167 20 4.783 23.133a1.686 1.686 0 0 0-1.45 1.667l.017 7.683c0 1.184 1.217 2 2.317 1.517Z"
    />
  </svg>
);
export default SvgSent;

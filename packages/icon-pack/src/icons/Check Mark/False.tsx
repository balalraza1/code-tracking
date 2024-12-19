import * as React from "react";
import { SVGProps } from "react";
const SvgFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={13.333} fill="#F2EFED" stroke="#908B85" />
    <path
      d="M11.667 20.238s4.166 3.929 6.666 6.429l9.167-12.5"
      stroke="#908B85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgFalse;

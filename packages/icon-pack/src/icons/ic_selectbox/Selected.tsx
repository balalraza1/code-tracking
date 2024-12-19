import * as React from "react";
import { SVGProps } from "react";
const SvgSelected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      y={0.5}
      width={39}
      height={39}
      rx={7.5}
      fill="#5E91FF"
      stroke="#413930"
    />
    <path
      d="M7.5 19.107s6.25 5.893 10 9.643L31.25 10"
      stroke="#EEF4FF"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgSelected;

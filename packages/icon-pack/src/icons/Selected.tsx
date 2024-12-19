import * as React from "react";
import type { SVGProps } from "react";
const SvgSelected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={39}
      height={39}
      x={0.5}
      y={0.5}
      fill="#5E91FF"
      stroke="#413930"
      rx={7.5}
    />
    <path
      stroke="#EEF4FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M7.5 19.107s6.25 5.893 10 9.643L31.25 10"
    />
  </svg>
);
export default SvgSelected;

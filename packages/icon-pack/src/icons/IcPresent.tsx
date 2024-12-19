import * as React from "react";
import type { SVGProps } from "react";
const SvgIcPresent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={27}
      height={18}
      x={6.5}
      y={10.5}
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
      rx={0.5}
    />
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      d="M20 23.5 13 33h14z"
    />
  </svg>
);
export default SvgIcPresent;

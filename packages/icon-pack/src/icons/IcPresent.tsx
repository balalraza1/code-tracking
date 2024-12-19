import * as React from "react";
import { SVGProps } from "react";
const SvgIcPresent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={6.5}
      y={10.5}
      width={27}
      height={18}
      rx={0.5}
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <path
      d="M20 23.5 13 33h14l-7-9.5Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcPresent;

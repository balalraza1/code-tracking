import * as React from "react";
import { SVGProps } from "react";
const SvgIcRecent = (props: SVGProps<SVGSVGElement>) => (
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
      rx={3.5}
      stroke="#5E91FF"
      strokeLinejoin="round"
      strokeDasharray="8 8"
    />
    <path
      d="m20 8 3.88 6.66 7.533 1.632-5.136 5.747.776 7.67L20 26.6l-7.053 3.108.776-7.668-5.136-5.748 7.534-1.632L20 8Z"
      stroke="#5E91FF"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcRecent;

import * as React from "react";
import type { SVGProps } from "react";
const SvgIcRecent = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="#5E91FF"
      strokeDasharray="8 8"
      strokeLinejoin="round"
      rx={3.5}
    />
    <path
      stroke="#5E91FF"
      strokeLinejoin="round"
      d="m20 8 3.88 6.66 7.533 1.632-5.136 5.747.776 7.67L20 26.6l-7.053 3.108.776-7.668-5.136-5.748 7.534-1.632z"
    />
  </svg>
);
export default SvgIcRecent;

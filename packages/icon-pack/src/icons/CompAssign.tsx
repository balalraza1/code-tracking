import * as React from "react";
import type { SVGProps } from "react";
const SvgCompAssign = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={24.088} cy={11.067} r={5.108} fill="#5E91FF" stroke="#413930" />
    <path
      fill="#5E91FF"
      stroke="#413930"
      d="M30.16 20.26a8.6 8.6 0 0 1 2.502 5.572H15.515A8.588 8.588 0 0 1 30.16 20.26Z"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M21.116 11.022c0 .37.957 1.955 2.952 1.955 1.596 0 2.993-1.214 2.993-1.956"
    />
    <rect
      width={15}
      height={17.995}
      x={7.5}
      y={14.682}
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      rx={0.5}
    />
    <path stroke="#413930" strokeLinecap="round" d="M10 18h10M10 22h10" />
    <path
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
      d="M16.416 25.295h8.19v-2.52l4.986 4.488-4.985 4.252V29.23h-8.191z"
    />
  </svg>
);
export default SvgCompAssign;

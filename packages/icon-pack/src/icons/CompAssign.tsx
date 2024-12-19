import * as React from "react";
import { SVGProps } from "react";
const SvgCompAssign = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={24.088} cy={11.067} r={5.108} fill="#5E91FF" stroke="#413930" />
    <path
      d="M30.16 20.26a8.588 8.588 0 0 1 2.502 5.572H15.515A8.588 8.588 0 0 1 30.16 20.26Z"
      fill="#5E91FF"
      stroke="#413930"
    />
    <path
      d="M21.116 11.021c0 .37.957 1.956 2.952 1.956 1.596 0 2.993-1.214 2.993-1.956"
      stroke="#413930"
      strokeLinecap="round"
    />
    <rect
      x={7.5}
      y={14.682}
      width={15}
      height={17.995}
      rx={0.5}
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <path d="M10 18h10M10 22h10" stroke="#413930" strokeLinecap="round" />
    <path
      d="M16.416 25.295h8.19v-2.52l4.986 4.488-4.985 4.252V29.23h-8.191v-3.935Z"
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCompAssign;

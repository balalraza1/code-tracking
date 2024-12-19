import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20.244} cy={16.991} r={13.286} fill="#5E91FF" />
    <path
      fill="#FAB82B"
      stroke="#413930"
      d="M27.228 21.031 25.49 10.805c-.296-1.745-1.701-3.15-3.47-3.195-1.03-.026-2.202.02-3.436.23-1.292.219-2.396.55-3.325.902-1.655.625-2.51 2.432-2.214 4.177l1.736 10.226c.272 1.599 1.486 2.887 3.104 2.993 1.112.072 2.452.068 3.78-.157s2.595-.665 3.62-1.1c1.493-.634 2.213-2.25 1.942-3.85Z"
    />
    <circle cx={16.345} cy={17.7} r={1.008} stroke="#413930" />
    <path
      stroke="#413930"
      d="M16.346 18.798v6.262a3 3 0 0 0 3 3h3.421a3 3 0 0 0 3-3v-.617"
    />
    <ellipse cx={21.056} cy={32.726} stroke="#413930" rx={7.027} ry={1.735} />
    <path
      fill="#5E91FF"
      stroke="#413930"
      d="M20.244 28.06h1.625v4.547s-.38.12-.841.12-.784-.12-.784-.12z"
    />
  </svg>
);
export default SvgIcMic;

import * as React from "react";
import type { SVGProps } from "react";
const SvgIcListview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={30}
      height={5}
      x={5}
      y={6.667}
      fill="#5E91FF"
      stroke="#413930"
      rx={1}
    />
    <rect
      width={30}
      height={5}
      x={5}
      y={17.5}
      fill="#5E91FF"
      stroke="#413930"
      rx={1}
    />
    <rect
      width={30}
      height={5}
      x={5}
      y={28.333}
      fill="#5E91FF"
      stroke="#413930"
      rx={1}
    />
  </svg>
);
export default SvgIcListview;

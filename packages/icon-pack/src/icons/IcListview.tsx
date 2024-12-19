import * as React from "react";
import { SVGProps } from "react";
const SvgIcListview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={5}
      y={6.667}
      width={30}
      height={5}
      rx={1}
      fill="#5E91FF"
      stroke="#413930"
    />
    <rect
      x={5}
      y={17.5}
      width={30}
      height={5}
      rx={1}
      fill="#5E91FF"
      stroke="#413930"
    />
    <rect
      x={5}
      y={28.333}
      width={30}
      height={5}
      rx={1}
      fill="#5E91FF"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcListview;

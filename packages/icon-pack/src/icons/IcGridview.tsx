import * as React from "react";
import { SVGProps } from "react";
const SvgIcGridview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={5.5}
      y={5.5}
      width={12.333}
      height={12.333}
      rx={0.5}
      fill="#5E91FF"
      stroke="#413930"
    />
    <rect
      x={22.17}
      y={5.585}
      width={12.333}
      height={12.333}
      rx={0.5}
      transform="rotate(-.379 22.17 5.585)"
      fill="#5E91FF"
      stroke="#413930"
    />
    <rect
      x={5.5}
      y={22.167}
      width={12.333}
      height={12.333}
      rx={0.5}
      fill="#5E91FF"
      stroke="#413930"
    />
    <rect
      x={22.255}
      y={22.167}
      width={12.333}
      height={12.333}
      rx={0.5}
      fill="#5E91FF"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcGridview;

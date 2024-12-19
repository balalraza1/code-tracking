import * as React from "react";
import type { SVGProps } from "react";
const SvgIcGridview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={12.333}
      height={12.333}
      x={5.5}
      y={5.5}
      fill="#5E91FF"
      stroke="#413930"
      rx={0.5}
    />
    <rect
      width={12.333}
      height={12.333}
      x={22.17}
      y={5.585}
      fill="#5E91FF"
      stroke="#413930"
      rx={0.5}
      transform="rotate(-.379 22.17 5.585)"
    />
    <rect
      width={12.333}
      height={12.333}
      x={5.5}
      y={22.167}
      fill="#5E91FF"
      stroke="#413930"
      rx={0.5}
    />
    <rect
      width={12.333}
      height={12.333}
      x={22.255}
      y={22.167}
      fill="#5E91FF"
      stroke="#413930"
      rx={0.5}
    />
  </svg>
);
export default SvgIcGridview;

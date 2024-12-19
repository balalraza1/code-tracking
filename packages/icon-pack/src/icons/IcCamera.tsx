import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={20}
      height={18}
      x={6.5}
      y={11.5}
      fill="#5E91FF"
      stroke="#413930"
      rx={1.5}
    />
    <path
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
      d="m26.52 16 9-3v14l-9-3z"
    />
    <path
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
      d="m22 20.5-8.25 4.763v-9.526z"
    />
  </svg>
);
export default SvgIcCamera;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={6.5}
      y={11.5}
      width={20}
      height={18}
      rx={1.5}
      fill="#5E91FF"
      stroke="#413930"
    />
    <path
      d="m26.52 16 9-3v14l-9-3v-8Z"
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <path
      d="m22 20.5-8.25 4.763v-9.526L22 20.5Z"
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcCamera;

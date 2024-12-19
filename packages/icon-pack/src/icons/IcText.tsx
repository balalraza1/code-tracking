import * as React from "react";
import type { SVGProps } from "react";
const SvgIcText = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      d="M8 8h24v24H8z"
    />
    <path
      fill="#F15D22"
      d="M21.178 14.203V27H18.77V14.203zm3.972 0v1.907H14.84v-1.907z"
    />
  </svg>
);
export default SvgIcText;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcText = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      d="M8 8h24v24H8z"
    />
    <path
      d="M21.178 14.203V27h-2.409V14.203h2.409Zm3.972 0v1.907H14.84v-1.907h10.31Z"
      fill="#F15D22"
    />
  </svg>
);
export default SvgIcText;

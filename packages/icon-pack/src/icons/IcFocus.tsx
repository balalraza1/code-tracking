import * as React from "react";
import { SVGProps } from "react";
const SvgIcFocus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 8H8v6m18-6h6v6m0 12v6h-6m-12 0H8v-6"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <circle cx={20} cy={20} r={7.5} fill="#F15D22" stroke="#413930" />
  </svg>
);
export default SvgIcFocus;

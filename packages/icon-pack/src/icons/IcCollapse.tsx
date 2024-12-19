import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCollapse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13 7 18 13-18 13"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10 13 11 7-11 7"
    />
  </svg>
);
export default SvgIcCollapse;

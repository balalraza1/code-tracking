import * as React from "react";
import type { SVGProps } from "react";
const SvgIcExpand = (props: SVGProps<SVGSVGElement>) => (
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
      d="M27 7 9 20l18 13"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m30 13-11 7 11 7"
    />
  </svg>
);
export default SvgIcExpand;

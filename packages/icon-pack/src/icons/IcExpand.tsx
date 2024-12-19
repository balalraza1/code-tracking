import * as React from "react";
import { SVGProps } from "react";
const SvgIcExpand = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M27 7 9 20l18 13"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m30 13-11 7 11 7"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcExpand;

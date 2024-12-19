import * as React from "react";
import { SVGProps } from "react";
const SvgDisabled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={13.333} fill="#F2EFED" stroke="#908B85" />
  </svg>
);
export default SvgDisabled;

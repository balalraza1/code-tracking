import * as React from "react";
import type { SVGProps } from "react";
const SvgSelectedRadio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={13.333} fill="#F2EFED" stroke="#908B85" />
    <circle cx={20} cy={20} r={13.333} fill="#5E91FF" stroke="#534C44" />
    <circle cx={20} cy={20} r={5} fill="#F2EFED" />
  </svg>
);
export default SvgSelectedRadio;

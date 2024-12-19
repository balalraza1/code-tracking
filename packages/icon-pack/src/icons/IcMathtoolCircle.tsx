import * as React from "react";
import { SVGProps } from "react";
const SvgIcMathtoolCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={12.5} stroke="#413930" />
    <circle cx={29} cy={11} r={2} fill="#5E91FF" stroke="#413930" />
    <circle cx={20} cy={20} r={3} fill="#F15D22" stroke="#413930" />
  </svg>
);
export default SvgIcMathtoolCircle;

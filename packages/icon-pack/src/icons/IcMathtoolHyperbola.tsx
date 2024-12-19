import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolHyperbola = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={2} fill="#F15D22" stroke="#413930" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M8 11s4.016 17 11.5 17S31 11 31 11M8 31h23"
    />
  </svg>
);
export default SvgIcMathtoolHyperbola;

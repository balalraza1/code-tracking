import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolParabola = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={12} cy={19} r={2} fill="#F15D22" stroke="#413930" />
    <circle cx={28} cy={19} r={2} fill="#F15D22" stroke="#413930" />
    <circle cx={28} cy={19} r={2} fill="#F15D22" stroke="#413930" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M13 6s5 4.714 5 13.5S13 33 13 33M27 6s-5 4.714-5 13.5S27 33 27 33"
    />
  </svg>
);
export default SvgIcMathtoolParabola;

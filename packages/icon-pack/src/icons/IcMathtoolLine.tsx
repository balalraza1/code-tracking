import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={17} fill="#F2EFED" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m29.899 11.1-19.8 19.8"
    />
    <circle
      cx={15.05}
      cy={25.95}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 15.05 25.95)"
    />
    <circle
      cx={24.949}
      cy={16.05}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 24.95 16.05)"
    />
  </svg>
);
export default SvgIcMathtoolLine;

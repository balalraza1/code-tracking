import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolSegment = (props: SVGProps<SVGSVGElement>) => (
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
      d="M29.9 10 10.1 29.799"
    />
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M12.243 27.414a2 2 0 1 1-2.828 2.829 2 2 0 0 1 2.828-2.829Z"
    />
    <circle
      cx={28.828}
      cy={10.828}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 28.828 10.828)"
    />
  </svg>
);
export default SvgIcMathtoolSegment;

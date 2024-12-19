import * as React from "react";
import { SVGProps } from "react";
const SvgIcMathtoolVector = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m29.799 10-4.5 4.5L9.999 29.8"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 15.793h4v4" stroke="#413930" strokeLinecap="round" />
    <path
      d="M12.243 27.414a2 2 0 1 1-2.828 2.829 2 2 0 0 1 2.828-2.829Z"
      fill="#F15D22"
      stroke="#413930"
    />
    <circle
      cx={28.828}
      cy={10.828}
      r={2}
      transform="rotate(-45 28.828 10.828)"
      fill="#F15D22"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcMathtoolVector;

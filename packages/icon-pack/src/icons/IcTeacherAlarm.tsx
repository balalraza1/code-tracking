import * as React from "react";
import type { SVGProps } from "react";
const SvgIcTeacherAlarm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M33.057 15.19a6.5 6.5 0 0 1-.758 1.897l-5.293-3.74-5.294-3.738a6.5 6.5 0 0 1 11.345 5.58ZM7.416 15.19a6.5 6.5 0 0 0 .758 1.897l5.294-3.74L18.76 9.61a6.5 6.5 0 0 0-11.345 5.58Z"
    />
    <circle cx={20} cy={21} r={12.5} fill="#F2EFED" stroke="#413930" />
    <circle cx={20} cy={21} r={9.928} fill="#F2EFED" stroke="#413930" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="m11.817 35.647 2-3.464M28.683 35.647l-2-3.464"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.612 14.274v7L24.53 25.6"
    />
  </svg>
);
export default SvgIcTeacherAlarm;

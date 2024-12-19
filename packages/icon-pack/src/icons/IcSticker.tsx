import * as React from "react";
import { SVGProps } from "react";
const SvgIcSticker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.64 11.096 15.32-4.105a3.5 3.5 0 0 1 4.287 2.475l2.14 7.985a3.5 3.5 0 0 1-.382 2.71l-5.633 9.371a3.5 3.5 0 0 1-2.094 1.578l-7.722 2.069a3.5 3.5 0 0 1-4.287-2.475L8.165 15.383a3.5 3.5 0 0 1 2.475-4.287Z"
      fill="#5E91FF"
      stroke="#413930"
    />
    <circle
      cx={14.576}
      cy={17.089}
      r={1.903}
      transform="rotate(-15 14.576 17.089)"
      fill="#5E91FF"
    />
    <circle
      cx={25.547}
      cy={14.149}
      r={1.903}
      transform="rotate(-15 25.547 14.15)"
      fill="#5E91FF"
    />
    <path
      d="M17.03 22.816s1.985 3.872 5.729 2.87c3.744-1.004 3.526-5.35 3.526-5.35"
      stroke="#413930"
      strokeLinecap="round"
    />
    <path
      d="m25.48 29.661-2.018-7.533a.5.5 0 0 1 .353-.613l7.534-2.018a.5.5 0 0 1 .562.733l-2.758 4.776-2.757 4.776a.5.5 0 0 1-.916-.12Z"
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcSticker;

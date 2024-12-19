import * as React from "react";
import { SVGProps } from "react";
const SvgIcCrown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m8 18 2 14s4 2.5 10.5 2.5S30 32 30 32l2-14-4.5 4.5-7-11.5-7 11.5L8 18Z"
      fill="#FAB82B"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx={20.5} cy={7.5} r={2} fill="#FAB82B" stroke="#413930" />
    <circle cx={32.5} cy={14.5} r={2} fill="#FAB82B" stroke="#413930" />
    <circle cx={7.5} cy={14.5} r={2} fill="#FAB82B" stroke="#413930" />
    <path
      d="M20.105 25.322a.5.5 0 0 1 .79 0l2.233 2.871a.5.5 0 0 1 0 .614l-2.233 2.871a.5.5 0 0 1-.79 0l-2.233-2.871-.395.307.395-.307a.5.5 0 0 1 0-.614l2.233-2.871Z"
      fill="#5E91FF"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcCrown;

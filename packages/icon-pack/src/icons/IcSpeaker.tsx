import * as React from "react";
import { SVGProps } from "react";
const SvgIcSpeaker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.5 20c0-2.75.349-5.02.56-6.139a.451.451 0 0 1 .454-.361H13a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H7.514a.451.451 0 0 1-.455-.361A34.16 34.16 0 0 1 6.5 20Z"
      fill="#5E91FF"
      stroke="#413930"
    />
    <path
      d="M11.5 20c0-3.852.601-6.204.855-7.024a.4.4 0 0 1 .212-.235l9.568-4.753a.452.452 0 0 1 .657.298C23.22 10.261 24 14.592 24 20s-.78 9.74-1.208 11.714a.452.452 0 0 1-.657.298l-9.568-4.753-.223.447.223-.447a.4.4 0 0 1-.212-.236c-.254-.82-.855-3.171-.855-7.023Z"
      fill="#FAB82B"
      stroke="#413930"
    />
    <path
      d="M26 9c4.646 1.522 8.5 5.871 8.5 11s-3.854 9.478-8.5 11"
      stroke="#413930"
      strokeLinecap="round"
    />
    <path
      d="M25.809 16.082a4.001 4.001 0 0 1 0 7.836"
      stroke="#413930"
      strokeLinecap="round"
    />
  </svg>
);
export default SvgIcSpeaker;

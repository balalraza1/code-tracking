import * as React from "react";
import type { SVGProps } from "react";
const SvgIcPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <g clipPath="url(#ic_pencil_svg__a)">
      <path fill="#F2EFED" d="M11.5 48.5v-12h16v12z" />
      <path
        fill="#F2EFED"
        d="M13 37c-.718 0-1-1-1.5-1l8-19 8 19c-.51 0-.694 1-1.5 1-.605 0-1.587-1-2.308-1-.636 0-1.307 1-2 1-.652 0-1.323-1-2-1-.665 0-1.335 1-2 1-.677 0-1.348-1-2-1C15 36 13.637 37 13 37"
      />
      <path
        stroke="#534C44"
        d="M11.5 35.505q0-.15.06-.286l7.293-16.516a.707.707 0 0 1 1.294 0l7.293 16.516q.06.136.06.286v12.288c0 .39-.317.707-.707.707H12.207a.707.707 0 0 1-.707-.707z"
      />
      <path fill="#534C44" d="M19.5 16 17 22h5z" />
      <path
        stroke="#534C44"
        strokeLinecap="square"
        strokeLinejoin="round"
        d="M11.5 36c.5 0 .782 1 1.5 1 .637 0 2-1 2.692-1 .652 0 1.323 1 2 1 .665 0 1.335-1 2-1 .677 0 1.348 1 2 1 .693 0 1.364-1 2-1 .72 0 1.703 1 2.308 1 .806 0 .99-1 1.5-1"
      />
    </g>
    <defs>
      <clipPath id="ic_pencil_svg__a">
        <path fill="currentColor" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcPencil;

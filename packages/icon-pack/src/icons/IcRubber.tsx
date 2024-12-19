import * as React from "react";
import { SVGProps } from "react";
const SvgIcRubber = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#ic_rubber_svg__a)">
      <path
        d="M10.5 17.207c0-.39.317-.707.707-.707H24.01c.13 0 .256.035.367.102l6.783 4.113c.21.128.34.358.34.605v22.473c0 .39-.317.707-.707.707H11.207a.707.707 0 0 1-.707-.707V17.207Z"
        fill="#F2EFED"
        stroke="#534C44"
      />
      <path
        d="M9.5 28.207c0-.39.317-.707.707-.707h21.586c.39 0 .707.317.707.707v19.586c0 .39-.317.707-.707.707H10.207a.707.707 0 0 1-.707-.707V28.207Z"
        fill="#F15D22"
        stroke="#534C44"
      />
      <path d="M10 38.5h22v7H10v-7ZM10 36h22v1.5H10V36Z" fill="#F15D22" />
    </g>
    <defs>
      <clipPath id="ic_rubber_svg__a">
        <path fill="currentColor" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcRubber;

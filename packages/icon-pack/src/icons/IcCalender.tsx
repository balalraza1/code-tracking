import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCalender = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="#F15D22" d="M8.017 11.407h23.966v5.083H8.017z" />
    <path fill="#F2EFED" d="M8.017 15.966h23.966v14.09H8.017z" />
    <rect
      width={24.178}
      height={19.249}
      x={7.911}
      y={11.021}
      stroke="#413930"
      rx={0.5}
    />
    <path stroke="#413930" d="M7.568 15.991h25.021" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M13.971 9.73v3.355M26.308 9.73v3.355"
    />
    <path
      fill="#F15D22"
      d="M11.529 19.988h17.099v2.095H11.529zM11.529 23.938h17.099v2.095H11.529z"
    />
  </svg>
);
export default SvgIcCalender;

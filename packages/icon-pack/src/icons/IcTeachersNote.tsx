import * as React from "react";
import type { SVGProps } from "react";
const SvgIcTeachersNote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={19.773} cy={19.773} r={13.5} fill="#F15D22" stroke="#413930" />
    <path
      fill="#F2EFED"
      stroke="#413930"
      d="M25.773 11.773h-12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.676c.215 0 .43-.03.623-.126 1.619-.805 4.701-3.998 4.701-4.374v-9.5a2 2 0 0 0-2-2Z"
    />
    <path fill="#413930" d="M22.773 22.773v5l3-2.5 2-2.5z" />
    <path
      stroke="#413930"
      d="M14.773 16.273h10M14.773 19.273h10M14.773 22.273h5"
    />
    <path
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
      d="m13.773 20 1.132 1.943 2.197.475-1.498 1.677.226 2.237-2.057-.907-2.057.907.226-2.237-1.498-1.677 2.198-.475z"
    />
    <circle cx={11} cy={8} r={3} fill="#F15D22" />
  </svg>
);
export default SvgIcTeachersNote;

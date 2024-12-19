import * as React from "react";
import type { SVGProps } from "react";
const SvgIcTeacherChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      d="M17 27.5a.5.5 0 0 0-.447.276l-1.106 2.212a.5.5 0 0 1-.894 0l-1.106-2.212A.5.5 0 0 0 13 27.5h-3A3.5 3.5 0 0 1 6.5 24V12A3.5 3.5 0 0 1 10 8.5h19a3.5 3.5 0 0 1 3.5 3.5v12a3.5 3.5 0 0 1-3.5 3.5z"
    />
    <circle cx={13} cy={18} r={1.5} fill="#F15D22" stroke="#413930" />
    <circle cx={19} cy={18} r={1.5} fill="#F15D22" stroke="#413930" />
    <circle cx={25} cy={18} r={1.5} fill="#F15D22" stroke="#413930" />
  </svg>
);
export default SvgIcTeacherChat;

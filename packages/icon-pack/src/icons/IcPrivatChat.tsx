import * as React from "react";
import type { SVGProps } from "react";
const SvgIcPrivatChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={13.845} r={6.648} fill="#F15D22" stroke="#413930" />
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M27.838 25.465c1.96 1.96 3.11 4.58 3.235 7.338H8.927a11.085 11.085 0 0 1 18.911-7.338Z"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M16.21 13.787c0 .471 1.221 2.492 3.765 2.492 2.034 0 3.814-1.547 3.814-2.492"
    />
  </svg>
);
export default SvgIcPrivatChat;

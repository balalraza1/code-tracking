import * as React from "react";
import type { SVGProps } from "react";
const SvgIcDuplicate = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      d="M11.667 8h20v20h-20z"
    />
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
      d="M6.667 13.333h20v20h-20z"
    />
    <path
      fill="#413930"
      d="M19.567 22.99v1.272h-5.848v-1.271zm-2.238-2.39v6.211h-1.366v-6.21z"
    />
  </svg>
);
export default SvgIcDuplicate;

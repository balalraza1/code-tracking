import * as React from "react";
import type { SVGProps } from "react";
const SvgIcStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#FAB82B"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.354 5.605c-.88.512-1.826 8.965-1.944 11.199L5.576 21.562l11.77 3.14 4.14 10.512 3.549-11.45 9.468-6.006s-9.471-1.973-9.723-1.986c-1.27-.067-5.236-10.86-6.426-10.167"
    />
  </svg>
);
export default SvgIcStar;

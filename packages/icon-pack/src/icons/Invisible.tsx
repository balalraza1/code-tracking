import * as React from "react";
import type { SVGProps } from "react";
const SvgInvisible = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 13.333c5 10.834 20 10.834 25 0m-4.473 5.53L32.5 25M20 21.458V27.5m-8.027-8.637L7.5 25"
    />
  </svg>
);
export default SvgInvisible;

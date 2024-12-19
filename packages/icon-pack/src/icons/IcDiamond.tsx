import * as React from "react";
import type { SVGProps } from "react";
const SvgIcDiamond = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="#5E91FF" d="M20 32 7.077 14.416 13.538 8h12.924l6.461 6.416z" />
    <path
      stroke="#413930"
      d="M7.077 14.416 20 32l12.923-17.584m-25.846 0h25.846m-25.846 0L13.538 8h12.924l6.461 6.416"
    />
    <path
      stroke="#413930"
      strokeLinejoin="round"
      d="m13.538 8 1.846 6.461M20 8l-4.616 6.461M20 8l4.616 6.461M26.461 8l-1.846 6.461M15.385 14.462 20 32M24.616 14.462 20 32"
    />
  </svg>
);
export default SvgIcDiamond;

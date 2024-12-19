import * as React from "react";
import { SVGProps } from "react";
const SvgIcGames = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      d="M5.5 7.5h11v11h-11zM5.5 23.5h11v11h-11zM21.5 23.5h11v11h-11z"
    />
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M27 5.222 34.778 13 27 20.778 19.222 13z"
    />
  </svg>
);
export default SvgIcGames;

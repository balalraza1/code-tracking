import * as React from "react";
import type { SVGProps } from "react";
const SvgIcSmiley = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={13.273} fill="#FAB82B" stroke="#413930" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M11.982 19c0 1.07 2.771 5.658 8.545 5.658 4.618 0 8.66-3.512 8.66-5.658M17.972 13.39c.08.23.17.43.276.643M23.163 13.024l.368.826"
    />
  </svg>
);
export default SvgIcSmiley;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcSmiley = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={13.273} fill="#FAB82B" stroke="#413930" />
    <path
      d="M11.982 19c0 1.07 2.771 5.658 8.544 5.658 4.62 0 8.66-3.512 8.66-5.658M17.972 13.39c.08.23.17.43.276.643M23.163 13.024l.368.826"
      stroke="#413930"
      strokeLinecap="round"
    />
  </svg>
);
export default SvgIcSmiley;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12.289 10.319 15.193 8.944M12.519 12.867v15.986M27.482 20.374 12.83 28.703"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx={12.518} cy={10.519} r={3.772} fill="#5E91FF" stroke="#413930" />
    <circle cx={28.482} cy={19.858} r={3.772} fill="#5E91FF" stroke="#413930" />
    <circle cx={12.518} cy={28.133} r={3.772} fill="#5E91FF" stroke="#413930" />
  </svg>
);
export default SvgIcShare;

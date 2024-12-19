import * as React from "react";
import { SVGProps } from "react";
const SvgIcZoom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 11.667v16.666M28.333 20H11.667"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcZoom;

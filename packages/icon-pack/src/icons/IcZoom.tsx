import * as React from "react";
import type { SVGProps } from "react";
const SvgIcZoom = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20 11.667v16.666M28.333 20H11.667"
    />
  </svg>
);
export default SvgIcZoom;

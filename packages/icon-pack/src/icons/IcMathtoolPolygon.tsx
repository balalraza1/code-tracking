import * as React from "react";
import { SVGProps } from "react";
const SvgIcMathtoolPolygon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.34 26 20 11l8.66 15H11.34Z" fill="#F2EFED" stroke="#413930" />
    <circle
      cx={19.828}
      cy={10.828}
      r={2}
      transform="rotate(-45 19.828 10.828)"
      fill="#F15D22"
      stroke="#413930"
    />
    <circle
      cx={9.828}
      cy={26.828}
      r={2}
      transform="rotate(-45 9.828 26.828)"
      fill="#F15D22"
      stroke="#413930"
    />
    <circle
      cx={29.828}
      cy={26.828}
      r={2}
      transform="rotate(-45 29.828 26.828)"
      fill="#F15D22"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcMathtoolPolygon;

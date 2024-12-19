import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolPolygon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="#F2EFED" stroke="#413930" d="M11.34 26 20 11l8.66 15z" />
    <circle
      cx={19.828}
      cy={10.828}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 19.828 10.828)"
    />
    <circle
      cx={9.828}
      cy={26.828}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 9.828 26.828)"
    />
    <circle
      cx={29.828}
      cy={26.828}
      r={2}
      fill="#F15D22"
      stroke="#413930"
      transform="rotate(-45 29.828 26.828)"
    />
  </svg>
);
export default SvgIcMathtoolPolygon;

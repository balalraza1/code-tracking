import * as React from "react";
import type { SVGProps } from "react";
const SvgDisabled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={39}
      height={39}
      x={0.5}
      y={0.5}
      fill="#F2EFED"
      stroke="#E5E1DE"
      rx={7.5}
    />
  </svg>
);
export default SvgDisabled;

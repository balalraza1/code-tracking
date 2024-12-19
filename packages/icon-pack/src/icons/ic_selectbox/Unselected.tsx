import * as React from "react";
import { SVGProps } from "react";
const SvgUnselected = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      y={0.5}
      width={39}
      height={39}
      rx={7.5}
      fill="#F2EFED"
      stroke="#413930"
    />
  </svg>
);
export default SvgUnselected;

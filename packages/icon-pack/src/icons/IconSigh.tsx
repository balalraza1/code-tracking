import * as React from "react";
import type { SVGProps } from "react";
const SvgIconSigh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle
      cx={19.773}
      cy={19.773}
      r={13.273}
      fill="#FAB82B"
      stroke="#413930"
    />
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinecap="round"
      d="m21 26 1.5 2.5c-.667.667-1.8 2.4-1 4 1 2 5 2 6.5-1 1.46-2.92-2.167-4.667-4-4L23 25z"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M10.983 17.584c1.826-.038 2.962-.49 3.932-2.033.368-.585.411-1.162.411-1.827M28.343 17.584c-1.826-.038-2.962-.49-3.932-2.033-.368-.585-.41-1.162-.41-1.827"
    />
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M22.5 21.5c0 1.023-1.03 2-2.5 2s-2.5-.977-2.5-2 1.03-2 2.5-2 2.5.977 2.5 2Z"
    />
  </svg>
);
export default SvgIconSigh;

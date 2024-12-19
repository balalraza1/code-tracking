import * as React from "react";
import type { SVGProps } from "react";
const SvgIcDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={23.385}
      height={23.385}
      x={8.308}
      y={8.308}
      fill="#5E91FF"
      stroke="#413930"
      rx={1}
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 11.872v13.65m0 0-4.485-4.485M20 25.522l4.485-4.485M11.992 27.12h16.016"
    />
  </svg>
);
export default SvgIcDownload;

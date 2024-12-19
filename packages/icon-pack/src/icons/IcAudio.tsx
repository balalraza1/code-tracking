import * as React from "react";
import type { SVGProps } from "react";
const SvgIcAudio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect
      width={3}
      height={14}
      x={15.5}
      y={13.5}
      fill="#F2EFED"
      stroke="#413930"
      rx={1.5}
    />
    <rect
      width={3}
      height={6}
      x={9.5}
      y={17.5}
      fill="#F2EFED"
      stroke="#413930"
      rx={1.5}
    />
    <rect width={4} height={23} x={21} y={9} fill="#5E91FF" rx={2} />
    <rect
      width={3}
      height={10}
      x={27.5}
      y={13.5}
      fill="#F2EFED"
      stroke="#413930"
      rx={1.5}
    />
  </svg>
);
export default SvgIcAudio;

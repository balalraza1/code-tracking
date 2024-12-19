import * as React from "react";
import { SVGProps } from "react";
const SvgIcAudio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={15.5}
      y={13.5}
      width={3}
      height={14}
      rx={1.5}
      fill="#F2EFED"
      stroke="#413930"
    />
    <rect
      x={9.5}
      y={17.5}
      width={3}
      height={6}
      rx={1.5}
      fill="#F2EFED"
      stroke="#413930"
    />
    <rect x={21} y={9} width={4} height={23} rx={2} fill="#5E91FF" />
    <rect
      x={27.5}
      y={13.5}
      width={3}
      height={10}
      rx={1.5}
      fill="#F2EFED"
      stroke="#413930"
    />
  </svg>
);
export default SvgIcAudio;

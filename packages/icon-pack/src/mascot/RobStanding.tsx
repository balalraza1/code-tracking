import * as React from "react";
import { SVGProps } from "react";
const SvgRobStanding = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="120px"
    height="120px"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.304}
      d="M47.041 74.806h4.476v18.428h-4.476zM70.226 74.806h4.476v18.428h-4.476z"
    />
    <rect
      x={37.78}
      y={48.566}
      width={46.183}
      height={32.728}
      rx={16.364}
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <rect
      x={22.894}
      y={22.367}
      width={73.745}
      height={51.095}
      rx={25.547}
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <rect
      x={38.635}
      y={29.722}
      width={49.017}
      height={20.9}
      rx={10.45}
      fill="#F15D22"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <circle
      cx={50.436}
      cy={39.398}
      r={4.781}
      fill="#413930"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <circle
      cx={77.375}
      cy={39.398}
      r={4.781}
      fill="#413930"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <circle
      cx={61.558}
      cy={13.199}
      r={4.781}
      fill="#413930"
      stroke="#413930"
      strokeWidth={1.304}
    />
    <mask id="rob_standing_svg__a" fill="currentColor">
      <path d="M60.871 101.012a11.593 11.593 0 1 0-23.185 0H60.871Z" />
    </mask>
    <path
      d="M60.871 101.012a11.593 11.593 0 1 0-23.185 0H60.871Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={2.609}
      mask="url(#rob_standing_svg__a)"
    />
    <mask id="rob_standing_svg__b" fill="currentColor">
      <path d="M84.057 101.012a11.593 11.593 0 1 0-23.185 0H84.057Z" />
    </mask>
    <path
      d="M84.057 101.012a11.593 11.593 0 1 0-23.185 0H84.057Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={2.609}
      mask="url(#rob_standing_svg__b)"
    />
    <path stroke="#413930" strokeWidth={1.304} d="M61.524 13.474v9.623" />
  </svg>
);
export default SvgRobStanding;

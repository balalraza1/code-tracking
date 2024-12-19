import * as React from "react";
import { SVGProps } from "react";
const SvgRobSitting = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.24}
      d="M70.677 90.508v-4.254H88.19v4.254z"
    />
    <mask id="rob_sitting_svg__a" fill="currentColor">
      <path d="M90.992 77.364a11.018 11.018 0 0 0 0 22.034V77.364Z" />
    </mask>
    <path
      d="M90.992 77.364a11.018 11.018 0 0 0 0 22.034V77.364Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={2.479}
      mask="url(#rob_sitting_svg__a)"
    />
    <rect
      x={31.008}
      y={64.348}
      width={43.89}
      height={31.103}
      rx={15.551}
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.24}
    />
    <path
      d="M18.61 48.577c0-13.41 10.87-24.28 24.28-24.28h21.525c6.962 0 13.238 2.93 17.666 7.624a24.193 24.193 0 0 1 6.613 16.656c0 13.408-10.87 24.278-24.279 24.278H42.89c-13.41 0-24.28-10.87-24.28-24.279Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.24}
    />
    <mask
      id="rob_sitting_svg__b"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={17}
      y={23}
      width={73}
      height={51}
    >
      <rect
        x={18.611}
        y={24.298}
        width={70.083}
        height={48.557}
        rx={24.279}
        fill="#D9D9D9"
        stroke="#212638"
        strokeWidth={1.24}
      />
    </mask>
    <g mask="url(#rob_sitting_svg__b)">
      <rect
        x={54.562}
        y={30.876}
        width={38.43}
        height={19.835}
        rx={9.917}
        fill="#F15D22"
        stroke="#413930"
        strokeWidth={1.24}
      />
    </g>
    <circle
      cx={70.386}
      cy={40.483}
      r={4.544}
      fill="#413930"
      stroke="#413930"
      strokeWidth={1.24}
    />
    <circle
      cx={55.355}
      cy={15.585}
      r={4.544}
      fill="#413930"
      stroke="#413930"
      strokeWidth={1.24}
    />
    <path d="M55.322 15.846v8.212" stroke="#413930" strokeWidth={1.24} />
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={1.24}
      d="M59.52 90.508v-4.254h17.513v4.254z"
    />
    <mask id="rob_sitting_svg__c" fill="currentColor">
      <path d="M84.424 77.364a11.019 11.019 0 0 0-7.79 18.807 11.016 11.016 0 0 0 7.79 3.227V77.364Z" />
    </mask>
    <path
      d="M84.424 77.364a11.019 11.019 0 0 0-7.79 18.807 11.016 11.016 0 0 0 7.79 3.227V77.364Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeWidth={2.479}
      mask="url(#rob_sitting_svg__c)"
    />
  </svg>
);
export default SvgRobSitting;

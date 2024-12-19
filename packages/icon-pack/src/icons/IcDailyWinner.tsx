import * as React from "react";
import type { SVGProps } from "react";
const SvgIcDailyWinner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={13.5} fill="#FAB82B" stroke="#413930" />
    <path
      fill="#5E91FF"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.818 23.33c-1.342-.67 3.5-2.5 4.5-3l4.5 4.5-7 3.5 1-3.5zM29.585 23.33c1.341-.67-3.5-2.5-4.5-3l-4.5 4.5 7 3.5-1-3.5z"
    />
    <path
      fill="#F2EFED"
      stroke="#413930"
      d="m15.212 12.787-.288-.409.288.41a1.5 1.5 0 0 0 .352-.348l1.582-2.188a.5.5 0 0 1 .491-.2l2.66.461q.247.043.495.003l-.08-.493.08.493 2.666-.428a.5.5 0 0 1 .488.206l1.556 2.207q.144.205.347.352l2.188 1.582a.5.5 0 0 1 .2.491l-.461 2.66a1.5 1.5 0 0 0-.003.495l.428 2.666a.5.5 0 0 1-.206.488l-2.207 1.556a1.5 1.5 0 0 0-.352.347l-1.583 2.188a.5.5 0 0 1-.49.2l-2.661-.461a1.5 1.5 0 0 0-.494-.003l-2.666.428a.5.5 0 0 1-.488-.206l-1.556-2.207a1.5 1.5 0 0 0-.347-.352l-2.188-1.583a.5.5 0 0 1-.2-.49l.461-2.661a1.5 1.5 0 0 0 .003-.494l-.428-2.666a.5.5 0 0 1 .206-.488z"
    />
    <path
      fill="#FAB82B"
      stroke="#413930"
      strokeLinejoin="round"
      d="m20.5 14 1.293 2.22 2.511.544-1.712 1.916.26 2.556L20.5 20.2l-2.351 1.036.259-2.556-1.712-1.916 2.51-.544z"
    />
    <circle cx={11} cy={8} r={3} fill="#F15D22" />
  </svg>
);
export default SvgIcDailyWinner;

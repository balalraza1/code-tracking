import * as React from "react";
import type { SVGProps } from "react";
const SvgUnreadNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F2EFED"
      stroke="#413930"
      d="M29.5 26.25v.207l.146.147 3.187 3.186v.96H7.167v-.96l3.187-3.186.146-.147v-8.54c0-4.96 2.609-8.98 7.115-10.047L18 7.779V6.25c0-1.107.893-2 2-2s2 .893 2 2v1.528l.384.092c4.49 1.067 7.116 5.105 7.116 10.047zm-6.711 7.167A2.846 2.846 0 0 1 20 35.75a2.83 2.83 0 0 1-2.79-2.333z"
    />
    <circle cx={12.5} cy={14.167} r={6.333} fill="#F15D22" stroke="#F2EFED" />
  </svg>
);
export default SvgUnreadNotification;

import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolPoint = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={13} cy={26} r={3} fill="#F15D22" stroke="#413930" />
    <circle cx={23.5} cy={12.5} r={7} fill="#F2EFED" stroke="#413930" />
    <path
      fill="#413930"
      d="M23.676 9.838 21.552 16h-1.284l2.675-7.11h.82zM25.453 16l-2.129-6.162-.093-.947h.826L26.742 16zm-.102-2.637v.972h-3.868v-.972z"
    />
  </svg>
);
export default SvgIcMathtoolPoint;

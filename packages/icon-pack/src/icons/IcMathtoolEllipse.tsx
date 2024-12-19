import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMathtoolEllipse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#413930"
      d="M20 5.5c2.542 0 4.905 1.546 6.655 4.17C28.403 12.293 29.5 15.944 29.5 20s-1.097 7.708-2.845 10.33c-1.75 2.624-4.113 4.17-6.655 4.17s-4.905-1.546-6.655-4.17C11.597 27.707 10.5 24.056 10.5 20s1.097-7.708 2.845-10.33C15.095 7.047 17.458 5.5 20 5.5Z"
    />
    <circle cx={20} cy={28} r={2} fill="#F15D22" stroke="#413930" />
    <circle cx={20} cy={12} r={2} fill="#F15D22" stroke="#413930" />
    <circle cx={11} cy={21} r={2} fill="#5E91FF" stroke="#413930" />
  </svg>
);
export default SvgIcMathtoolEllipse;

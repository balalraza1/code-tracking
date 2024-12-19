import * as React from "react";
import type { SVGProps } from "react";
const SvgIcCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={12.343} fill="#5E91FF" stroke="#413930" />
    <path
      fill="#F2EFED"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M26.272 13.141c-2.024.9-7.357 5.286-9.325 8.997-.685-1.028-3.022-4.36-3.474-4.407s-1.825 2.462-1.717 2.967c.136.631 5.149 7.973 5.973 6.856 1.718-2.328 2.254-5.866 8.543-10.444 1.542-1.122 2.643-1.795 2.643-1.795z"
    />
  </svg>
);
export default SvgIcCheck;

import * as React from "react";
import { SVGProps } from "react";
const SvgIcSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={16.649} cy={17.713} r={9.649} fill="#5E91FF" stroke="#413930" />
    <path
      d="m30.745 32.936-6.202-6.766 1.127-1.128L33 30.117l-2.255 2.82Z"
      fill="#F2EFED"
      stroke="#413930"
      strokeLinejoin="round"
    />
    <path
      d="M24.384 16.493c-1.43-5.318-5.5-6.343-7.811-6.168a.539.539 0 0 0-.488.55c0 .341.296.607.637.601 4.18-.062 6.061 3.185 6.594 5.23a.58.58 0 0 0 .553.443.525.525 0 0 0 .515-.656Z"
      fill="#413930"
    />
  </svg>
);
export default SvgIcSearch;

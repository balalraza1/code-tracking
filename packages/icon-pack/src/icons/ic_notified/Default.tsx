import * as React from "react";
import { SVGProps } from "react";
const SvgDefault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.5 26.25v.207l.146.147 3.187 3.186v.96H7.167v-.96l3.187-3.186.146-.147V17.917c0-4.96 2.609-8.98 7.115-10.047L18 7.779V6.25c0-1.107.893-2 2-2s2 .893 2 2v1.528l.384.092c4.49 1.067 7.116 5.105 7.116 10.047v8.333Zm-6.711 7.167A2.846 2.846 0 0 1 20 35.75a2.833 2.833 0 0 1-2.79-2.333h5.579Z"
      fill="#F2EFED"
      stroke="#413930"
    />
  </svg>
);
export default SvgDefault;

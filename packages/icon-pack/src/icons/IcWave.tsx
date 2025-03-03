import * as React from "react";
import type { SVGProps } from "react";
const SvgIcWave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#5E91FF"
      stroke="#413930"
      strokeLinejoin="round"
      d="M23.634 12.378c-.911.256-1.423 1.24-1.15 2.146l1.066 3.522-2.476-7.02c-.274-.906-1.245-1.44-2.145-1.15a1.69 1.69 0 0 0-1.096 2.096l1.84 7.247-2.63-8.693c-.274-.906-1.245-1.44-2.146-1.15a1.69 1.69 0 0 0-1.095 2.095l2.639 8.726-2.464-6.98c-.274-.906-1.245-1.44-2.146-1.15a1.69 1.69 0 0 0-1.095 2.095l2.883 9.533-1.81-1.371a1.688 1.688 0 0 0-2.039 2.691l7.184 5.442c2.33 1.764 5.035 2.76 8.104 1.525 4.248-1.708 3.554-8.863 2.486-12.394l-1.837-6.074a1.69 1.69 0 0 0-2.073-1.136Z"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M27.26 8.426s1.677.046 2.969 2.158.568 3.626.568 3.626M26.55 10.961s.851.024 1.507 1.096.289 1.841.289 1.841"
    />
  </svg>
);
export default SvgIcWave;

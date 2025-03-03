import * as React from "react";
import type { SVGProps } from "react";
const SvgIcGroupchat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={23.574} cy={13.845} r={6.648} fill="#5E91FF" stroke="#413930" />
    <path
      fill="#5E91FF"
      stroke="#413930"
      d="M31.412 25.465c1.96 1.96 3.111 4.58 3.236 7.338H12.5a11.085 11.085 0 0 1 18.911-7.338Z"
    />
    <circle cx={16.426} cy={13.845} r={6.648} fill="#5E91FF" stroke="#413930" />
    <path
      fill="#5E91FF"
      stroke="#413930"
      d="M24.264 25.465c1.96 1.96 3.11 4.58 3.235 7.338H5.353a11.085 11.085 0 0 1 18.91-7.338Z"
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M12.637 13.787c0 .471 1.22 2.492 3.763 2.492 2.035 0 3.815-1.547 3.815-2.492"
    />
  </svg>
);
export default SvgIcGroupchat;

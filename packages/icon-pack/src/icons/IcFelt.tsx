import * as React from "react";
import { SVGProps } from "react";
const SvgIcFelt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#ic_felt_svg__a)">
      <path
        d="m15.647 29.401.025-.075V23.508a.5.5 0 0 1 .5-.5h7.656a.5.5 0 0 1 .5.5V29.326l.024.075 4.769 14.651c.023.07.035.145.035.219v19.791c0 .39-.317.707-.707.707H11.55a.707.707 0 0 1-.707-.707V44.271c0-.074.012-.148.035-.219l4.768-14.65Z"
        fill="#F2EFED"
        stroke="#534C44"
      />
      <path
        d="m18.02 17.116-.779 5.392h5.518l-.78-5.392c-.33-2.286-3.628-2.286-3.958 0Z"
        fill="#534C44"
      />
    </g>
    <defs>
      <clipPath id="ic_felt_svg__a">
        <path fill="currentColor" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcFelt;

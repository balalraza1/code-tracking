import * as React from "react";
import { SVGProps } from "react";
const SvgIcMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.555 12.86-2.748 2.747 4.123 7.532 9.368 9.367 6.36-6.36-9.368-9.367-7.735-3.92Z"
      fill="#F2EFED"
    />
    <path
      fill="#FAB82B"
      d="m21.634 29.15 6.809-6.808 5.214 5.215-6.808 6.808zM13.826 11.07l-3.204 3.204 2.535 2.536 3.205-3.205-2.536-2.535ZM7.838 9.685l2.348 4.006 2.799-2.799-4.007-2.348c-.74-.433-1.574.4-1.14 1.14Z"
    />
    <path
      d="m13.018 17.131 1.749 4.862L27.243 34.47l6.406-6.406-12.476-12.476-4.751-1.86m-3.404 3.404 3.404-3.404m-3.404 3.404-2.953-2.952 1.703-1.702 1.702-1.702 2.952 2.952"
      stroke="#413930"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgIcMarker;

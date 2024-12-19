import * as React from "react";
import type { SVGProps } from "react";
const SvgIcReadyFace = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20.5} cy={22.137} r={13} fill="#FAB82B" stroke="#413930" />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M12.4 22.761c.082 1.224 3.213 6.278 8.999 5.887 4.628-.312 8.407-4.599 8.242-7.051"
    />
    <path
      fill="#5E91FF"
      stroke="#413930"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.25 4.462c-.429-.046-1.323 2.211-1.42 3.106l-3.452 1.801 3.643 1.478 2.337 3.51.942-3.7 3.51-2.338c-1.055-.295-3.271-.895-3.7-.941-.537-.058-1.323-2.858-1.86-2.916"
    />
    <ellipse
      cx={11.118}
      cy={18.421}
      fill="#F15D22"
      stroke="#413930"
      rx={3.288}
      ry={1.827}
    />
    <ellipse
      cx={30.077}
      cy={18.362}
      fill="#F15D22"
      stroke="#413930"
      rx={3.182}
      ry={1.768}
    />
    <path
      stroke="#413930"
      strokeLinecap="round"
      d="M16.786 15.11c.248.455.48.89.605 1.392M23.669 14.762c.317.51.54 1.08.544 1.573"
    />
  </svg>
);
export default SvgIcReadyFace;

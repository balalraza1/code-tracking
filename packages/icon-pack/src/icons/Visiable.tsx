import * as React from "react";
import type { SVGProps } from "react";
const SvgVisiable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F15D22"
      stroke="#413930"
      d="M34.915 19.6c-.037-.1-1.1-2.45-3.45-4.813C28.327 11.663 24.363 10 20 10s-8.327 1.662-11.465 4.788C6.185 17.15 5.122 19.5 5.085 19.6a.99.99 0 0 0 0 .8c.037.1 1.1 2.45 3.45 4.813C11.673 28.336 15.637 30 20 30s8.327-1.663 11.465-4.788c2.35-2.362 3.413-4.712 3.45-4.812a.99.99 0 0 0 0-.8ZM20 15.5a4.5 4.5 0 1 1 0 9.002 4.5 4.5 0 0 1 0-9.002Z"
    />
  </svg>
);
export default SvgVisiable;

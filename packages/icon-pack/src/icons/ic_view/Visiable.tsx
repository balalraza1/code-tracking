import * as React from "react";
import { SVGProps } from "react";
const SvgVisiable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M34.915 19.6c-.037-.1-1.1-2.45-3.45-4.813C28.327 11.662 24.363 10 20 10c-4.363 0-8.327 1.662-11.465 4.787-2.35 2.363-3.413 4.713-3.45 4.813a.987.987 0 0 0 0 .8c.037.1 1.1 2.45 3.45 4.813C11.673 28.336 15.637 30 20 30c4.363 0 8.327-1.663 11.465-4.788 2.35-2.362 3.413-4.712 3.45-4.812a.986.986 0 0 0 0-.8ZM20 15.5a4.5 4.5 0 1 1 0 9.002 4.5 4.5 0 0 1 0-9.002Z"
      fill="#F15D22"
      stroke="#413930"
    />
  </svg>
);
export default SvgVisiable;

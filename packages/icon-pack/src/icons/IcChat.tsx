import * as React from "react";
import type { SVGProps } from "react";
const SvgIcChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <circle cx={20} cy={20} r={13.5} fill="#5E91FF" stroke="#413930" />
    <path
      fill="#5E91FF"
      stroke="#413930"
      d="M29.72 19.134c0 4.423-4.337 8.157-9.888 8.157-1.562 0-3.036-.3-4.346-.83-.238-.096-.466-.024-.578.02a2 2 0 0 0-.385.213c-.231.155-.492.37-.729.564l-.022.019q-.172.142-.324.263.036-.157.08-.33l.008-.035c.069-.282.144-.59.185-.841.02-.129.037-.272.03-.403a.9.9 0 0 0-.042-.24.6.6 0 0 0-.23-.308c-2.182-1.512-3.535-3.764-3.535-6.25 0-4.423 4.338-8.156 9.888-8.156s9.889 3.733 9.889 8.157Zm-16.797 8.759.01-.003z"
    />
    <circle cx={14.927} cy={19.422} r={1.443} fill="#F2EFED" />
    <circle cx={20.121} cy={19.422} r={1.443} fill="#F2EFED" />
    <circle cx={25.315} cy={19.422} r={1.443} fill="#F2EFED" />
    <circle cx={11} cy={8} r={3} fill="#F15D22" />
  </svg>
);
export default SvgIcChat;

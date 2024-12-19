import * as React from "react";
import type { SVGProps } from "react";
const SvgIcMousePencil = (props: SVGProps<SVGSVGElement>) => (
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
      d="m11.777 18.5 6.627-6.628-2.293-2.293-7.135-.508.508 7.136z"
    />
    <path
      fill="#F2EFED"
      d="m13.2 17.914 4.714-4.714L30.71 25.994l-4.715 4.715z"
    />
    <g filter="url(#ic_mouse_pencil_svg__a)">
      <path
        fill="#413930"
        d="m31.886 25.758.354.353a.5.5 0 0 0 0-.707zm-6.127 6.128-.353.354a.5.5 0 0 0 .707 0zM9.428 15.557l.354-.354-.008-.007zm-.315-.656-.498.044zm-.56-6.348.042-.498a.5.5 0 0 0-.54.542zm6.355.543.076-.494-.017-.003-.017-.001zm.647.332-.356.351.002.003zm.278 3.905-.205-.456a.5.5 0 0 0-.295.456zm0 2.5v.5a.5.5 0 0 0 .5-.5zm-2.5 0v-.5a.5.5 0 0 0-.474.342zm18.2 9.571-6.127 6.129.707.707 6.127-6.129zm-5.42 6.129L9.782 15.203l-.708.708L25.406 32.24zM9.774 15.196a.54.54 0 0 1-.163-.34l-.996.09c.033.37.199.715.467.972zm-.163-.339-.56-6.348-.996.088.56 6.348zm-1.1-5.806 6.354.543.085-.996-6.355-.543zm6.32.539a.66.66 0 0 1 .368.19l.712-.703a1.66 1.66 0 0 0-.927-.475zm.37.192 16.332 16.33.707-.708-16.332-16.33zm2.927 1.969-2.5 1.126.41.912 2.5-1.127zm-2.795 1.582v2.5h1v-2.5zm.5 2h-2.5v1h2.5zm-2.974.342-.833 2.5.948.316.834-2.5z"
      />
    </g>
    <defs>
      <filter
        id="ic_mouse_pencil_svg__a"
        width={32.333}
        height={32.333}
        x={4.053}
        y={6.053}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_497_528" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_497_528"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgIcMousePencil;

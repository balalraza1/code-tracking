import * as React from "react";
import { SVGProps } from "react";
const SvgIcMousePencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m11.777 18.5 6.627-6.628-2.293-2.293-7.135-.508.508 7.136 2.293 2.293Z"
      fill="#5E91FF"
    />
    <path
      fill="#F2EFED"
      d="m13.2 17.914 4.714-4.714L30.71 25.994l-4.715 4.715z"
    />
    <g filter="url(#ic_mouse_pencil_svg__a)">
      <path
        d="m31.886 25.758.354.353a.5.5 0 0 0 0-.707l-.354.354Zm-6.127 6.128-.353.354a.5.5 0 0 0 .707 0l-.354-.354ZM9.428 15.557l.354-.354-.008-.007-.346.361Zm-.315-.656-.498.044.498-.044Zm-.56-6.348.042-.498a.5.5 0 0 0-.54.542l.498-.044Zm6.354.543.077-.494-.017-.003-.017-.001-.042.498Zm.648.332-.356.351.002.003.354-.354Zm.278 3.905-.205-.456a.5.5 0 0 0-.295.456h.5Zm0 2.5v.5a.5.5 0 0 0 .5-.5h-.5Zm-2.5 0v-.5a.5.5 0 0 0-.474.342l.474.158Zm18.2 9.571-6.127 6.129.707.707 6.127-6.129-.707-.707Zm-5.42 6.129L9.782 15.203l-.708.708L25.406 32.24l.707-.707ZM9.774 15.196a.536.536 0 0 1-.163-.34l-.996.09c.033.37.199.715.467.972l.692-.722Zm-.163-.339-.56-6.348-.996.088.56 6.348.996-.088Zm-1.1-5.806 6.354.543.085-.996-6.355-.543-.085.996Zm6.32.539a.658.658 0 0 1 .368.19l.712-.703a1.659 1.659 0 0 0-.927-.475l-.153.988Zm.37.192 16.332 16.33.707-.708-16.332-16.33-.707.708Zm2.927 1.969-2.5 1.126.41.912 2.5-1.127-.41-.911Zm-2.795 1.582v2.5h1v-2.5h-1Zm.5 2h-2.5v1h2.5v-1Zm-2.974.342-.833 2.5.948.316.834-2.5-.949-.316Z"
        fill="#413930"
      />
    </g>
    <defs>
      <filter
        id="ic_mouse_pencil_svg__a"
        x={4.053}
        y={6.053}
        width={32.333}
        height={32.333}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
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

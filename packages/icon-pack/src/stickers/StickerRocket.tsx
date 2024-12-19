import * as React from "react";
import type { SVGProps } from "react";
const SvgStickerRocket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="108px"
    height="108px"
    fill="none"
    viewBox="0 0 108 108"
    {...props}
  >
    <g filter="url(#sticker_rocket_svg__a)">
      <path
        fill="#9795F0"
        stroke="#413930"
        strokeLinejoin="round"
        d="m70.869 79.232-19.06-11.127c.7 1.857 2.235 5.572 3.09 6.475.172.138.231.188.162.142a1 1 0 0 1-.162-.142c-2.33-1.87-25.319-19.85-28.66-32.382-3.59-13.458-5.821-18.578 0-23.836 6.185-5.587 17.382-2.968 26.467 8.247 7.267 8.972 15.136 24.374 18.163 30.954-1.232-1.271-4.122-3.948-5.827-4.486-2.13-.673 1.234 2.916 7.178 14.243s15.813 25.907 10.878 22.318c-3.947-2.871-9.798-8.134-12.23-10.406Z"
      />
      <path
        fill="#7877C0"
        d="m70.869 79.232-19.06-11.127c.7 1.857 2.235 5.572 3.09 6.475.172.138.231.188.162.142a1 1 0 0 1-.162-.142c-2.33-1.87-25.319-19.85-28.66-32.382-3.59-13.458-5.821-18.578 0-23.836-1.005 3.019-.434 9.665.8 13.487 3.478 10.765 11.545 11.835 17.618 18.621 3.185 3.558 8.028 9.478 16.391 14.05 4.658 2.546 17.974 20.348 22.05 25.118-3.947-2.871-9.798-8.134-12.23-10.406"
      />
      <circle
        cx={35.633}
        cy={28.674}
        r={6.472}
        fill="#FAB82B"
        stroke="#413930"
      />
      <path
        fill="#C89322"
        d="M28.66 28.674a6.972 6.972 0 0 0 13.607 2.152c-3.154 1.515-6.568.988-8.754-.988-2.186-1.977-2.374-3.98-2.633-6.266a6.95 6.95 0 0 0-2.22 5.102"
      />
      <path
        stroke="#413930"
        strokeLinecap="round"
        d="M33.676 43.815c1.363 3.635 7.725 11.932 11.861 15.104M43.542 52.42c1.767 2.208 7.51 8.17 10.85 10.2M49.828 29.196c2.548 2.241 7.08 8.905 8.29 12.622M48.2 61.64c1.327 1.187 5.512 4.295 7.797 5.209"
      />
      <path
        stroke="#413930"
        strokeLinejoin="round"
        d="m70.869 79.232-19.06-11.127c.747 1.981 2.445 6.078 3.252 6.617 1.01.673-25.234-19.066-28.823-32.524s-5.82-18.578 0-23.836c6.186-5.587 17.383-2.968 26.468 8.247 7.267 8.972 15.136 24.374 18.163 30.954-1.232-1.271-4.122-3.948-5.827-4.486-2.13-.673 1.234 2.916 7.178 14.243s15.813 25.907 10.878 22.318c-3.947-2.871-9.798-8.134-12.23-10.406Z"
      />
      <circle cx={35.633} cy={28.674} r={6.472} stroke="#413930" />
    </g>
    <defs>
      <filter
        id="sticker_rocket_svg__a"
        width={78.775}
        height={91.668}
        x={15.162}
        y={9.024}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_518_2267"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_518_2267"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgStickerRocket;

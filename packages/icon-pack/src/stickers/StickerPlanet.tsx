import * as React from "react";
import { SVGProps } from "react";
const SvgStickerPlanet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="108px"
    height="108px"
    viewBox="0 0 108 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#sticker_planet_svg__a)">
      <circle cx={54} cy={54} r={33.409} fill="#EFEAFD" stroke="#413930" />
      <path
        d="M29.603 50.91c-1.36-2.198-1.308-5.626 4.448-6.41 5.756-.785 9.288 3.4 9.026 6.41-.261 3.008-1.962 0-3.793 0-1.832 0-2.093 2.878-3.794 4.186-1.7 1.308-4.186-1.44-5.887-4.186Z"
        fill="#9795F0"
        stroke="#413930"
      />
      <path
        d="M56.74 39.835c-3.742-1.247 5.148-11.666 10.06-16.72 2.74 1.606 6.302 3.425 10.968 7.613 6.824 6.126 7.453 12.225 8.587 16.334-.378 1.512-1.502 4.251-2.976 3.118-1.842-1.417-2.267 1.7-7.085 5.243-4.818 3.542-3.118-.85-3.968-9.636-.85-8.786-10.91-4.393-15.587-5.952Z"
        fill="#9795F0"
      />
      <path
        d="M66.8 23.115c-4.912 5.054-13.802 15.473-10.06 16.72 4.675 1.56 14.736-2.834 15.586 5.952.85 8.785-.85 13.178 3.968 9.636 4.818-3.543 5.243-6.66 7.085-5.243 1.474 1.133 2.598-1.606 2.976-3.118"
        stroke="#413930"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.713 83.093c-7.718-10.073-.999-16.617 3.532-18.446 4.67-1.884 7.8 1.26 8.974 3.84 3.363-3.641 5.959-7.704 8.425.085 2.486 7.849 11.381 1.308 12.69 0 1.307-1.308 6.54-.262 6.278 3.532-.209 3.035-.872 5.625-1.177 6.54-4.349 4.449-14.978 9.086-21.209 8.77-10.44-.528-14.272-3.012-17.513-4.321Z"
        fill="#9795F0"
      />
      <circle cx={54} cy={54} r={33.409} stroke="#413930" />
      <path
        d="M87.909 54c0-18.728-15.182-33.91-33.91-33.91 8.572 4.154 17.715 18.05 17.715 31.48 0 19.147-6.548 31.1-11.155 35.705C75.241 83.549 87.909 69.84 87.909 54Z"
        fill="#EFEAFD"
        style={{
          mixBlendMode: "multiply",
        }}
      />
      <path
        d="M37.713 83.093c-7.718-10.073-.999-16.617 3.532-18.446 7.457-3.008 10.989 6.803 8.896 6.672-1.134.305-2.721.183 0-2.747 3.401-3.663 6.017-7.85 8.503 0 2.486 7.849 11.035.828 12.69 0 2.966-1.485 6.54-.262 6.278 3.532-.209 3.035-.872 5.625-1.177 6.54"
        stroke="#413930"
      />
    </g>
    <defs>
      <filter
        id="sticker_planet_svg__a"
        x={13.091}
        y={14.091}
        width={83.818}
        height={83.818}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={1} dy={2} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_518_2279"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_518_2279"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgStickerPlanet;

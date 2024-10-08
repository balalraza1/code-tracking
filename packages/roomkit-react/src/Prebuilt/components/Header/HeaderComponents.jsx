import React from "react";
import Lottie from "react-lottie";
import {
  HMSRoomState,
  selectDominantSpeaker,
  selectRoomState,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VolumeOneIcon } from "@100mslive/react-icons";
import {
  config,
  Flex,
  styled,
  Text,
  textEllipsis,
  VerticalDivider,
} from "../../../";
import logo from "../../images/logo-2.svg";
import useMediaQuery from "../hooks/useMediaQuery";

export const SpeakerTag = () => {
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  return (
    dominantSpeaker &&
    dominantSpeaker.name && (
      <Flex
        align="center"
        justify="center"
        css={{
          flex: "1 1 0",
          color: "$on_surface_high",
          "@md": { display: "none" },
        }}
      >
        <VerticalDivider css={{ ml: "$8" }} />
        <VolumeOneIcon />
        <Text
          variant="md"
          css={{ ...textEllipsis(200), ml: "$2" }}
          title={dominantSpeaker.name}
        >
          {dominantSpeaker.name}
        </Text>
      </Flex>
    )
  );
};

const LogoLottie = ({ options }) => {
  const md = useMediaQuery(config.media.md);
  return (
    <Lottie
      style={{
        position: "relative",
        height: "auto",
        width: md ? config.theme.space[15] : config.theme.space[17],
        top: md ? `${config.theme.space[1]}` : `${config.theme.space[1]}`,
        left: md ? `-${config.theme.space[6]}` : `-${config.theme.space[8]}`,
        margin: 0,
      }}
      options={options}
    />
  );
};

const LogoImg = styled("img", {
  height: "$16",
  w: "auto",
  objectFit: "contain",
  "@md": {
    height: "$13",
  },
});

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: require("./logo-lottie-2.json"),
};

export const Logo = () => {
  const roomState = useHMSStore(selectRoomState);
  const previewScreen = roomState === HMSRoomState.Preview;
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: previewScreen ? "center" : "flex-start",
      }}
    >
      <LogoImg src={logo} alt="Bhanzu Logo" />
      <LogoLottie options={lottieOptions} />
    </div>
  );
};

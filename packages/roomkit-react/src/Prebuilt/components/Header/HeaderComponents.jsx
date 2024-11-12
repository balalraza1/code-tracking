import React from "react";
import Lottie from "react-lottie";
import {
  HMSRoomState,
  selectDominantSpeaker,
  selectRoomState,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VolumeOneIcon } from "@100mslive/react-icons";
import { config, Flex, Text, textEllipsis, VerticalDivider } from "../../../";

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
  return (
    <Lottie
      style={{
        height: "auto",
        width: config.theme.space[40],
      }}
      options={options}
    />
  );
};

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: require("./logo-lottie-3.json"),
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
      <LogoLottie options={lottieOptions} />
    </div>
  );
};

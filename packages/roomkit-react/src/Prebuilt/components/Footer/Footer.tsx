import React from "react";
import { useMedia } from "react-use";
import { ConferencingScreen } from "@100mslive/types-prebuilt";
import { selectLocalPeerRoleName, useHMSStore } from "@100mslive/react-sdk";
import { PipIcon } from "@100mslive/react-icons";
import { config as cssConfig, Footer as AppFooter, Tooltip } from "../../..";
import IconButton from "../../IconButton";
// @ts-ignore: No implicit Any
import { AudioVideoToggle } from "../AudioVideoToggle";
import { CaptionIcon } from "../CaptionIcon";
// @ts-ignore: No implicit Any
import { EmojiReaction } from "../EmojiReaction";
// @ts-ignore: No implicit Any
import { LeaveRoom } from "../Leave/LeaveRoom";
// @ts-ignore: No implicit Any
import { MoreSettings } from "../MoreSettings/MoreSettings";
import { PIP } from "../PIP";
import { PictureInPicture } from "../PIP/PIPManager";
import { RaiseHand } from "../RaiseHand";
// @ts-ignore: No implicit Any
import { ScreenshareToggle } from "../ScreenShareToggle";
// @ts-ignore: No implicit Any
import { VBToggle } from "../VirtualBackground/VBToggle";
// @ts-ignore: No implicit Any
import { ChatToggle } from "./ChatToggle";
import { ParticipantCount } from "./ParticipantList";
import { SharpenUpToggle } from "./SharpenUpToggle";
import { ConferencingScreenElements } from "../../provider/roomLayoutProvider/hooks/useRoomLayoutScreen";
// @ts-ignore: No implicit Any
import { useIsSidepaneTypeOpen } from "../AppData/useSidepane";
// @ts-ignore: No implicit Any
import {
  SIDE_PANE_OPTIONS,
  STUDENT_ROLE_NAME,
  TEACHER_ROLE_NAME,
} from "../../common/constants";

export const Footer = ({
  screenType,
  elements,
}: {
  screenType: keyof ConferencingScreen;
  elements: ConferencingScreenElements;
}) => {
  const isTablet = useMedia(cssConfig.media.lg);
  const isMobile = useMedia(cssConfig.media.md);
  const isOverlayChat = !!elements?.chat?.is_overlay;

  const isChatOpen = useIsSidepaneTypeOpen(SIDE_PANE_OPTIONS.CHAT);
  const localPeerRole = useHMSStore(selectLocalPeerRoleName) || "";
  const isPipOn = PictureInPicture.isOn();

  return (
    <AppFooter.Root
      css={{
        flexWrap: "nowrap",
        "@md": {
          justifyContent: "center",
          gap: "$10",
          position: "relative",
          // To prevent it from showing over the sidepane if chat type is not overlay
          zIndex: isOverlayChat && isChatOpen ? 20 : 1,
        },
      }}
    >
      <AppFooter.Left
        css={{
          "@md": {
            w: "unset",
            p: "0",
            gap: "$10",
          },
        }}
      >
        {isTablet ? <LeaveRoom screenType={screenType} /> : null}
        <AudioVideoToggle />
        {!isTablet && elements.virtual_background ? <VBToggle /> : null}
      </AppFooter.Left>
      <AppFooter.Center
        css={{
          "@md": {
            w: "unset",
            gap: "$10",
          },
        }}
      >
        {isTablet ? (
          <>
            {!isMobile && <ScreenshareToggle />}
            {elements?.chat && <ChatToggle />}
            {!isMobile && localPeerRole?.includes(STUDENT_ROLE_NAME) && (
              <RaiseHand />
            )}
            {!isMobile && elements?.emoji_reactions && <EmojiReaction />}
            {localPeerRole?.includes(TEACHER_ROLE_NAME) && <SharpenUpToggle />}
            {isMobile && (
              <MoreSettings elements={elements} screenType={screenType} />
            )}
          </>
        ) : (
          <>
            <ScreenshareToggle />
            {localPeerRole?.includes(STUDENT_ROLE_NAME) && <RaiseHand />}
            {elements?.emoji_reactions && <EmojiReaction />}
            {screenType !== "hls_live_streaming" && <CaptionIcon />}
            <LeaveRoom screenType={screenType} />
          </>
        )}
      </AppFooter.Center>
      <AppFooter.Right>
        {!isTablet && elements?.chat && <ChatToggle />}
        {!isTablet && localPeerRole?.includes(TEACHER_ROLE_NAME) && (
          <PIP
            content={
              <Tooltip
                key="pip"
                title={`${isPipOn ? "Disable" : "Enable"} Picture-in-Picture`}
              >
                <IconButton data-testid="PIP_btn">
                  <PipIcon />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        {!isTablet &&
          elements?.participant_list &&
          localPeerRole?.includes(TEACHER_ROLE_NAME) && <ParticipantCount />}
        {!isTablet && localPeerRole?.includes(TEACHER_ROLE_NAME) && (
          <SharpenUpToggle />
        )}
        <MoreSettings elements={elements} screenType={screenType} />
      </AppFooter.Right>
    </AppFooter.Root>
  );
};

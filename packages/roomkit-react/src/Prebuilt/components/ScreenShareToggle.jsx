import React, { Fragment, useState } from "react";
import {
  selectIsAllowedToPublish,
  useAwayNotifications,
  useHMSStore,
  useScreenShare,
} from "@100mslive/react-sdk";
import { ShareScreenIcon } from "@100mslive/react-icons";
import { ShareScreenOptions } from "./pdfAnnotator/shareScreenOptions";
import { PictureInPicture } from "./PIP/PIPManager";
import { Box, Flex } from "../../Layout";
import { Tooltip } from "../../Tooltip";
import { ScreenShareButton } from "./ShareMenuIcon";
import { useUISettings } from "./AppData/useUISettings";
import { usePIP } from "../common/hooks";
import { isScreenshareSupported } from "../common/utils";
import { UI_SETTINGS } from "../common/constants";

export const ScreenshareToggle = ({ css = {} }) => {
  const isAllowedToPublish = useHMSStore(selectIsAllowedToPublish);
  const isAudioOnly = useUISettings(UI_SETTINGS.isAudioOnly);

  const {
    amIScreenSharing,
    screenShareVideoTrackId: video,
    toggleScreenShare,
  } = useScreenShare();
  const { requestPermission } = useAwayNotifications();
  const isVideoScreenshare = amIScreenSharing && !!video;
  const [isPipOn, setIsPipOn] = useState(PictureInPicture.isOn());

  usePIP(isPipOn, setIsPipOn);

  if (!isAllowedToPublish.screen || !isScreenshareSupported()) {
    return null;
  }

  return (
    <Fragment>
      <Flex direction="row">
        <ScreenShareButton
          variant="standard"
          key="ShareScreen"
          active={!isVideoScreenshare}
          css={css}
          disabled={isAudioOnly}
          onClick={async () => {
            await toggleScreenShare();
            await requestPermission();
            setIsPipOn(true);
          }}
        >
          <Tooltip
            title={`${!isVideoScreenshare ? "Start" : "Stop"} screen sharing`}
          >
            <Box>
              <ShareScreenIcon />
            </Box>
          </Tooltip>
        </ScreenShareButton>
        <ShareScreenOptions />
      </Flex>
    </Fragment>
  );
};

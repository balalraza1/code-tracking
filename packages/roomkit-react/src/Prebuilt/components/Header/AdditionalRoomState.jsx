import React, { useState } from "react";
import {
  selectLocalPeerID,
  selectPeerSharingVideoPlaylist,
  useHMSStore,
  useScreenShare,
} from "@100mslive/react-sdk";
import {
  AudioPlayerIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MusicIcon,
  ShareScreenIcon,
  VideoPlayerIcon,
} from "@100mslive/react-icons";
import { Box, Dropdown, Flex, Text, Tooltip } from "../../../";
import { useUISettings } from "../AppData/useUISettings";
import { usePlaylistMusic } from "../hooks/usePlaylistMusic";
import { useScreenshareAudio } from "../hooks/useScreenshareAudio";
import { UI_SETTINGS } from "../../common/constants";

export const getRecordingText = (
  { isBrowserRecordingOn, isServerRecordingOn, isHLSRecordingOn },
  delimiter = ", "
) => {
  if (!isBrowserRecordingOn && !isServerRecordingOn && !isHLSRecordingOn) {
    return "";
  }
  const title = [];
  if (isBrowserRecordingOn) {
    title.push("Recording On");
  }
  if (isServerRecordingOn) {
    title.push("Server");
  }
  if (isHLSRecordingOn) {
    title.push("HLS");
  }
  return title.join(delimiter);
};

/**
 * Display state of recording, streaming, playlist, whiteboard
 */
export const AdditionalRoomState = () => {
  const playlist = usePlaylistMusic();
  const isAudioOnly = useUISettings(UI_SETTINGS.isAudioOnly);
  const screenshareAudio = useScreenshareAudio();
  const [open, setOpen] = useState(false);
  const isPlaylistInactive = [
    !playlist.peer || !playlist.track,
    !playlist.peer?.isLocal && !playlist.track?.enabled,
    playlist.peer?.isLocal && !playlist.selection,
  ].some(Boolean);
  const isAudioshareInactive = [
    !screenshareAudio.peer || !screenshareAudio.track,
    !screenshareAudio.peer?.isLocal && !screenshareAudio.track?.enabled,
  ].some(Boolean);

  const peerSharingPlaylist = useHMSStore(selectPeerSharingVideoPlaylist);
  const localPeerID = useHMSStore(selectLocalPeerID);
  const isVideoPlayListPlaying = !!peerSharingPlaylist?.id;
  const {
    screenSharingPeerName,
    screenSharingPeerId,
    screenShareVideoTrackId,
  } = useScreenShare();

  const isVideoScreenSharingOn = !!screenShareVideoTrackId;
  const shouldShowScreenShareState = isAudioOnly && isVideoScreenSharingOn;
  const shouldShowVideoState = isAudioOnly && isVideoPlayListPlaying;
  if (
    isPlaylistInactive &&
    isAudioshareInactive &&
    !shouldShowScreenShareState &&
    !shouldShowVideoState
  ) {
    return null;
  }

  return (
    <Dropdown.Root open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger asChild>
        <Flex
          align="center"
          css={{
            color: "$on_primary_high",
            borderRadius: "$1",
            border: "1px solid $on_surface_low",
            padding: "$4",
            "@sm": { display: "none" },
          }}
          data-testid="record_status_dropdown"
        >
          {!isAudioshareInactive && (
            <Tooltip title="Screenshare Audio">
              <Flex
                align="center"
                css={{ color: "$on_primary_high", mx: "$2" }}
              >
                <MusicIcon width={24} height={24} />
              </Flex>
            </Tooltip>
          )}
          {shouldShowScreenShareState && (
            <Tooltip title="Screenshare">
              <Flex
                align="center"
                css={{ color: "$on_primary_high", mx: "$2" }}
              >
                <ShareScreenIcon width={24} height={24} />
              </Flex>
            </Tooltip>
          )}
          {shouldShowVideoState && (
            <Tooltip title="video playlist">
              <Flex
                align="center"
                css={{ color: "$on_primary_high", mx: "$2" }}
              >
                <VideoPlayerIcon width={24} height={24} />
              </Flex>
            </Tooltip>
          )}
          {!isPlaylistInactive && (
            <Tooltip title="Playlist Music">
              <Flex
                align="center"
                css={{ color: "$on_primary_high", mx: "$2" }}
              >
                <AudioPlayerIcon width={24} height={24} />
              </Flex>
            </Tooltip>
          )}
          <Box css={{ "@lg": { display: "none" }, color: "$on_surface_low" }}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Box>
        </Flex>
      </Dropdown.Trigger>
      <Dropdown.Content sideOffset={5} align="end" css={{ w: "$60" }}>
        {!isPlaylistInactive && (
          <Dropdown.Item css={{ color: "$on_primary_high" }}>
            <AudioPlayerIcon width={24} height={24} />
            <Text variant="sm" css={{ ml: "$2", flex: "1 1 0" }}>
              Playlist is playing
            </Text>
            {playlist.peer.isLocal ? (
              <Text
                variant="sm"
                css={{
                  color: "$alert_error_default",
                  cursor: "pointer",
                  ml: "$2",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  playlist.selection.playing
                    ? playlist.pause()
                    : playlist.play(playlist.selection.id);
                }}
              >
                {playlist.selection.playing ? "Pause" : "Play"}
              </Text>
            ) : (
              <Text
                variant="sm"
                css={{
                  color: "$alert_error_default",
                  ml: "$2",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  playlist.setVolume(!playlist.track.volume ? 100 : 0);
                }}
              >
                {playlist.track.volume === 0 ? "Unmute" : "Mute"}
              </Text>
            )}
          </Dropdown.Item>
        )}
        {!isAudioshareInactive && (
          <Dropdown.Item css={{ color: "$on_primary_high" }}>
            <MusicIcon width={24} height={24} />
            <Text variant="sm" css={{ ml: "$2", flex: "1 1 0" }}>
              Music is playing
            </Text>
            <Text
              variant="sm"
              css={{
                color: "$alert_error_default",
                ml: "$2",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                screenshareAudio.onToggle();
              }}
            >
              {screenshareAudio.muted ? "Unmute" : "Mute"}
            </Text>
          </Dropdown.Item>
        )}
        {shouldShowScreenShareState && (
          <Dropdown.Item css={{ color: "$on_primary_high" }}>
            <ShareScreenIcon width={24} height={24} />
            <Text variant="sm" css={{ ml: "$2", flex: "1 1 0" }}>
              {`Shared by: ${
                screenSharingPeerId === localPeerID
                  ? "You"
                  : screenSharingPeerName
              }`}
            </Text>
          </Dropdown.Item>
        )}
        {shouldShowVideoState && (
          <Dropdown.Item css={{ color: "$on_primary_high" }}>
            <VideoPlayerIcon width={24} height={24} />
            <Text variant="sm" css={{ ml: "$2", flex: "1 1 0" }}>
              {`Shared by: ${
                peerSharingPlaylist.id === localPeerID
                  ? "You"
                  : peerSharingPlaylist.name
              }`}
            </Text>
          </Dropdown.Item>
        )}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

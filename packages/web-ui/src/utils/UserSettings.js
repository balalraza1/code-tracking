import { useCallback, useContext, useEffect, useRef } from "react";
import { createChannel, getUserData } from "../api/channel";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserDetailsContext } from "../providers/UserDetailsProvider";
import { getSessionDetails } from "../api/session";

const DEFAULT_RESOLUTION = 360;
const CHANNEL_TYPES = {
  BASIC: "BASIC",
  STANDARD: "STANDARD",
  ADVANCED_HD: "ADVANCED_HD",
  ADVANCED_SD: "ADVANCED_SD",
};

// Utility function outside hook
export function formatConfig({ width, height, bitrate: maxBitrate }) {
  const maxFramerate = 30;
  const streamConfig = {
    maxResolution: { width, height },
    maxBitrate,
    maxFramerate,
  };
  return streamConfig;
}

// Utility function outside hook
export function getConfigFromResolution(resolution, channelType, orientation) {
  const isLandscape = orientation === "LANDSCAPE";
  let config;
  switch (resolution) {
    case "1080":
      config = {
        width: isLandscape ? 1920 : 1080,
        height: isLandscape ? 1080 : 1920,
        bitrate: channelType === "BASIC" ? 3500 : 8500,
      };
      break;
    case "720":
      config = {
        width: isLandscape ? 1280 : 720,
        height: isLandscape ? 720 : 1280,
        bitrate: channelType === "BASIC" ? 3500 : 6500,
      };
    case "360":
      config = {
        width: isLandscape ? 640 : 360,
        height: isLandscape ? 360 : 640,
        bitrate: channelType === "BASIC" ? 200 : 6500,
      };
      break;
    // Add other cases as necessary
    default:
      config = {
        width: isLandscape ? 640 : 360,
        height: isLandscape ? 360 : 640,
        bitrate: channelType === "BASIC" ? 200 : 6500,
      };
      break;
  }
  return formatConfig(config);
}

export function useSavedValuesFromLocalStorage() {
  const {
    ingestEndpoint: IE,
    streamKeyValue: SK,
    playbackUrl: PB,
    setUserData,
    fetchUserData,
  } = useContext(UserDetailsContext);

  const [saveSettings, setSaveSettings] = useLocalStorage(
    "rememberSettings",
    true
  );
  const [channelType, setChannelType] = useLocalStorage(
    "channelType",
    CHANNEL_TYPES.BASIC,
    saveSettings
  );
  const [savedAudioDeviceId, setSavedAudioDeviceId] = useLocalStorage(
    "savedAudioDeviceId",
    undefined,
    saveSettings
  );
  const [savedVideoDeviceId, setSavedVideoDeviceId] = useLocalStorage(
    "savedVideoDeviceId",
    undefined,
    saveSettings
  );
  const [orientation, setOrientation] = useLocalStorage(
    "orientation",
    "LANDSCAPE",
    saveSettings
  );
  const [resolution, setResolution] = useLocalStorage(
    "streamResolution",
    DEFAULT_RESOLUTION,
    saveSettings
  );
  const [streamKey, setStreamKey] = useLocalStorage("sk", SK, saveSettings);
  const [ingestEndpoint, setIngestEndpoint] = useLocalStorage(
    "ingestEndpoint",
    IE,
    saveSettings
  );
  const [localVideoMirror, setLocalVideoMirror] = useLocalStorage(
    "localVideoMirror",
    true,
    saveSettings
  );
  const [audioNoiseSuppression, setAudioNoiseSuppression] = useLocalStorage(
    "audioNoiseSuppression",
    true,
    saveSettings
  );
  const [autoGainControl, setAutoGainControl] = useLocalStorage(
    "autoGainControl",
    true,
    saveSettings
  );
  const [username, setUsername] = useLocalStorage("username", "", saveSettings);
  const [email, setEmail] = useLocalStorage("email", "", saveSettings);
  const [role, setRole] = useLocalStorage("role", "STUDENT", saveSettings);
  const [authToken, setAuthToken] = useLocalStorage(
    "authToken",
    "",
    saveSettings
  );
  const [sessionId, setSessionId] = useLocalStorage(
    "sessionId",
    "",
    saveSettings
  );
  const [sessionStartTime, setSessionStartTime] = useLocalStorage(
    "sessionStartTime",
    "",
    saveSettings
  );
  const [micMuted, setMicMuted] = useLocalStorage(
    "micMuted",
    false,
    saveSettings
  );
  const [cameraActive, setCameraActive] = useLocalStorage(
    "cameraActive",
    true,
    saveSettings
  );
  const [stageGroupId, setStageGroupId] = useLocalStorage(
    "stageGroupId",
    "",
    saveSettings
  );

  const [participantToken, setParticipantToken] = useLocalStorage(
    "participantToken",
    "",
    saveSettings
  );

  const [participantId, setParticipantId] = useLocalStorage(
    "participantId",
    "",
    saveSettings
  );

  const [isStageOwner, setIsStageOwner] = useLocalStorage(
    "isStageOwner",
    false,
    saveSettings
  );

  const [activeScreenSharerId, setActiveScreenSharerId] = useLocalStorage(
    "activeScreenSharerId",
    null,
    saveSettings
  );

  const [vbgIndex, setVbgIndex] = useLocalStorage(
    "vbgIndex",
    null,
    saveSettings
  );

  const configRef = useRef(
    getConfigFromResolution(resolution, channelType, orientation)
  );

  const stageJoinedRef = useRef(false);
  const stageInfo = useRef(null);

  useEffect(() => {
    configRef.current = getConfigFromResolution(
      resolution,
      channelType,
      orientation
    );
  }, [resolution, channelType, orientation]);

  useEffect(() => {
    setIngestEndpoint(IE);
    setStreamKey(SK);
  }, [IE, SK]);

  useEffect(() => {
    if (authToken) {
      getOrCreateUserData();
    }
  }, [authToken]);

  const getOrCreateUserData = useCallback(async () => {
    try {
      if (sessionId) {
        const { result: userSession } = await getSessionDetails(sessionId);

        setUserData({
          id: userSession.username,
          channelArn: userSession.channel?.channelArn,
          channelAssetId: userSession.channel?.channelAssetId,
          ingestEndpoint: userSession.channel?.ingestEndpoint,
          playbackUrl: userSession.channel?.playbackUrl,
          streamKeyArn: userSession.channel?.streamKeyArn,
          streamKeyValue: userSession.channel?.streamKey,
        });
      }
    } catch (error) {
      console.error("Error getting or creating user data:", error);
      setAuthToken("");
      setUsername("");
      setEmail("");
    }
  }, [username, email]);

  return {
    channelType,
    setChannelType,
    savedVideoDeviceId,
    setSavedVideoDeviceId,
    savedAudioDeviceId,
    setSavedAudioDeviceId,
    orientation,
    setOrientation,
    resolution,
    setResolution,
    configRef,
    streamKey,
    setStreamKey,
    ingestEndpoint,
    setIngestEndpoint,
    localVideoMirror,
    setLocalVideoMirror,
    audioNoiseSuppression,
    setAudioNoiseSuppression,
    autoGainControl,
    setAutoGainControl,
    saveSettings,
    setSaveSettings,
    username,
    setUsername,
    role,
    setRole,
    email,
    setEmail,
    authToken,
    setAuthToken,
    sessionId,
    setSessionId,
    sessionStartTime,
    setSessionStartTime,
    micMuted,
    setMicMuted,
    cameraActive,
    setCameraActive,
    stageGroupId,
    setStageGroupId,
    participantToken,
    setParticipantToken,
    isStageOwner,
    setIsStageOwner,
    stageJoinedRef,
    participantId,
    setParticipantId,
    stageInfo,
    activeScreenSharerId,
    setActiveScreenSharerId,
    vbgIndex,
    setVbgIndex,
  };
}

export function clearSavedSettings() {
  localStorage.removeItem("channelType");
  localStorage.removeItem("savedAudioDeviceId");
  localStorage.removeItem("savedVideoDeviceId");
  localStorage.removeItem("streamResolution");
  localStorage.removeItem("sk");
  localStorage.removeItem("orientation");
  localStorage.removeItem("ingestEndpoint");
  localStorage.removeItem("localVideoMirror");
  localStorage.removeItem("audioNoiseSuppression");
  localStorage.removeItem("autoGainControl");
  localStorage.removeItem("rememberSettings");
  localStorage.removeItem("autoGainControl");
  localStorage.removeItem("rememberSettings");
  localStorage.removeItem("activeScreenSharerId");
}

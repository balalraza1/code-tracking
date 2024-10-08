import { useCallback, useEffect, useRef, useState } from "react";
import { useMedia } from "react-use";
import { HMSHLSPlayer } from "@100mslive/hls-player";
import { JoinForm_JoinBtnType } from "@100mslive/types-prebuilt/elements/join_form";
import {
  HMSPeerID,
  HMSRecording,
  parsedUserAgent,
  selectAvailableRoleNames,
  selectHMSMessages,
  selectIsConnectedToRoom,
  selectLocalPeerID,
  selectLocalPeerRoleName,
  selectPeerCount,
  selectPeerMetadata,
  selectPeers,
  selectRecordingState,
  selectRemotePeers,
  useHMSActions,
  useHMSStore,
  useHMSVanillaStore,
} from "@100mslive/react-sdk";
import { PictureInPicture } from "../components/PIP/PIPManager";
import { MediaSession } from "../components/PIP/SetupMediaSession";
// @ts-ignore: No implicit any
import { ToastManager } from "../components/Toast/ToastManager";
import { config } from "../../Theme";
import { useHMSPrebuiltContext } from "../AppContext";
import { useRoomLayout } from "../provider/roomLayoutProvider";
// @ts-ignore
import { useSetAppDataByKey } from "../components/AppData/useUISettings";
import { useRoomLayoutConferencingScreen } from "../provider/roomLayoutProvider/hooks/useRoomLayoutScreen";
import {
  APP_DATA,
  CHAT_SELECTOR,
  QuizData,
  QuizState,
  RTMP_RECORD_DEFAULT_RESOLUTION,
} from "./constants";
/**
 * Hook to execute a callback when alone in room(after a certain 5d of time)
 * @param {number} thresholdMs The threshold(in ms) after which the callback is executed,
 * starting from the instant when alone in room.
 * note: the cb is not called when another peer joins during this period.
 */
export const useWhenAloneInRoom = (thresholdMs = 5 * 60 * 1000) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peerCount = useHMSStore(selectPeerCount);
  const [aloneForLong, setAloneForLong] = useState(false);
  const cbTimeout = useRef(null);
  const alone = isConnected && peerCount === 1;

  useEffect(() => {
    if (alone && !cbTimeout.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cbTimeout.current = setTimeout(() => {
        setAloneForLong(true);
      }, thresholdMs);
    } else if (!alone) {
      cbTimeout.current && clearTimeout(cbTimeout.current);
      cbTimeout.current = null;
      setAloneForLong(false);
    }
  }, [alone, thresholdMs]);

  useEffect(() => {
    return () => {
      if (cbTimeout.current) {
        clearTimeout(cbTimeout.current);
      }
    };
  }, []);

  return { alone, aloneForLong };
};

export const useFilteredRoles = () => {
  const { elements } = useRoomLayoutConferencingScreen();
  return elements?.chat?.roles_whitelist || [];
};

export const useDefaultChatSelection = () => {
  const { elements } = useRoomLayoutConferencingScreen();
  const roles = useFilteredRoles();
  // default is everyone for public chat
  if (elements?.chat?.public_chat_enabled) {
    return CHAT_SELECTOR.EVERYONE;
  }
  // sending first role as default
  if (roles.length > 0) {
    return roles[0];
  }
  // sending empty
  return "";
};

export const useShowStreamingUI = () => {
  const layout = useRoomLayout();
  const { join_form } = layout?.screens?.preview?.default?.elements || {};
  return (
    join_form?.join_btn_type ===
    JoinForm_JoinBtnType.JOIN_BTN_TYPE_JOIN_AND_GO_LIVE
  );
};

// The search results should not have role name matches
export const useParticipants = (params?: {
  metadata?: { isHandRaised?: boolean };
  role?: string;
  search?: string;
  peerIds?: HMSPeerID[];
}) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peerCount = useHMSStore(selectPeerCount);
  const availableRoles = useHMSStore(selectAvailableRoleNames);
  let participantList = useHMSStore(
    isConnected ? selectPeers : selectRemotePeers
  );
  const rolesWithParticipants = Array.from(
    new Set(participantList.map((peer) => peer.roleName))
  );
  const vanillaStore = useHMSVanillaStore();
  if (params?.metadata?.isHandRaised) {
    participantList = participantList.filter((peer) => {
      return vanillaStore.getState(selectPeerMetadata(peer.id)).isHandRaised;
    });
  }
  if (params?.role && availableRoles.includes(params.role)) {
    participantList = participantList.filter(
      (peer) => peer.roleName === params.role
    );
  }
  if (params?.search) {
    const search = params.search;
    // Removed peer.roleName?.toLowerCase().includes(search)
    participantList = participantList.filter((peer) =>
      peer.name.toLowerCase().includes(search)
    );
  }
  // TODO: This removes selected participants from the list - check if required
  // if (params?.peerIds && params.peerIds.length > 0) {
  //   const peerIds = params.peerIds;
  //   participantList = participantList.filter(
  //     (peer) => !peerIds.includes(peer.id)
  //   );
  // }

  return {
    participants: participantList,
    isConnected,
    peerCount,
    rolesWithParticipants,
  };
};

export const useIsLandscape = () => {
  const isMobile = parsedUserAgent.getDevice().type === "mobile";
  const isLandscape = useMedia(config.media.ls);
  return isMobile && isLandscape;
};

export const useLandscapeHLSStream = () => {
  const isLandscape = useIsLandscape();
  const { screenType } = useRoomLayoutConferencingScreen();
  return isLandscape && screenType === "hls_live_streaming";
};

export const useMobileHLSStream = () => {
  const isMobile = useMedia(config.media.md);
  const { screenType } = useRoomLayoutConferencingScreen();
  return isMobile && screenType === "hls_live_streaming";
};

export const useKeyboardHandler = (
  isPaused: boolean,
  hlsPlayer: HMSHLSPlayer
) => {
  const handleKeyEvent = useCallback(
    async (event: KeyboardEvent) => {
      switch (event.key) {
        case " ":
          if (isPaused) {
            await hlsPlayer?.play();
          } else {
            hlsPlayer?.pause();
          }
          break;
        case "ArrowRight":
          hlsPlayer?.seekTo(hlsPlayer?.getVideoElement().currentTime + 10);
          break;
        case "ArrowLeft":
          hlsPlayer?.seekTo(hlsPlayer?.getVideoElement().currentTime - 10);
          break;
      }
    },
    [hlsPlayer, isPaused]
  );

  return handleKeyEvent;
};

export const useSharpenUp = () => {
  let launchSharpenUp = false;
  let quizLink: string | undefined;
  const messages = useHMSStore(selectHMSMessages);
  const localPeerID = useHMSStore(selectLocalPeerID);
  const hmsActions = useHMSActions();
  const { studentAppURL } = useHMSPrebuiltContext();

  const getQuizLink = (activeRooms: QuizData) => {
    const { room_id: roomId } = activeRooms;
    if (!roomId) return;
    const quizLink = `${studentAppURL}/quiz/join/${roomId}?accessedBy=streamPlayer`;
    return quizLink;
  };
  const latestMessage = messages[messages.length - 1];
  const relauncQuizPattern = new RegExp(QuizState.RELAUNCH_QUIZ);
  const launchQuizPattern = new RegExp(QuizState.LAUNCH_QUIZ);
  const endQuizPattern = new RegExp(QuizState.END_QUIZ);

  const quizAlreadyLaunched = messages?.some((currMessage) => {
    return launchQuizPattern.test(currMessage.message);
  });

  // Launch Sharpen up if the latest quiz message is not sent by the local peer i.e. Trainer
  if (latestMessage && latestMessage.sender !== localPeerID) {
    if (endQuizPattern.test(latestMessage.message)) {
      launchSharpenUp = false;
    } else {
      let activeRooms;
      if (launchQuizPattern.test(latestMessage.message)) {
        activeRooms = latestMessage.message.split("LAUNCH_QUIZ:")[1];
      } else if (
        relauncQuizPattern.test(latestMessage.message) &&
        !quizAlreadyLaunched
      ) {
        activeRooms = latestMessage.message.split("RELAUNCH_QUIZ:")[1];
      }
      if (activeRooms) quizLink = getQuizLink(JSON.parse(activeRooms) || []);
      if (quizLink) launchSharpenUp = true;
    }
  }

  // Mark the message as read if it is a quiz related message
  if (
    latestMessage &&
    [relauncQuizPattern, launchQuizPattern, endQuizPattern].some((pattern) =>
      pattern.test(latestMessage.message)
    )
  ) {
    hmsActions.setMessageRead(true);
  }
  return { quizLink, launchSharpenUp };
};

export const usePIP = (
  isPipOn: boolean,
  setIsPipOn: (isPipOn: boolean) => void
) => {
  const store = useHMSVanillaStore();
  const hmsActions = useHMSActions();
  const localPeerRole = useHMSStore(selectLocalPeerRoleName) || "";

  useEffect(() => {
    if (isPipOn && PictureInPicture.isSupported()) {
      PictureInPicture.start(hmsActions, setIsPipOn, localPeerRole).catch(
        (err) => console.error("error in starting pip", err)
      );
      MediaSession.setup(hmsActions, store);
    } else {
      PictureInPicture.stop().catch((err) =>
        console.error("error in stopping pip", err)
      );
    }
  }, [hmsActions, isPipOn, store, setIsPipOn, localPeerRole]);
};

export interface RTMPRecordingResolution {
  width: number;
  height: number;
}
export const useRecordingHandler = () => {
  const hmsActions = useHMSActions();
  const recordingState: HMSRecording = useHMSStore(selectRecordingState);
  const [isRecordingLoading, setIsRecordingLoading] = useState(false);
  const [recordingStarted, setRecordingState] = useSetAppDataByKey(
    APP_DATA.recordingStarted
  );
  useEffect(() => {
    if (recordingState.browser.error && recordingStarted) {
      setRecordingState(false);
    }
  }, [recordingStarted, recordingState.browser.error, setRecordingState]);
  const startRecording = useCallback(
    async (resolution: RTMPRecordingResolution | null = null) => {
      try {
        setRecordingState(true);
        setIsRecordingLoading(true);
        await hmsActions.startRTMPOrRecording({
          resolution: getResolution(resolution),
          record: true,
        });
      } catch (error) {
        const err = error as Error;
        if (err.message.includes("stream already running")) {
          ToastManager.addToast({
            title: "Recording already running",
            variant: "error",
          });
        } else {
          ToastManager.addToast({
            title: err.message,
            variant: "error",
          });
        }
        setRecordingState(false);
      }
      setIsRecordingLoading(false);
    },
    [hmsActions, setRecordingState]
  );
  return {
    recordingStarted,
    startRecording,
    isRecordingLoading,
  };
};

export function getResolution(
  recordingResolution: RTMPRecordingResolution | null
): RTMPRecordingResolution | undefined {
  if (!recordingResolution) {
    return undefined;
  }
  const resolution: RTMPRecordingResolution = RTMP_RECORD_DEFAULT_RESOLUTION;
  if (recordingResolution.width) {
    resolution.width = recordingResolution.width;
  }
  if (recordingResolution.height) {
    resolution.height = recordingResolution.height;
  }
  return resolution;
}

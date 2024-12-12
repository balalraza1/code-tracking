import { Badge } from "@/components/ui/badge";
import { Podcast } from "lucide-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import debounce from "../../helper/debounce";
import { DialogContext } from "../../providers/ModalContext";
import { StageBroadcastContext } from "../../providers/StageBroadcastContext";
import { StageContext } from "../../providers/StageContext";
import { StageLayoutContext } from "../../providers/StageLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { NavigationBlockContext } from "../../utils-hooks/useNavigationBlocker";

import { useNavigate } from "react-router-dom";
import { sendChatEvent } from "../../api/channel";
import {
  disableStageBroadcast,
  enableStageBroadcast,
  endSession,
} from "../../api/session";

import {
  deleteStage,
  disconnectStage,
  startRecording,
  stopRecording,
} from "../../api/stage";
import { LocalMediaContext } from "../../providers/LocalMediaContext";

import ConfirmDialog from "../ConfirmButtons";
import StageControlBar from "../ControlBar/StageControlBar";
import ParticipantVideos from "../ParticipantsVideos";
import FeaturedParticipantVideo from "../ParticipantsVideos/FeaturedParticipantVideo";

import { useAspectRatioByHeight } from "../../utils-hooks/useAspectRatio";
import CameraMicAccessError from "../CameraMicAccessError";
import ParticipantsListView from "./ParticipantsListView";
import ParticipantsGridView from "./ParticipantsGridView";
import ScreenSharingView from "./ScreenSharingView";
import ChatPanel from "./ChatPanel";
import StageControls from "./StageControls";
import { backgrounds, DEFAULT_ASPECT_RATIO } from "../../constants";
import { AnnotationContext } from "../../providers/AnnotationContext";
import QuizCard from "../Quiz/QuizCard";
import NoticeCard from "../Player/NoticeCard";
import { updateScheduledMeeting } from "../../api/scheduledMeetings";
import { VirtualBackgroundContext } from "../../providers/VirtualBackgroundContext";
import useDeviceType from "../../hooks/useDeviceType";

export default function StageComponent() {
  const {
    containerRef: pContainerRef,
    width: rawPWidth,
    height: rawPHeight,
  } = useAspectRatioByHeight(DEFAULT_ASPECT_RATIO, 1);

  const {
    containerRef: sContainerRef,
    width: rawSWidth,
    height: rawSHeight,
  } = useAspectRatioByHeight(DEFAULT_ASPECT_RATIO, 1);

  let navigate = useNavigate();
  const {
    localAudioDeviceError,
    localVideoDeviceError,
    localStageAudioStreamRef,
    localStageVideoStreamRef,
  } = useContext(LocalMediaContext);
  const { micMuted, cameraActive, vbgIndex } = useContext(UserSettingsContext);

  const {
    joinStage,
    stageJoined,
    participants,
    isInitializeComplete,
    stageRef,
    strategyRef,
    leaveStage,
    localParticipant,
    setLocalParticipant,
    recodingEnabled,
    setRecordingEnabled,
  } = useContext(StageContext);
  const {
    participantToken,
    stageJoinedRef,
    configRef,
    streamKey,
    ingestEndpoint,
    setParticipantToken,
    setIsStageOwner,
    setSessionId,
    setSessionStartTime,
    sessionId,
    stageGroupId,
    username,
    participantId,
    setParticipantId,
    isStageOwner,
    stageInfo,
    activeScreenSharerId,
    setActiveScreenSharerId,
  } = useContext(UserSettingsContext);
  const {
    broadcastClientRef,
    createBroadcastClient,
    startBroadcast,
    stopBroadcast,
    isBroadcasting,
  } = useContext(StageBroadcastContext);
  const {
    isBlocking,
    setIsBlocking,
    isAttemptingToNavigate,
    attemptNavigation,
    confirmNavigation,
    cancelNavigation,
  } = useContext(NavigationBlockContext);

  const { annotationStream } = useContext(AnnotationContext);

  const { screenShareActive, whiteboardActive, noteboardActive ,setWhiteboardActive} =
    useContext(StageLayoutContext);

  const { openDialog } = useContext(DialogContext);

  const { enableVirtualBg, disableVirtualBg } = useContext(
    VirtualBackgroundContext
  );

  const [leavingStage, setLeavingStage] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [noticeData, setNoticeData] = useState(null);
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  const { isMobile } = useDeviceType();
  const [chatPanelOpen, setChatPanelOpen] = useState(false);

  const remoteParticipants = useMemo(() => {
    return participants?.filter(
      (participant) => participant.id !== activeScreenSharerId
    );
  }, [participants, activeScreenSharerId]);

  const activeScreenSharer = useMemo(() => {
    return participants?.find(
      (participant) => participant.id === activeScreenSharerId
    );
  }, [participants, activeScreenSharerId]);

  const handleStartBroadcast = useCallback(async () => {
    if (!broadcastClientRef || !broadcastClientRef.current) {
      await createBroadcastClient({
        config: configRef.current,
      });
    }

    await startBroadcast({ streamKey, ingestEndpoint });
    if (!stageInfo?.current?.isStageBroadcast) {
      await enableStageBroadcast(stageInfo?.current?.id);
      stageInfo.current = { ...stageInfo?.current, isStageBroadcast: true };
    }
  }, [stageInfo]);

  const handleStopBroadcast = async () => {
    stopBroadcast();
    await disableStageBroadcast(stageInfo?.current?.id);
    stageInfo.current = { ...stageInfo?.current, isStageBroadcast: false };
  };

  const debouncedJoinStage = debounce(() => joinStage(participantToken), 500);
  const debouncedStartBroadcast = debounce(handleStartBroadcast, 600);

  useEffect(() => {
    if (!isInitializeComplete || !stageJoined) return;

    const lParticipant = participants?.find(
      (participant) => participant.isLocal
    );

    if (!!lParticipant) {
      setLocalParticipant(lParticipant);
    }

    if (stageJoined) {
      setIsBlocking(true);
    }
  }, [stageJoined, isInitializeComplete, participants]);

  useEffect(() => {
    if (!isInitializeComplete) return;

    if (isInitializeComplete && participantToken && !stageJoinedRef.current) {
      debouncedJoinStage();
      if (stageInfo?.current?.isStageBroadcast && isStageOwner) {
        debouncedStartBroadcast();
      }
    }
  }, [participantToken, isInitializeComplete, stageJoinedRef, stageInfo]);

  useEffect(() => {
    if (stageJoinedRef.current) {
      if (micMuted === true) {
        localStageAudioStreamRef.current?.setMuted(true);
      }
      if (cameraActive !== true) {
        localStageVideoStreamRef.current?.setMuted(true);
      }
    }
  }, [
    stageJoinedRef.current,
    micMuted,
    cameraActive,
    localStageAudioStreamRef,
    localStageVideoStreamRef,
  ]);

  const toggleRecording = useCallback(async () => {
    if (recodingEnabled && sessionId) {
      await startRecording({ sessionId });
    } else if (!recodingEnabled && sessionId) {
      setRecordingEnabled(false);
      await stopRecording({ sessionId });
    }
  });

  // useEffect(() => {
  //   toggleRecording();
  // }, [recodingEnabled, sessionId]);

  const handleReload = async () => {
    if (isBroadcasting) {
      stopBroadcast();
    }
    // setParticipants((participants) =>
    //   participants.filter((p) => p.id !== participantId)
    // );
    setParticipantToken("");
    setParticipantId("");

    await leaveStage();
    await disconnectStage({
      groupId: stageGroupId,
      userId: username,
      participantId: participantId,
      reason: "Exit",
    });

    setIsBlocking(false);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleReload);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (stageRef.current && strategyRef.current) {
        stageRef.current = undefined;
        strategyRef.current = undefined;
      }
    };
  }, [stageRef, strategyRef]);

  const onShowNoticeEvent = (attributes) => {
    const { message, title } = attributes;
    setNoticeData({ message, title });
    setTimeout(() => {
      setNoticeData(null);
    }, 20000);
  };

  const handleMetadataInBroadcast = (eventData) => {
    const { eventName, attributes } = eventData;
    if (!isStageOwner && eventName === "app:NOTICE") {
      onShowNoticeEvent(attributes);
    } else if (!isStageOwner && eventName === "app:QUIZ") {
      const quizData = {
        ...attributes,
        correctAnswerIndex: parseInt(attributes.correctAnswerIndex),
        duration: parseInt(attributes.duration),
        answers: JSON.parse(attributes.answers),
        startTime: Date.now(),
      };

      setQuizData(quizData);
      // openDialog({
      //   header: "Show a quiz",
      //   description: `Quiz `,
      //   content: <QuizCard {...quizData} />,
      // });
    }
  };

  const handleSendStartScreenShareEvent = useCallback(async () => {
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:SCREENSHARE_STARTED",
      eventAttributes: {
        userId: username,
        screenSharer: localParticipant?.id,
      },
    };
    try {
      await sendChatEvent(eventPayload);
    } catch (error) {
      console.log("sendChatEventError", error);
    }
  }, [localParticipant, username]);

  const handleSendStopScreenShareEvent = useCallback(async () => {
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:SCREENSHARE_STOPPED",
      eventAttributes: { userId: username },
    };
    try {
      await sendChatEvent(eventPayload);
    } catch (error) {
      console.log("sendChatEventError", error);
    }
  }, [username]);

  const statusBadge = stageJoined ? (
    <Badge variant="destructive">
      <Podcast className="text-inherit h-3 w-3 mr-1" />
      LIVE
    </Badge>
  ) : (
    <Badge variant="outline">OFFLINE</Badge>
  );

  const handleRemoveUser = useCallback(
    async (removedUsername) => {
      try {
        const eventPayload = {
          roomId: stageInfo?.current?.chatRoomArn,
          eventName: "app:REMOVE_USER_FROM_STAGE",
          eventAttributes: { userId: username, removedUsername, sessionId },
        };

        if (isStageOwner) {
          await Promise.all([sendChatEvent(eventPayload)]);
        }
      } catch (error) {
        console.error("Failed to remove user:", error);
      }
    },
    [stageJoined, isStageOwner, setParticipantToken, isBroadcasting]
  );

  const handleLeaveStage = useCallback(async () => {
    setLeavingStage(true);

    if (isBroadcasting) {
      stopBroadcast();
    }

    try {
      const eventPayload = {
        roomId: stageInfo?.current?.chatRoomArn,
        eventName: "app:CLASS_ENDED",
        eventAttributes: { userId: username },
      };

      await leaveStage();
      await disconnectStage({
        groupId: stageGroupId,
        userId: username,
        participantId: participantId,
        reason: "Exit",
      });

      if (isStageOwner) {
        // if (recodingEnabled) {
        //   await stopRecording({ sessionId });
        //   setRecordingEnabled(false);
        // }
        await Promise.all([
          sendChatEvent(eventPayload),
          endSession(sessionId),
          deleteStage({ groupId: stageGroupId }),
          updateScheduledMeeting({
            sessionId, status: "ended"
          }),
        ]);
      }

      setParticipantToken("");
      setParticipantId("");
      setIsStageOwner(false);

      setSessionId("");
      setSessionStartTime("");
      isAttemptingToNavigate
        ? confirmNavigation()
        : (window.location.href = redirectUrl);

      setIsBlocking(false);
    } catch (error) {
      console.error("Failed to leave stage:", error);
    } finally {
      setLeavingStage(false);
      setIsBlocking(false);
    }
  }, [
    stageJoined,
    isStageOwner,
    setParticipantToken,
    sessionId,
    isBroadcasting,
    isAttemptingToNavigate,
  ]);

  useEffect(() => {
    if (isBlocking && isAttemptingToNavigate) {
      openDialog({
        header: "Are you absolutely sure?",
        description: `Your class is currently active. Exiting now will ${
          isStageOwner
            ? " terminate the class for everyone."
            : " remove you from the class session."
        }`,
        content: (
          <ConfirmDialog
            onConfirm={handleLeaveStage}
            onCancel={cancelNavigation}
          />
        ),
      });
      return;
    }
  }, [isBlocking, isAttemptingToNavigate]);

  useEffect(() => {
    if (screenShareActive && !activeScreenSharer) {
      handleSendStartScreenShareEvent();
    } else if (!screenShareActive && activeScreenSharer) {
      handleSendStopScreenShareEvent();
    }
  }, [screenShareActive]);

  useEffect(() => {
    if (!cameraActive) return;
    parseInt(vbgIndex) > -1
      ? enableVirtualBg(
          backgrounds[vbgIndex === 999 ? 0 : vbgIndex],
          vbgIndex === 999
        )
      : disableVirtualBg();
  }, [vbgIndex]);

  const handleScreenShareParticipant = useCallback((id) => {
    setActiveScreenSharerId(id || null);
  }, []);

  const toggleChatPanel = useCallback(() => {
    setChatPanelOpen((prev) => !prev);
  }, []);

  if (isInitializeComplete && (localAudioDeviceError || localVideoDeviceError))
    return <CameraMicAccessError />;

  return (
    <>
      <div className="md:flex w-full h-screen">
        <div className={`w-full h-full relative`}>
       
          {!!activeScreenSharer || !!whiteboardActive ? (
            <>
              <ParticipantsListView
                participants={remoteParticipants}
                rawPWidth={rawPWidth}
                rawPHeight={rawPHeight}
                isInitializeComplete={isInitializeComplete}
                containerRef={pContainerRef}
              />
              <ScreenSharingView
                activeScreenSharer={activeScreenSharer}
                rawSWidth={rawSWidth}
                rawSHeight={rawSHeight}
                isInitializeComplete={isInitializeComplete}
                containerRef={sContainerRef}
                whiteboarding={whiteboardActive}
                noteboarding={noteboardActive}
              />
            </>
          ) : (
            <ParticipantsGridView
              stageJoined={stageJoined}
              participants={participants}
              isInitializeComplete={isInitializeComplete}
            />
          )}
          {!!noticeData && (
            <div className="relative bottom-20 px-4">
              <NoticeCard
                {...noticeData}
                onCloseAlertClick={() => setNoticeData(null)}
              />
            </div>
          )}
          {!!quizData && (
            <div className="relative bottom-10">
              <QuizCard {...quizData} setIsQuizLive={() => setQuizData(null)} />
            </div>
          )}
          <StageControls
            leavingStage={leavingStage}
            handleLeaveStage={handleLeaveStage}
            isBroadcasting={isBroadcasting}
            handleStartBroadcast={handleStartBroadcast}
            handleStopBroadcast={handleStopBroadcast}
            activeScreenSharer={activeScreenSharer}
            toggleChatPanel={toggleChatPanel}
          />
        </div>

        <ChatPanel
          participants={participants}
          stageInfo={stageInfo}
          handleLeaveStage={handleLeaveStage}
          handleRemoveUser={handleRemoveUser}
          isStageOwner={isStageOwner}
          stageJoined={stageJoined}
          handleMetadataInBroadcast={handleMetadataInBroadcast}
          handleScreenShareParticipant={handleScreenShareParticipant}
          setWhiteboardActive={setWhiteboardActive}
          chatPanelOpen={chatPanelOpen}
          toggleChatPanel={toggleChatPanel}
        />
      </div>
    </>
  );
}

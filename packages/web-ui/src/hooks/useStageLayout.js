import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { LocalMediaContext } from "../providers/LocalMediaContext";
import { StageContext } from "../providers/StageContext";
import { VirtualBackgroundContext } from "../providers/VirtualBackgroundContext";
import { createScreenShareStageStream } from "../utils/StageStrategy";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { AnnotationContext } from "../providers/AnnotationContext";
import { sendChatEvent } from "../api/channel";
import { backgrounds } from "../constants";

function useStageLayout() {
  const { toast } = useToast();
  const {
    localStageAudioStreamRef,
    localStageVideoStreamRef,
    localStageScreenShareStreamRef,
    localVirtualVideoStageStreamRef,
    startScreenShare,
    stopScreenShare,
  } = useContext(LocalMediaContext);

  const { virtualBgEnabled, virtualBgStream, disableVirtualBg, enableVirtualBg } = useContext(
    VirtualBackgroundContext
  );
  const {
    cameraActive,
    setCameraActive,
    micMuted,
    setMicMuted,
    username,
    stageInfo,
    activeScreenSharerId,
    vbgIndex,
  } = useContext(UserSettingsContext);
  const { stageJoined, stageRef, strategyRef, localParticipant } =
    useContext(StageContext);
  const { annotationStream } = useContext(AnnotationContext);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const localVideoStream = useRef();
  const [noteboardActive, setNoteboardActive] = useState(false);

  useEffect(() => {
    const [screenTrack] = annotationStream?.getVideoTracks();

    localVideoStream.current = createScreenShareStageStream(screenTrack);

    if (!stageRef.current || !stageJoined) return;

    const getActiveStream = () => {
      if (screenShareActive) {
        return localStageScreenShareStreamRef.current;
      }

      if (whiteboardActive || noteboardActive) {
        return activeScreenSharerId === localParticipant?.id
          ? localVideoStream.current
          : virtualBgEnabled
          ? localVirtualVideoStageStreamRef.current
          : localStageVideoStreamRef.current;
      }

      return virtualBgEnabled && virtualBgStream
        ? localVirtualVideoStageStreamRef.current
        : localStageVideoStreamRef.current;
    };

    const activeStream = getActiveStream();

    strategyRef.current?.updateMedia(
      localStageAudioStreamRef.current,
      activeStream
    );

    stageRef.current.refreshStrategy();
  }, [
    stageJoined,
    screenShareActive,
    whiteboardActive,
    virtualBgEnabled,
    virtualBgStream,
    noteboardActive,
    localStageAudioStreamRef,
    localStageVideoStreamRef,
    localStageScreenShareStreamRef,
    activeScreenSharerId,
    localParticipant,
  ]);

  // useEffect(() => {
  //   whiteboardActive && startScreenSharing();
  // }, [whiteboardActive]);

  const handleMicMute = async () => {
    if (localStageAudioStreamRef.current) {
      localStageAudioStreamRef.current?.setMuted(!micMuted);
      setMicMuted(!micMuted);
    }
  };

  const handleCameraMute = async () => {
    if (localStageVideoStreamRef.current) {
      virtualBgEnabled && virtualBgStream
        ? localVirtualVideoStageStreamRef.current.setMuted(cameraActive)
        : localStageVideoStreamRef.current?.setMuted(cameraActive);
      setCameraActive(!cameraActive);
      if (virtualBgStream && vbgIndex !== -1) {
        cameraActive
          ? disableVirtualBg()
          : enableVirtualBg(
              backgrounds[vbgIndex === 999 ? 0 : vbgIndex],
              vbgIndex === 999
            );
      }
    }
  };

  const stopScreenSharing = async () => {
    await stopScreenShare();
    setScreenShareActive(false);
    setWhiteboardActive(false);
    setNoteboardActive(false);
    toast({
      variant: "default",
      title: "Screen Share Ended",
      description: "Your screen sharing session has stopped.",
    });
  };

  const startScreenSharing = async () => {
    try {
      const captureStream = await startScreenShare();
      if (!captureStream) return;

      const [screenTrack] = captureStream.getVideoTracks();
      const [audioTrack] = captureStream.getAudioTracks();

      if (screenTrack || audioTrack) {
        setScreenShareActive(true);
        toast({
          variant: "default",
          title: "Screen Sharing Started",
          description: "Your screen is now being shared.",
        });

        localStageScreenShareStreamRef.current =
          createScreenShareStageStream(screenTrack);

        screenTrack.onended = stopScreenSharing;
      }
    } catch (error) {
      console.error("Error starting screen sharing:", error);
      toast({
        variant: "error",
        title: "Screen Sharing Failed",
        description: "An error occurred while trying to start screen sharing.",
      });
    }
  };

  const toggleScreenSharing = async () => {
    if (screenShareActive) {
      await stopScreenSharing();
    } else {
      await startScreenSharing();
    }
  };

  const toggleWhiteboarding = useCallback(async () => {
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: whiteboardActive
        ? "app:WHITEBOARD_STOPPED"
        : "app:WHITEBOARD_STARTED",
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
    setWhiteboardActive(!whiteboardActive);
  }, [localParticipant, username, whiteboardActive]);

  const toggleNoteBoarding = () => {
    setNoteboardActive(!noteboardActive);
    setScreenShareActive(!screenShareActive);
  };

  return {
    screenShareActive,
    toggleScreenSharing,
    whiteboardActive,
    setWhiteboardActive,
    toggleWhiteboarding,
    handleMicMute,
    handleCameraMute,
    toggleNoteBoarding,
    noteboardActive,
  };
}

export default useStageLayout;

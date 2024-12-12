import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  endSession,
  startRecording,
  startSession,
  stopRecording,
} from "../../api/session";
import { BroadcastContext } from "../../providers/BroadcastContext";
import { BroadcastLayoutContext } from "../../providers/BroadcastLayoutContext";
import { BroadcastMixerContext } from "../../providers/BroadcastMixerContext";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { DialogContext } from "../../providers/ModalContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { NavigationBlockContext } from "../../utils-hooks/useNavigationBlocker";
import { CamButton } from "./CamButton";
import { MuteButton } from "./MuteButton";
import { ScreenShareButton } from "./ScreenShareButton";
import { SettingsButton } from "./SettingsButton";
import { StreamButton } from "./StreamButton";

import Login from "../Login";
import ConfirmDialog from "../ConfirmButtons";
import Settings from "../Settings";
import Tooltip from "../Tooltip";
import VirtualBackground from "../VirtualBackground";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ShowPoll from "../../ShowPoll";
import ShowQuiz from "../../ShowQuiz";
import ShowNotice from "../Notice/ShowNotice";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../../shadcn/components/ui/button";
import { FEATURES, hasAccess } from "../../constants";

export default function ControlBar({ recordingEnabled, setRecordingEnabled }) {
  const {
    isBlocking,
    setIsBlocking,
    isAttemptingToNavigate,
    attemptNavigation,
    confirmNavigation,
    cancelNavigation,
  } = useContext(NavigationBlockContext);
  const [isInitilized, setIsInitialized] = useState(false);
  const [isRecording, setIsRecording] = useState(recordingEnabled);
  const {
    isLive,
    streamPending,
    setStreamPending,
    toggleStream,
    broadcastClientRef,
    connectionState,
  } = useContext(BroadcastContext);
  const {
    // camActive,
    screenShareActive,
    toggleCamVisiblity,
    toggleScreenSharing,
  } = useContext(BroadcastLayoutContext);
  const { toggleMute } = useContext(BroadcastMixerContext);
  const { permissions, localVideoDeviceId, localAudioDeviceId } =
    useContext(LocalMediaContext);
  const {
    username,
    authToken,
    setSessionId,
    setSessionStartTime,
    sessionId,
    ingestEndpoint,
    streamKey,
    setIngestEndpoint,
    setStreamKey,
    micMuted,
    cameraActive,
    role,
  } = useContext(UserSettingsContext);
  const { openDialog } = useContext(DialogContext);
  const manualStreamToggleRef = useRef(null);
  const retryIntervalRef = useRef(null);
  const stopRecordingRef = useRef(null);

  useEffect(() => {
    if (manualStreamToggleRef?.current) {
      toggleStream();
    }
  }, [manualStreamToggleRef?.current]);

  // useEffect(() => {
  //   setIsRecording(recordingEnabled);
  //   console.log(recordingEnabled);
  // }, [recordingEnabled]);
  const handleMicMute = useCallback(() => {
    toggleMute(localAudioDeviceId);
  }, [localAudioDeviceId, toggleMute]);
  const handleCameraMute = useCallback(() => {
    toggleCamVisiblity(localVideoDeviceId);
  }, [localVideoDeviceId, cameraActive, toggleCamVisiblity]);

  const handleScreenShare = useCallback(async () => {
    const cam =
      broadcastClientRef.current.getVideoInputDevice(localVideoDeviceId).source;
    toggleScreenSharing(cam);
  }, [localVideoDeviceId, toggleScreenSharing]);

  const handleSettings = useCallback(() => {
    openDialog({
      header: "Broadcast Setting",
      description:
        "Adjust your device settings and save your changes in the Broadcast Setting section.",
      content: <Settings />,
    });
  }, [isLive, openDialog]);

  const handleLogin = useCallback(() => {
    openDialog({
      header: "Login to GoLive",
      description:
        "Sign in now to start your live broadcast. Access and adjust your streaming settings in the 'Settings' ",
      content: <Login />,
    });
  }, [isLive, openDialog]);

  const handleStream = async () => {
    setStreamPending(true);

    if (!isLive && !sessionId) {
      await startLiveSession();
      manualStreamToggleRef.current = "start";
    } else {
      manualStreamToggleRef.current = "stop";
    }
  };

  const clearRetryInterval = () => {
    if (retryIntervalRef.current) {
      clearInterval(retryIntervalRef.current);
      retryIntervalRef.current = null;
    }
  };

  const checkAndToggleStream = (retryCount = 0) => {
    if (ingestEndpoint && streamKey) {
      toggleStream();
      clearRetryInterval();
      setIsBlocking(true);
    } else if (retryCount >= 3) {
      stopLiveSession();
      if (micMuted) {
        handleMicMute();
      }
      if (!cameraActive) {
        handleCameraMute();
      }
      clearRetryInterval();
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    const handleRetryAndStop = async () => {
      if (!isLive) {
        if (sessionId) {
          if (!manualStreamToggleRef.current) {
            clearRetryInterval();
            let retryCount = 0;
            retryIntervalRef.current = setInterval(() => {
              checkAndToggleStream(retryCount++);
            }, 1000);
          } else if (manualStreamToggleRef.current === "stop") {
            await stopLiveSession();
            if (micMuted) {
              handleMicMute();
            }
            if (!cameraActive) {
              handleCameraMute();
            }
          }
        } else {
          setIsInitialized(true);
        }
      }
    };
    handleRetryAndStop();

    return () => clearRetryInterval();
  }, [isLive, sessionId, ingestEndpoint, streamKey]);

  useEffect(() => {
    if (isBlocking && isAttemptingToNavigate) {
      openDialog({
        header: "Are you absolutely sure?",
        description:
          "Your live broadcast is currently active. Exiting now will terminate the broadcast.",
        content: (
          <ConfirmDialog onConfirm={handleStream} onCancel={cancelNavigation} />
        ),
      });
      return;
    }
  }, [isBlocking, isAttemptingToNavigate]);

  const startLiveSession = useCallback(async () => {
    try {
      if (!sessionId) {
        let { result } = await startSession("Broadcast");
        const { sessionId: newSessionId, streamKey, ingestEndpoint } = result;
        setIngestEndpoint(ingestEndpoint);
        setStreamKey(streamKey);
        // if (isRecording) {
        //   await startRecording(newSessionId, "Broadcast");
        // }
        setSessionId(newSessionId);
        setSessionStartTime(new Date());
      } else {
        console.log("Session already started.");
      }
      setIsBlocking(true);
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);

  const stopLiveSession = useCallback(async () => {
    try {
      if (!!sessionId) {
        await endSession(sessionId);
        // returnStopRecording();
        setSessionId("");
        setSessionStartTime("");
        confirmNavigation(sessionId, "Broadcast");
      }
      setIsBlocking(false);
    } catch (error) {
      console.error("Failed to end the session:", error);
    }
  }, [sessionId, endSession, isBlocking, isAttemptingToNavigate]);

  const returnStopRecording = async () => {
    let count = 0;
    let failed = true;
    stopRecordingRef.current = setInterval(async () => {
      if (count >= 4 || !failed) {
        setRecordingEnabled(false);
        clearInterval(stopRecordingRef.current);
        stopRecordingRef.current = null;
      }
      const { result, error } = await stopRecording(sessionId, "Broadcast");
      count++;
      if (!error) {
        console.log("no error");
        failed = false;
        clearInterval(stopRecordingRef.current);
        stopRecordingRef.current = null;
        setRecordingEnabled(false);
      }
    }, 2000);
  };

  const ControlsMenu = () => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">
            <Tooltip content={"Options"}>
              <EllipsisVertical className="text-inherit h-4 w-4 md:h-6 md:w-6" />
            </Tooltip>
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            {hasAccess(role, "features", FEATURES.NOTICE) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowNotice />
              </DropdownMenu.Item>
            )}
            {hasAccess(role, "features", FEATURES.QUIZ) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowQuiz />
              </DropdownMenu.Item>
            )}
            {hasAccess(role, "features", FEATURES.POLL) && (
              <DropdownMenu.Item className="cursor-pointer group leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative py-1 select-none outline-none data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-lightgrey">
                <ShowPoll />
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  };

  return (
    <div className="w-full flex items-center justify-center shrink-0 gap-2">
      <div className="flex md:flex-wrap items-center justify-center w-full md:px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start md:w-3/5 gap-1 md:gap-8">
          <Tooltip content={`${micMuted ? "Unmute" : "Mute"}`}>
            <span>
              <MuteButton
                muted={micMuted}
                handleMicMute={handleMicMute}
                disabled={!permissions}
              />
            </span>
          </Tooltip>
          <Tooltip content={`${cameraActive ? "Hide camera" : "Show camera"}`}>
            <span>
              <CamButton
                muted={!cameraActive}
                handleCameraMute={handleCameraMute}
                disabled={!permissions}
              />
            </span>
          </Tooltip>

          <Tooltip
            content={`${
              screenShareActive ? "Stop sharing" : "Share your screen"
            }`}
          >
            <span>
              <ScreenShareButton
                active={screenShareActive}
                handleScreenShare={handleScreenShare}
                disabled={!permissions}
              />
            </span>
          </Tooltip>
          <Tooltip content="Select a Virtual Background">
            <span>
              <VirtualBackground />
            </span>
          </Tooltip>
          {/* content={`${isLive ? "Settings cannot be changed while live." : "Open Setting"}`} */}

          {connectionState === "connected" ? (
            <span>{<ControlsMenu />}</span>
          ) : (
            <Tooltip content={"Open Settings"}>
              <span>
                <SettingsButton
                  isLive={isLive}
                  handleSettings={handleSettings}
                />
              </span>
            </Tooltip>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center w-2/5 md:w-2/5 ml-0.5 md:ml-0">
          <StreamButton
            isLive={isLive}
            handleStream={!username || !authToken ? handleLogin : handleStream}
            loading={streamPending}
            className="w-full"
            disabled={!permissions || streamPending || !isInitilized}
          />
        </div>
      </div>
    </div>
  );
}

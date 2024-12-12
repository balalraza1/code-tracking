import { useToast } from "@/components/ui/use-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { BroadcastContext } from "../../providers/BroadcastContext";
import { BroadcastLayoutContext } from "../../providers/BroadcastLayoutContext";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { DialogContext } from "../../providers/ModalContext";
import ControlBar from "../ControlBar";
import StatusBar from "../StatusBar";
import StreamPreview from "../StreamPreview";
import ShowNotice from "../Notice/ShowNotice";
import Chat from "../../components/Chat";
import VirtualBackground from "../../components/VirtualBackground";
import CameraMicAccessError from "../CameraMicAccessError";
import ShowPoll from "../../ShowPoll";

import Login from "../Login";
import ShowQuiz from "../../ShowQuiz";
export default function GoLive() {
  const { toast } = useToast();
  const [isInitializeComplete, setIsInitializeComplete] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const { showFullScreenCam, refreshCurrentScene } = useContext(
    BroadcastLayoutContext
  );
  const {
    isLive,
    isSupported,
    broadcastClientRef,
    createBroadcastClient,
    destroyBroadcastClient,
    broadcastClientMounted,
    connectionState,
  } = useContext(BroadcastContext);
  const {
    username,
    authToken,
    configRef,
    micMuted,
    setMicMuted,
    cameraActive,
    setCameraActive,
    sessionId,
  } = useContext(UserSettingsContext);
  const { openDialog } = useContext(DialogContext);
  const {
    setInitialDevices,
    cleanUpDevices,
    refreshSceneRef,
    localAudioDeviceError,
    localVideoDeviceError,
  } = useContext(LocalMediaContext);

  const previewRef = useRef(undefined);

  const sdkIsStarting = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      if (micMuted === true) {
        setMicMuted(false);
      }
      if (cameraActive !== true) {
        setCameraActive(true);
      }
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (sdkIsStarting.current) return;
      sdkIsStarting.current = true;

      const { audioDeviceId, audioStream, videoDeviceId, videoStream } =
        await setInitialDevices();
      if (!broadcastClientRef.current) {
        await createBroadcastClient({
          config: configRef.current,
        });
        refreshSceneRef.current = refreshCurrentScene;
        showFullScreenCam({
          cameraStream: videoStream,
          cameraId: videoDeviceId,
          cameraIsCanvas: false,
          micStream: audioStream,
          micId: audioDeviceId,
          showMuteIcon: false,
        });

        setIsInitializeComplete(true);
      }
    };
    initialize();

    return () => {
      if (broadcastClientRef.current)
        destroyBroadcastClient(broadcastClientRef.current);
      cleanUpDevices();
    };
  }, []);

  useEffect(() => {
    if (
      broadcastClientMounted &&
      !localVideoDeviceError &&
      !localAudioDeviceError
    )
      broadcastClientRef.current.attachPreview(previewRef.current);
    return () => {
      if (broadcastClientRef.current)
        broadcastClientRef.current.detachPreview();
    };
  }, [broadcastClientMounted, localVideoDeviceError, localAudioDeviceError]);

  useEffect(() => {
    if (!isSupported) {
      toast({
        variant: "default",
        title: "Error:",
        description:
          "This browser is not fully supported. Certain features may not work as expected.",
      });
    }
  }, [isSupported]);

  useEffect(() => {
    (!username || !authToken) &&
      openDialog({
        header: "Login to GoLive",
        description:
          "Sign in now to start your live broadcast. Access and adjust your streaming settings in the 'Settings' ",
        content: <Login />,
      });
  }, [isLive, openDialog]);

  if (isInitializeComplete && (localAudioDeviceError || localVideoDeviceError))
    return <CameraMicAccessError />;

  return (
    <div className="flex flex-col md:flex-row w-full h-screen md:overflow-hidden">
      <div className="w-full md:w-3/4 h-full flex justify-center items-start md:items-center md:px-8 border-r-2">
        <div className="flex flex-col items-center w-full">
          <StatusBar />
          <div className="w-full md:w-[100%]">
            <StreamPreview previewRef={previewRef} />
          </div>
          <div className="w-full flex flex-col gap-4 md:my-2">
            {broadcastClientRef?.current ? (
              <ControlBar
                recordingEnabled={recordingEnabled}
                setRecordingEnabled={setRecordingEnabled}
              />
            ) : null}
          </div>
        </div>
      </div>
      {/* <div className="w-full md:w-1/4 h-full"></div> */}
      {connectionState === "connected" && (
        <div className="w-full md:w-1/4 h-[40vh] md:h-screen box-content relative">
          <Chat mode="LIVE" />
        </div>
      )}
    </div>
  );
}

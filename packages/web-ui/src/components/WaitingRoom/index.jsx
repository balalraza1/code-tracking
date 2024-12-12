import React, { useContext, useEffect, useRef } from "react";
import LocalMediaProvider, {
  LocalMediaContext,
} from "../../providers/LocalMediaContext";
import StageProvider from "../../providers/StageContext";
import StageLayoutProvider, {
  StageLayoutContext,
} from "../../providers/StageLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { VirtualBackgroundContext } from "../../providers/VirtualBackgroundContext";
import { Badge } from "../../shadcn/components/ui/badge";
import { Mic, MicOff } from "lucide-react";
import PreviewControlBar from "./PreviewControlBar";
import AnnotationProvider from "../../providers/AnnotationContext";
import VirtualBackgroundProvider from "../../providers/VirtualBackgroundContext";
import { Button } from "../../shadcn/components/ui/button";
import { getSessionDetails } from "../../api/session";
import { joinStage } from "../../api/stage";
import { useParams, useNavigate } from "react-router-dom";
import { backgrounds } from "../../constants";

const LocalParticipantVideo = () => {
  const { localVideoStreamRef } = useContext(LocalMediaContext);
  const { micMuted, cameraActive, vbgIndex } = useContext(UserSettingsContext);
  const { virtualBgEnabled, virtualBgStream, enableVirtualBg } = useContext(
    VirtualBackgroundContext
  );
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (audioRef.current && stream) {
          audioRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, [micMuted]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current && stream) {
          virtualBgEnabled
            ? (videoRef.current.srcObject = virtualBgStream)
            : (videoRef.current.srcObject = stream);
        }
      })
      .then(() => {
        if (!vbgIndex) enableVirtualBg(backgrounds[0], true);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, [cameraActive, vbgIndex, virtualBgStream]);

  return (
    <>
      <div className="w-full h-full">
        {cameraActive ? (
          <video
            muted
            autoPlay
            playsInline
            ref={videoRef}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
            Camera Off
          </div>
        )}
      </div>
      {!micMuted && (
        <audio ref={audioRef} autoPlay style={{ display: "none" }} />
      )}
    </>
  );
};

const WaitingRoom = () => {
  const {
    micMuted,
    participantToken,
    setStageGroupId,
    username,
    setParticipantId,
    setParticipantToken,
  } = useContext(UserSettingsContext);
  const { sessionId } = useParams();
  let navigate = useNavigate();
  const { localVideoStreamRef } = useContext(LocalMediaContext);

  const validateTracks = (stream) => {
    if (stream && typeof stream.getTracks === "function") {
      const tracks = stream.getTracks();
      return (
        tracks.length > 0 &&
        tracks.every((track) => {
          console.log("Track State:", track.readyState);

          return track.readyState === "live";
        })
      );
    }
    return false;
  };

  const handleStartLiveClass = async () => {
    try {
      const { result: sessionResult } = await getSessionDetails(sessionId);
      setStageGroupId(sessionResult.stageGroupId);
      console.log(sessionResult.stageGroupId, "response");
      const { result } = await joinStage({
        groupId: sessionResult.stageGroupId,
        userId: username,
        attributes: {
          username: username,
        },
      });
      if (result?.stage?.token) {
        setParticipantToken(result.stage.token.token);
        setParticipantId(result.stage.token.participantId);
        navigate(`/stagesession/${sessionId}`);
      }
    } catch (error) {
      console.error("Error joining stage:", error);
    }
  };
  const validation = validateTracks(localVideoStreamRef?.current);

  return (
    <LocalMediaProvider>
      <VirtualBackgroundProvider>
        <AnnotationProvider>
          <StageProvider>
            <StageLayoutProvider>
              <div className="flex flex-row h-full p-8 gap-8">
                <div className="flex w-1/2 1/2">
                  <div className="w-full aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
                    {true ? (
                      <LocalParticipantVideo />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-2xl">
                        Allow Camera and Mic Permissions
                      </div>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <PreviewControlBar />
                    </div>
                  </div>
                </div>
                {sessionId && (
                  <Button onClick={handleStartLiveClass}>Join Session</Button>
                )}
              </div>
            </StageLayoutProvider>
          </StageProvider>
        </AnnotationProvider>
      </VirtualBackgroundProvider>
    </LocalMediaProvider>
  );
};

export default WaitingRoom;

import React, { useContext, useEffect, useRef } from "react";
import LocalMediaProvider, {
  LocalMediaContext,
} from "../../providers/LocalMediaContext";
import StageProvider from "../../providers/StageContext";
import StageLayoutProvider, {
  StageLayoutContext,
} from "../../providers/StageLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { Badge } from "../../shadcn/components/ui/badge";
import { Mic, MicOff } from "lucide-react";
import PreviewControlBar from "../ControlBar/PreviewControlBar";

const LocalParticipantVideo = () => {
  const { localVideoStreamRef } = useContext(LocalMediaContext);
  const { micMuted, cameraActive } = useContext(UserSettingsContext);
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
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, [cameraActive]);

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

const StagePreview = () => {
  const { micMuted } = useContext(UserSettingsContext);

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
 
  const validation = validateTracks(localVideoStreamRef?.current);

  return (
    <LocalMediaProvider>
      <StageProvider>
        <StageLayoutProvider>
          <div className="flex w-full h-full">
            <div className="w-full aspect-video bg-gray-200 rounded-lg relative overflow-hidden">
            {validation ? (
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
        </StageLayoutProvider>
      </StageProvider>
    </LocalMediaProvider>
  );
};

export default StagePreview;
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import {
  Stage,
  StageConnectionState,
  StageEvents,
  StreamType,
} from "amazon-ivs-web-broadcast";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import useDeviceType from "../../hooks/useDeviceType";

const Video = ({
  className,
  participant,
  streamsToDisplay,
  username,
  participantSize,
  // localParticipant,
}) => {
  const { micMuted } = useContext(UserSettingsContext);

  const videoStream = streamsToDisplay.find(
    (stream) => stream.streamType === StreamType.VIDEO
  );
  const audioStream = streamsToDisplay.find(
    (stream) => stream.streamType === StreamType.AUDIO
  );

  const { audioMuted, videoStopped, isLocal } = participant;
  const [isTalking, setisTalking] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && videoStream) {
      const stream = new MediaStream([videoStream.mediaStreamTrack]);
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, videoStream]);

  useEffect(() => {
    if (audioRef.current && audioStream) {
      audioRef.current.srcObject = new MediaStream([
        audioStream.mediaStreamTrack,
      ]);
    }
    const startAudioProcessing = async () => {
      if (!audioRef.current || !audioStream) {
        console.error("No audio stream found!");
        return;
      }

      try {
        const audioContext = new window.AudioContext();
        await audioContext.audioWorklet.addModule(
          new URL("../../../public/vad-processor.js", import.meta.url)
        );

        const microphone = audioContext.createMediaStreamSource(
          new MediaStream([audioStream.mediaStreamTrack])
        );
        const vadNode = new AudioWorkletNode(audioContext, "vad-processor");

        vadNode.port.onmessage = (event) => {
          setisTalking(event.data.isTalking);
        };

        microphone.connect(vadNode).connect(audioContext.destination);
      } catch (err) {
        console.error("Error accessing the microphone", err);
      }
    };

    startAudioProcessing();
  }, [audioRef, audioStream]);

  const { isMobile, isTab } = useDeviceType();

  const isMicMute = () => (isLocal ? micMuted : audioMuted);

  return (
    <div className="relative">
      <video
        key={participant?.id}
        muted
        autoPlay
        playsInline
        className={className}
        ref={videoRef}
      />
      <audio ref={audioRef} autoPlay muted={isLocal} />

      <div
        className={`absolute bottom-0 left-0 right-0 overlay-pill px-1 md:px-2 flex flex-wrap items-center justify-between w-full ${
          videoStopped ? "inset-0" : ""
        }`}
      >
        {videoStopped ? (
          <div className="flex items-center justify-center w-full h-full">
            <Badge className="text-xs md:text-md lg:text-lg px-3 py-1">
              {username
                ? username.length > ((isTab || isMobile) ? 8 : 16)
                  ? `${username.slice(0, (isTab || isMobile) ? 8 : 16)}...`
                  : username
                : `User${!isLocal ? "-" + participantSize : ""}`}
            </Badge>
          </div>
        ) : (
          <Badge className="text px-3 py-1">
            {username
              ? username.length > 8
                ? `${username.slice(0, 8)}...`
                : username
              : `User${!isLocal ? "-" + participantSize : ""}`}
          </Badge>
        )}
        <Badge className="absolute bottom-1 right-1">
          {!isMicMute() ? (
            <Mic size={16} color={isTalking ? "green" : "white"} />
          ) : (
            <MicOff color="red" size={16} />
          )}
        </Badge>
      </div>
    </div>
  );
};

export default Video;

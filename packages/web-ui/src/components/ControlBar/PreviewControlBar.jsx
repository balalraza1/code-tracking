import { useContext } from "react";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { StageLayoutContext } from "../../providers/StageLayoutContext";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Tooltip from "../Tooltip";

export default function PreviewControlBar() {
  const { permissions } = useContext(LocalMediaContext);
  const { micMuted, cameraActive } = useContext(UserSettingsContext);
  const { handleMicMute, handleCameraMute } = useContext(StageLayoutContext);

  return (
    <div className="flex items-center justify-center gap-4">
      <Tooltip content={micMuted ? "Unmute" : "Mute"}>
        <button
          className={`${micMuted ? 'bg-red-500 border-red-500' : 'bg-green-500 border-green-500'} text-white rounded-full border-2 p-2 focus:outline-none`}
          onClick={handleMicMute}
          disabled={!permissions}
        >
          {micMuted ? (
            <MicOff className="h-4 w-4 md:h-6 md:w-6" />
          ) : (
            <Mic className="h-4 w-4 md:h-6 md:w-6" />
          )}
        </button>
      </Tooltip>
      <Tooltip content={cameraActive ? "Turn off camera" : "Turn on camera"}>
        <button
          className={`${cameraActive ? 'bg-green-500 border-green-500' : 'bg-red-500 border-red-500'} text-white rounded-full border-2 p-2 focus:outline-none`}
          onClick={handleCameraMute}
          disabled={!permissions}
        >
          {cameraActive ? (
            <Video className="h-4 w-4 md:h-6 md:w-6" />
          ) : (
            <VideoOff className="h-4 w-4 md:h-6 md:w-6" />
          )}
        </button>
      </Tooltip>
    </div>
  );
}

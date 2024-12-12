import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { BroadcastLayoutContext } from "../../providers/BroadcastLayoutContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
export default function StreamPreview({ previewRef }) {
  const { screenShareActive } = useContext(BroadcastLayoutContext);
  const { localVideoMirror, cameraActive } = useContext(UserSettingsContext);

  const [mounted, setMounted] = useState(false);

  const shouldMirrorPreview =
    cameraActive && !screenShareActive && localVideoMirror && mounted;

  const mirrorClass = clsx("w-full h-full overflow-hidden relative border-2", {
    "transform -scale-x-100": shouldMirrorPreview,
  });

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  return (
    <>
      <div className="flex items-center sm:px-4 shrink grow aspect-video">
        <div className="w-full h-full flex items-center rounded-md bg-surfaceAlt ring-1 ring-inset ring-black/5 dark-theme:ring-white/5 overflow-hidden">
          <div className="w-full h-full overflow-hidden relative">
            <div className={mirrorClass}>
              <canvas
                key="STREAM_PREVIEW_VIDEO"
                id="cam-video-preview"
                className="absolute inset-0 object-fill w-full h-full"
                ref={previewRef}
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

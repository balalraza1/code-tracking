import { Button } from "@/components/ui/button";
import { CircleX, ImagePlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { backgrounds } from "../../constants";
import { LocalMediaContext } from "../../providers/LocalMediaContext";
import { VirtualBackgroundContext } from "../../providers/VirtualBackgroundContext";
import { createScreenShareStageStream } from "../../utils/StageStrategy";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import Popover from "../Popover";

const VirtualBackground = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    localVideoStreamRef,
    localVirtualVideoStreamRef,
    localVirtualVideoStageStreamRef,
  } = useContext(LocalMediaContext);

  const {
    virtualBgEnabled,
    virtualBgStream,
    enableVirtualBg,
    enableVirtualBgBlur,
    disableVirtualBg,
  } = useContext(VirtualBackgroundContext);

  const { cameraActive, setVbgIndex, isStageOwner } =
    useContext(UserSettingsContext);

  useEffect(() => {
    localVirtualVideoStreamRef.current = virtualBgEnabled ? virtualBgStream : null;

    if (virtualBgEnabled && virtualBgStream) {
      const [screenTrack] = virtualBgStream.getVideoTracks();
      localVirtualVideoStageStreamRef.current = createScreenShareStageStream(screenTrack);
    }
  
  }, [virtualBgStream, virtualBgEnabled, localVideoStreamRef.current]);

  const handleRemoveVirtualBg = () => {
    disableVirtualBg();
    setVbgIndex(-1);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} disabled={!cameraActive}>
        <ImagePlus className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      <Popover
        isOpen={isOpen}
        handleClose={handleClose}
        content={
          <VirtualBackgroundSelector
            enableVirtualBg={enableVirtualBg}
            enableVirtualBgBlur={enableVirtualBgBlur}
            handleRemoveVirtualBg={handleRemoveVirtualBg}
            videoStream={localVideoStreamRef.current}
            handleClose={handleClose}
            setVbgIndex={setVbgIndex}
            isStageOwner={isStageOwner}
          />
        }
      />
    </>
  );
};

export default VirtualBackground;

const VirtualBackgroundSelector = ({
  enableVirtualBg,
  enableVirtualBgBlur,
  handleClose,
  handleRemoveVirtualBg,
  setVbgIndex,
  isStageOwner,
}) => {
  const handleEnableBg = (background) => {
    try {
      enableVirtualBg(background);
      setVbgIndex(backgrounds.indexOf(background));
      handleClose();
    } catch (error) {
      console.error("Failed to set virtual background:", error);
    }
  };

  const handleBgBlur = (background) => {
    try {
      enableVirtualBg(background, true);
      setVbgIndex(999);
      handleClose();
    } catch (error) {
      console.error("Failed to apply blur effect:", error);
    }
  };

  return (
    <div className="relative max-w-[500px] sm:max-w-[600px] md:max-w-[800px] p-0 md:p-2">
      <button
        onClick={handleClose}
        className="absolute -top-2 -right-4 md:-right-2"
      >
        <CircleX size={16} />
      </button>
      <div
        className={`grid ${
          isStageOwner ? `grid-cols-2` : `grid-cols-3`
        } gap-4 items-center justify-center mt-1`}
      >
        {!isStageOwner && (
          <button
            aria-label="Remove virtual background"
            className={`flex col-span-1 py-6 p-6 border border-gray-500 rounded items-center justify-center`}
            onClick={() => {
              handleRemoveVirtualBg();
            }}
          >
            <b>None</b>
          </button>)}

        <button
          aria-label="Apply blur effect"
          className={`flex col-span-1 py-6 p-6 border border-gray-500 rounded items-center justify-center`}
          onClick={() => handleBgBlur(backgrounds[0])}
        >
          <b>Blur</b>
        </button>
        {backgrounds.map((background, index) => (
          <div
            key={index}
            className={`col-span-1 border border-gray-500 rounded items-center justify-center cursor-pointer`}
            onClick={() => handleEnableBg(background)}
            role="button"
            aria-label={`Background ${index}`}
          >
            <img
              src={background}
              alt={`Background ${index}`}
              className="w-[300px] h-[75px] rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

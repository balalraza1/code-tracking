import { useRef, useState, useEffect, useCallback, useMemo ,useContext} from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { LocalMediaContext } from "../providers/LocalMediaContext";

const useVirtualBackground = () => {
  const {localVideoStreamRef} = useContext(LocalMediaContext)
  const [virtualBgEnabled, setVirtualBackgroundEnabled] = useState(false);
  const [virtualBgBlur, setVirtualBgBlur] = useState(false);
  const [virtualBgImageUrl, setVirtualBgImageUrl] = useState("");
  const [virtualBgStream, setVirtualBgStream] = useState(null);
  const hiddenImageRef = useRef(new Image());
  const segProcessRef = useRef(null);
  const hiddenCanvasRef = useRef(document.createElement("canvas"));

  useMemo(() => {
    segProcessRef.current = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
  }, []);

  useEffect(() => {
    if (!hiddenCanvasRef.current) {
      hiddenCanvasRef.current = document.createElement("canvas");
    }
  }, []);

  const processResults = useCallback(
    (results) => {
      try {
        hiddenCanvasRef.current.width = 1280;
        hiddenCanvasRef.current.height = 720;
        const hiddenCanvas = hiddenCanvasRef.current;
        const hiddenCanvasCtx = hiddenCanvas.getContext("2d");
        const canvasDimensions = [
          0,
          0,
          hiddenCanvas.width,
          hiddenCanvas.height,
        ];
        if (!hiddenCanvas || !hiddenCanvasCtx) return;

        hiddenCanvasCtx.clearRect(...canvasDimensions);

        if (virtualBgEnabled && hiddenImageRef.current) {
          hiddenCanvasCtx.drawImage(
            results.segmentationMask,
            ...canvasDimensions
          );
          hiddenCanvasCtx.globalCompositeOperation = "source-out";
          hiddenCanvasCtx.drawImage(
            hiddenImageRef.current,
            ...canvasDimensions
          );
        }

        if (virtualBgEnabled && virtualBgBlur) {
          hiddenCanvasCtx.globalCompositeOperation = "source-in";
          hiddenCanvasCtx.filter = "blur(7px)";
          hiddenCanvasCtx.drawImage(results.image, ...canvasDimensions);
          hiddenCanvasCtx.filter = "none";
        }

        hiddenCanvasCtx.globalCompositeOperation = "destination-over";
        hiddenCanvasCtx.drawImage(results.image, ...canvasDimensions);
      } catch (error) {
        console.error("Error processing video frame:", error);
      }
    },
    [virtualBgEnabled,virtualBgBlur]
  );

  useEffect(() => {
    if (!localVideoStreamRef?.current || !segProcessRef?.current) {
      return;
    }
    const virtualBgVideoEl = document.createElement("video");
    virtualBgVideoEl.srcObject = localVideoStreamRef.current;
    virtualBgVideoEl.muted = true;
    virtualBgVideoEl.preload = "auto";
    virtualBgVideoEl.width = 1280;
    virtualBgVideoEl.height = 720;
    try {
      virtualBgVideoEl.play();
    } catch (playError) {
      console.error("Error playing video stream:", playError);
    }

    const streamToMediaPipe = async () => {
      try {
        if (virtualBgVideoEl.readyState >= 2) {
          await segProcessRef.current.send({
            image: virtualBgVideoEl,
          });
        }
      } catch (sendError) {
        console.error("Error sending frame to MediaPipe:", sendError);
      }
      requestAnimationFrame(streamToMediaPipe);
    };

    hiddenImageRef.current.crossOrigin = "anonymous";
    hiddenImageRef.current.src = virtualBgImageUrl;
    hiddenImageRef.current.onload = () => {
      try {
        segProcessRef.current.setOptions({
          modelSelection: 1,
          selfieMode: false,
        });
        segProcessRef.current.onResults(processResults);
        streamToMediaPipe();
      } catch (setupError) {
        console.error("Error setting up segmentation processor:", setupError);
      }
    };

    return () => {
      virtualBgVideoEl.pause();
      virtualBgVideoEl.srcObject = null;
    };
  }, [virtualBgImageUrl, localVideoStreamRef?.current, processResults]);

  useEffect(() => {
    if (hiddenCanvasRef.current && virtualBgEnabled) {
      try {
        setVirtualBgStream(hiddenCanvasRef.current.captureStream(30));
      } catch (error) {
        console.error("Error capturing canvas stream:", error);
      }
    }
  }, [virtualBgEnabled]);

  const enableVirtualBg = useCallback(
    (imageUrl,enableBlur) => {
    try {
       
      setVirtualBackgroundEnabled(true);
      setVirtualBgImageUrl(imageUrl || "");
      setVirtualBgBlur(!!enableBlur);
    } catch (error) {
      console.error("Error setting virtual background:", error);
    }
    },
    [],
  );

  const disableVirtualBg = useCallback(() => {
    try {
      setVirtualBackgroundEnabled(false);
      setVirtualBgImageUrl("");
      setVirtualBgBlur(false);
    } catch (error) {
      console.error("Error disabling virtual background:", error);
    }
  }, [virtualBgEnabled]);

  return {
    virtualBgEnabled,
    virtualBgStream,
    enableVirtualBg,
    disableVirtualBg,
  };
};

export default useVirtualBackground;

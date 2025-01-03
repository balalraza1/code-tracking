import { useEffect, useRef, useState, useContext } from "react";
import { LocalMediaContext } from "../providers/LocalMediaContext";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { StageContext } from "../providers/StageContext";

const useComposeLayers = (videoUrl, videoStream, stageRef) => {
  const { localScreenShareStreamRef } = useContext(LocalMediaContext);
  const { activeScreenSharerId } = useContext(UserSettingsContext);
  const { localParticipant } = useContext(StageContext);

  const videoElement = useRef(document.createElement("video")).current;

  const [composingCanvas] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    return canvas;
  });

  const [whiteStream] = useState(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 640;
    canvas.height = 480;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.captureStream(30);
  });

  const annotationStreamRef = useRef(composingCanvas.captureStream(30));

  const konvaImageRef = useRef(null);
  const fileShareRef = useRef(null);
  const animationIdRef = useRef(null);
  const requestRef = useRef();

  // Function to validate the video stream tracks
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

  const playVideo = async () => {
    try {
      if (videoElement.readyState >= 2) {
        await videoElement.play();
      } else {
        videoElement.addEventListener(
          "loadeddata",
          async () => {
            await videoElement.play();
          },
          { once: true }
        );
      }
    } catch (error) {
      console.warn("Retrying playback:", error);
      setTimeout(playVideo, 300);
    }
  };
  // Function to synchronize video source with the video element
  useEffect(() => {
    const video = videoElement;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    // Initialize video source
    const initVideo = async () => {
      const localVideoStream =
        localParticipant?.id === activeScreenSharerId
          ? whiteStream
          : videoStream;

      if (validateTracks(localVideoStream)) {
        video.srcObject = localVideoStream;
        video.src = "";
      } else if (videoUrl) {
        video.srcObject = null;
        video.src = videoUrl;
      }

      await playVideo();
    };

    initVideo();

    return () => {
      video.pause();
      video.src = "";
      video.srcObject = null;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [
    videoUrl,
    videoStream,
    localParticipant?.id,
    localScreenShareStreamRef.current,
    activeScreenSharerId,
    whiteStream,
  ]);
  // Attempt to play video with retry logic if needed
  useEffect(() => {
    const attemptPlayVideo = async () => {
      try {
        await videoElement.play();
      } catch (error) {
        console.error("Error attempting to play video:", error);
        setTimeout(attemptPlayVideo, 300); // Retry after 300ms
      }
    };

    videoElement.addEventListener("play", () => {
      const update = () => {
        if (konvaImageRef.current) {
          if (fileShareRef.current) {
            konvaImageRef.current.getLayer().add(fileShareRef.current);
          }
          konvaImageRef.current.getLayer().batchDraw();
        }
        animationIdRef.current = requestAnimationFrame(update);
      };

      update();
    });

    videoElement.addEventListener("canplay", attemptPlayVideo);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      videoElement.removeEventListener("canplay", attemptPlayVideo);
    };
  }, [videoElement, fileShareRef]);

  // Main rendering logic
  useEffect(() => {
    if (!stageRef.current) return;
    if (!composingCanvas.width || !composingCanvas.height) return;

    const context = composingCanvas.getContext("2d");
    const videoLayer = stageRef.current.findOne("#video-layer");
    const drawingLayer = stageRef.current.findOne("#drawing-layer");
    const { width, height } = composingCanvas;

    const render = async () => {
      if (videoElement.readyState >= 3) {
        context.clearRect(0, 0, width, height);

        if (videoLayer) {
          const videoLayerCtx = videoLayer.getNativeCanvasElement();
          if (videoLayerCtx.width > 0 && videoLayerCtx.height > 0) {
            context.drawImage(videoLayerCtx, 0, 0, width, height);
          } else {
            console.error("Source canvas has zero width or height.");
          }
        }

        if (drawingLayer) {
          const drawingLayerCtx = drawingLayer.getNativeCanvasElement();
          if (drawingLayerCtx.width > 0 && drawingLayerCtx.height > 0) {
            context.drawImage(drawingLayerCtx, 0, 0, width, height);
          } else {
            console.error("Source canvas has zero width or height.");
          }
        }

        // Ensure all layers are fully drawn before updating the stream
        stageRef.current?.batchDraw();

        // Capture and update the stream only after the entire render is complete
        annotationStreamRef.current = composingCanvas.captureStream(30);
      }
      requestRef.current = requestAnimationFrame(render);
    };

    videoElement.play().then(() => {
      requestRef.current = requestAnimationFrame(render);
    });

    return () => {
      cancelAnimationFrame(requestRef.current);
      context.clearRect(0, 0, width, height);
    };
  }, [videoElement, composingCanvas, stageRef.current]);

  return {
    videoElement,
    konvaImageRef,
    fileShareRef,
    annotationStream: annotationStreamRef.current,
  };
};

export { useComposeLayers };

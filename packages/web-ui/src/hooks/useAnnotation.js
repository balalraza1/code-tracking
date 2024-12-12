import { useState } from "react";
import { useShapes } from "./useShapes";
import { useComposeLayers } from "./useComposeLayers";

const useAnnotation = () => {
  const [screenShareStream, setScreenShareStream] = useState(null);
  const [whiteboardOwner, setWhiteboardOwner] = useState(null);
  const {
    stageRef,
    transformerRef,
    rectangles,
    setRectangles,
    circles,
    setCircles,
    arrows,
    setArrows,
    scribbles,
    setScribbles,
    action,
    setAction,
    fillColor,
    setFillColor,
    onClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    handleExport,
    undo,
    redo,
    clearAll,
    clearCurrentPage,
    scaleFactorRef,
    chatRef,
    annotationReceiver,
    setAnnotationReceiver,
    pageAnnotations,
    currentPage,
    setCurrentPage,
  } = useShapes();

  const { videoElement, konvaImageRef, fileShareRef, annotationStream } =
    useComposeLayers("", screenShareStream, stageRef);

  return {
    stageRef,
    transformerRef,
    rectangles,
    setRectangles,
    circles,
    setCircles,
    arrows,
    setArrows,
    scribbles,
    setScribbles,
    action,
    setAction,
    fillColor,
    setFillColor,
    onClick,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    handleExport,
    undo,
    redo,
    clearAll,
    clearCurrentPage,
    scaleFactorRef,
    chatRef,
    annotationReceiver,
    setAnnotationReceiver,
    videoElement,
    konvaImageRef,
    fileShareRef,
    annotationStream,
    setScreenShareStream,
    pageAnnotations,
    whiteboardOwner,
    setWhiteboardOwner,
    currentPage,
    setCurrentPage,
  };
};

export default useAnnotation;

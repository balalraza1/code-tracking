import { StreamType } from "amazon-ivs-web-broadcast";
import { Paperclip } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import { Document, Page, pdfjs } from "react-pdf";
import { DRAW_ACTIONS, FEATURES, hasAccess } from "../../constants";
import { AnnotationContext } from "../../providers/AnnotationContext";
import { StageContext } from "../../providers/StageContext";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import Tooltip from "../Tooltip";
import PaginationComponent from "../WhiteBoardPagination";
import Arrow from "./Elements/Arrow";
import Circle from "./Elements/Circle";
import Rectangle from "./Elements/Rectangle";
import Scribble from "./Elements/Scribble";
import ToolBar from "./Elements/ToolBar";
import { sendChatEvent } from "../../api/channel";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const referenceDimensions = {
  width: 1000,
  height: 800,
};

export default function AnnoBoard({
  width,
  height,
  screenSharer,
  whiteboarding,
  noteboarding,
}) {
  const { username, role, activeScreenSharerId, stageInfo } =
    useContext(UserSettingsContext);
  const { localParticipant } = useContext(StageContext);

  const {
    stageRef: canvasStageRef,
    transformerRef,
    rectangles,
    circles,
    arrows,
    scribbles,
    // setRectangles,
    // setCircles,
    // setArrows,
    // setScribbles,
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
    videoElement,
    konvaImageRef,
    fileShareRef,
    setScreenShareStream,
    pageAnnotations,
    whiteboardOwner,
    currentPage,
    setCurrentPage,
  } = useContext(AnnotationContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const audioRef = useRef(null);
  const hasPaginationAccess = whiteboardOwner === username;

  const hasAnnotationAccess = hasAccess(
    role,
    "features",
    FEATURES.START_WHITEBOARDING
  );

  const { streams } = screenSharer;

  const videoStream = streams?.find(
    (stream) => stream.streamType === StreamType.VIDEO
  );

  const audioStream = streams?.find(
    (stream) => stream.streamType === StreamType.AUDIO
  );

  useEffect(() => {
    if (audioStream) {
      const stream = new MediaStream([audioStream.mediaStreamTrack]);
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
    }
  }, [audioStream]);

  useEffect(() => {
    clearAll();
    clearCurrentPage();
    setCurrentPage(1)
  }, [whiteboarding, noteboarding]);

  useEffect(() => {
    if (!!width && !!height) {
      scaleFactorRef.current = {
        x: +(width / referenceDimensions.width).toFixed(3),
        y: +(height / referenceDimensions.height).toFixed(3),
      };
    }
  }, [width, height]);

  useState(() => {
    if (videoStream) {
      const stream = new MediaStream([videoStream.mediaStreamTrack]);
      setScreenShareStream(stream);
    }
  }, [videoStream]);

  const [pages, setPages] = useState({
    1: { lines: [], shapes: [], actions: [] },
  });

  const [undoStack, setUndoStack] = useState([{ lines: [], shapes: [] }]);
  const [redoStack, setRedoStack] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfImage, setPdfImage] = useState(null);
  const canvasRef = useRef(null);
  const [pdfPosition, setPdfPosition] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const isDraggable = action === DRAW_ACTIONS.SELECT && !pdfImage;

  const resetCanvas = () => {
    setPages({
      1: { lines: [], shapes: [], actions: [] },
    });
    setUndoStack([{ lines: [], shapes: [] }]);
    setRedoStack([]);
    setCurrentPage(1);
  };

  const clearCanvas = () => {
    setPages((prevPages) => ({
      ...prevPages,
      [currentPage]: { lines: [], shapes: [], actions: [] },
    }));
    setUndoStack([{ lines: [], shapes: [] }]);
    setRedoStack([]);
  };

  const navigatePage = async (page) => {
    if (!pages[page]) {
      setPages((prevPages) => ({
        ...prevPages,
        [page]: { lines: [], shapes: [], actions: [] },
      }));
    }
    setCurrentPage(page);
    setPdfPosition({ x: 0, y: 0 });
    // clearCurrentPage(page);
    // Load annotations for the new page
    // const pageAnnotations = pages[page] || {
    //   lines: [],
    //   shapes: [],
    //   actions: [],
    // };
    // setRectangles(
    //   pageAnnotations.shapes.filter((shape) => shape.type === "rectangle")
    // );
    // setCircles(
    //   pageAnnotations.shapes.filter((shape) => shape.type === "circle")
    // );
    // setArrows(pageAnnotations.shapes.filter((shape) => shape.type === "arrow"));
    // setScribbles(pageAnnotations.lines);

    // Reset the transformer
    const eventPayload = {
      roomId: stageInfo?.current?.chatRoomArn,
      eventName: "app:PAGE_CHANGE",
      eventAttributes: {
        page: JSON.stringify(page),
      },
    };
    await sendChatEvent(eventPayload);
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const tempFile = URL.createObjectURL(file);
    if (file) {
      setPdfFile(tempFile);
      setNumPages(0);
      setCurrentPage(1);
      resetCanvas();
      setPdfPosition({ x: 0, y: 0 });
    } else {
      console.error("Failed to load file.");
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageRenderSuccess = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const img = new Image();
      img.src = canvas.toDataURL();
      img.onload = () => {
        setPdfImage(img);
      };
    }
  };

  const handleDragMove = (e) => {
    const imageHeight = (width * pdfImage.height) / pdfImage.width;
    const stageHeight = height;
    let newY = e.target.y();
    if (newY > 0) {
      newY = 0;
    } else if (newY < stageHeight - imageHeight) {
      newY = stageHeight - imageHeight;
    }
    setPdfPosition({
      x: 0,
      y: newY,
    });
    e.target.y(newY);
    e.target.x(0);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative bg-white" style={{ width, height }}>
        {/* Controls */}
        {hasAnnotationAccess && (
          <ToolBar
            action={action}
            setAction={setAction}
            fillColor={fillColor}
            setFillColor={setFillColor}
            handleExport={handleExport}
            undo={undo}
            redo={redo}
            clearAll={clearAll}
            clearCurrentPage={() => clearCurrentPage(currentPage)}
            whiteboarding={whiteboarding}
            isDrawingMode={isDrawingMode}
            setIsDrawingMode={setIsDrawingMode}
            isPdfScrollable={!!pdfImage}
          />
        )}
        {whiteboarding && (
          <div className="absolute bottom-2 z-50 right-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 px-3 w-fit mx-auto border shadow-lg rounded-lg bg-white">
              <div className="flex">
                {whiteboarding &&
                  hasAnnotationAccess &&
                  hasPaginationAccess && (
                    <Tooltip content="Upload PDF">
                      <label htmlFor="fileInput">
                        <span className="rounded flex items-center justify-center cursor-pointer">
                          <Paperclip size="40px" className="p-2" />
                        </span>
                      </label>
                    </Tooltip>
                  )}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              {whiteboarding && hasAnnotationAccess && hasPaginationAccess && (
                <div className="flex flex-col md:flex-row justify-end items-end md:col-span-1 md:relative z-50 py-2 mx-2 md:mx-0 w-auto">
                  <div className="gap-5 border rounded-lg bg-white">
                    <PaginationComponent
                      currentPage={currentPage}
                      numPages={numPages}
                      navigatePage={navigatePage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {whiteboarding && (
          <div
            style={{
              display: "none",
            }}
          >
            {pdfFile && (
              <Document
                file={pdfFile}
                onLoadSuccess={handleLoadSuccess}
                className="pdf-document"
              >
                <Page
                  key={`page_${currentPage}`}
                  pageNumber={currentPage}
                  width={width}
                  onRenderSuccess={handlePageRenderSuccess}
                  scale={3.0}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  canvasRef={canvasRef}
                />
              </Document>
            )}
          </div>
        )}

        {/* Canvas */}
        <div
          style={{ position: "relative", overflow: "hidden", width, height }}
        >
          <Stage
            // className={"z-20 relative"}
            ref={canvasStageRef}
            width={width}
            style={{ background: "#ffffff" }}
            height={height}
            onMouseDown={
              hasAnnotationAccess
                ? () => {
                    if (whiteboarding || noteboarding) {
                      if (!isDrawingMode && !whiteboarding) return;
                      setIsDrawing(true);
                      onPointerDown(username, currentPage);
                    } else {
                      setIsDrawing(true);
                      onPointerDown(username, currentPage);
                    }
                  }
                : undefined
            }
            onMouseMove={
              hasAnnotationAccess
                ? () => {
                    if (whiteboarding || noteboarding) {
                      if ((!isDrawing || !isDrawingMode) && !whiteboarding)
                        return;
                      onPointerMove(username, currentPage);
                    } else {
                      onPointerMove(username, currentPage);
                    }
                  }
                : undefined
            }
            onMouseUp={
              hasAnnotationAccess
                ? () => {
                    setIsDrawing(false);
                    onPointerUp(currentPage);
                  }
                : undefined
            }
          >
            <Layer id="video-layer">
              <KonvaImage
                ref={konvaImageRef}
                image={videoElement}
                height={height}
                width={width}
                fill="white"
              />
            </Layer>
            <Layer id="drawing-layer">
              {whiteboarding && pdfImage && (
                <KonvaImage
                  x={pdfPosition.x}
                  y={pdfPosition.y}
                  height={(width * pdfImage.height) / pdfImage.width}
                  width={width}
                  image={pdfImage}
                  ref={(node) => {
                    fileShareRef.current = node;
                  }}
                  draggable={action === DRAW_ACTIONS.SELECT}
                  onDragMove={handleDragMove}
                />
              )}

              {/* {pageAnnotations[currentPage]?.[DRAW_ACTIONS.RECTANGLE]?.map(
                (rectangle) => (
                  <Rectangle
                    key={rectangle.id}
                    draggable={isDraggable}
                    onClick={onClick}
                    {...rectangle}
                  />
                )
              )} */}
              {Object.keys(rectangles).map((key) => {
                const strokesArray = rectangles[key].filter((s) =>
                  pageAnnotations[currentPage]?.[DRAW_ACTIONS.RECTANGLE]
                    ?.map((s) => s.id)
                    .includes(s.id)
                );
                return strokesArray && strokesArray.length > 0
                  ? strokesArray.map((rectangle) => (
                      <Rectangle
                        key={rectangle.id}
                        draggable={isDraggable}
                        onClick={onClick}
                        {...rectangle}
                      />
                    ))
                  : null;
              })}

              {/* {pageAnnotations[currentPage]?.[DRAW_ACTIONS.CIRCLE]?.map(
                (circle) => (
                  <Circle
                    key={circle.id}
                    draggable={isDraggable}
                    onClick={onClick}
                    {...circle}
                  />
                )
              )} */}
              {Object.keys(circles).map((key) => {
                const strokesArray = circles[key].filter((s) =>
                  pageAnnotations[currentPage]?.[DRAW_ACTIONS.CIRCLE]
                    ?.map((s) => s.id)
                    .includes(s.id)
                );
                return strokesArray && strokesArray.length > 0
                  ? strokesArray.map((circle) => (
                      <Circle
                        key={circle.id}
                        draggable={isDraggable}
                        onClick={onClick}
                        {...circle}
                      />
                    ))
                  : null;
              })}

              {/* {pageAnnotations[currentPage]?.[DRAW_ACTIONS.ARROW]?.map(
                (arrow) => (
                  <Arrow
                    key={arrow.id}
                    draggable={isDraggable}
                    onClick={onClick}
                    {...arrow}
                  />
                )
              )} */}
              {Object.keys(arrows).map((key) => {
                const strokesArray = arrows[key].filter((s) =>
                  pageAnnotations[currentPage]?.[DRAW_ACTIONS.ARROW]
                    ?.map((s) => s.id)
                    .includes(s.id)
                );
                return strokesArray && strokesArray.length > 0
                  ? strokesArray.map((arrow) => (
                      <Arrow
                        key={arrow.id}
                        draggable={isDraggable}
                        onClick={onClick}
                        {...arrow}
                      />
                    ))
                  : null;
              })}

              {/* {pageAnnotations[currentPage]?.[DRAW_ACTIONS.SCRIBBLE]?.map(
                (scribble) => (
                  <Scribble
                    key={scribble.id}
                    draggable={isDraggable}
                    onClick={onClick}
                    {...scribble}
                  />
                )
              )} */}
              {Object.keys(scribbles).map((key) => {
                const strokesArray = scribbles[key].filter((s) =>
                  pageAnnotations[currentPage]?.[DRAW_ACTIONS.SCRIBBLE]
                    ?.map((s) => s.id)
                    .includes(s.id)
                );
                return strokesArray && strokesArray.length > 0
                  ? strokesArray.map((scribble) => (
                      <Scribble
                        key={scribble.id}
                        draggable={isDraggable}
                        onClick={onClick}
                        {...scribble}
                      />
                    ))
                  : null;
              })}
              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>
        </div>
      </div>

      <audio
        ref={audioRef}
        autoPlay
        controls
        style={{ display: "none" }}
        muted={localParticipant?.id === activeScreenSharerId}
      />
    </div>
  );
}

import { useState, useRef, useCallback, useEffect } from "react";
import { DRAW_ACTIONS } from "../constants";
import { nanoid } from "nanoid";
import useScribbles from "../components/AnnoBoard/ElementsHooks/useScribbles";
import useRectangles from "../components/AnnoBoard/ElementsHooks/useRectangles";
import useArrows from "../components/AnnoBoard/ElementsHooks/useArrows";
import useCircles from "../components/AnnoBoard/ElementsHooks/useCircles";

import {
  compressData,
  decompressData,
  findShape,
} from "../components/AnnoBoard/UtilityFunctions";

// Array of 60 prominent colors
const prominentColors = [
  "#FF5733", // Red
  "#FFBD33", // Orange
  "#FF33E9", // Pink
  "#33FF57", // Green
  "#3366FF", // Blue
  "#A033FF", // Purple
  "#FF3366", // Magenta
  "#33FFE1", // Cyan
  "#FF33B8", // Violet
  "#FFA233", // Amber
  "#33FFC8", // Turquoise
  "#FF3333", // Crimson
  "#FF5733", // Red
  "#FFBD33", // Orange
  "#FF33E9", // Pink
  "#33FF57", // Green
  "#3366FF", // Blue
  "#A033FF", // Purple
  "#FF3366", // Magenta
  "#33FFE1", // Cyan
  "#FF33B8", // Violet
  "#FFA233", // Amber
  "#33FFC8", // Turquoise
  "#FF3333", // Crimson
  "#FF5733", // Red
  "#FFBD33", // Orange
  "#FF33E9", // Pink
  "#33FF57", // Green
  "#3366FF", // Blue
  "#A033FF", // Purple
  "#FF3366", // Magenta
  "#33FFE1", // Cyan
  "#FF33B8", // Violet
  "#FFA233", // Amber
  "#33FFC8", // Turquoise
  "#FF3333", // Crimson
  "#FF5733", // Red
  "#FFBD33", // Orange
  "#FF33E9", // Pink
  "#33FF57", // Green
  "#3366FF", // Blue
  "#A033FF", // Purple
  "#FF3366", // Magenta
  "#33FFE1", // Cyan
  "#FF33B8", // Violet
  "#FFA233", // Amber
  "#33FFC8", // Turquoise
  "#FF3333", // Crimson
];

// Function to pick a random color from the prominent colors array
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * prominentColors.length);
  return prominentColors[randomIndex];
}

export const useShapes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageRef = useRef(currentPage);
  const [pageAnnotations, setPageAnnotations] = useState({});

  const { scribbles, setScribbles, addScribbles, updateScribbles } =
    useScribbles();
  const { rectangles, setRectangles, addRectangles, updateRectangles } =
    useRectangles();
  const { arrows, setArrows, addArrows, updateArrows } = useArrows();
  const { circles, setCircles, addCircles, updateCircles } = useCircles();

  const stageRef = useRef();
  const chatRef = useRef();
  const scaleFactorRef = useRef({ x: 0, y: 0 });
  const [action, setAction] = useState(DRAW_ACTIONS.SCRIBBLE);
  const [fillColor, setFillColor] = useState(() => getRandomColor());
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const messageQueue = useRef([]);
  const isPaining = useRef();
  const currentShapeId = useRef();
  const currentUserId = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    currentPageRef.current = currentPage;
    // setScribbles(pageAnnotations[currentPage]?.SCRIBBLE || []);
    // setRectangles(pageAnnotations[currentPage]?.RECTANGLE || []);
    // setArrows(pageAnnotations[currentPage]?.ARROW || []);
    // setCircles(pageAnnotations[currentPage]?.CIRCLE || []);
  }, [currentPage]);

  const annotationReceiver = (message) => {
    decompressData(message.replace(/\\/g, ""), scaleFactorRef.current)?.forEach(
      handleMessage
    );
  };

  const addToUndoHistory = useCallback((shapesState = []) => {
    setUndoHistory((prevHistory) => {
      const newHistory = prevHistory.slice(Math.max(0, prevHistory.length - 9));
      return [...newHistory, shapesState];
    });
  }, []);

  const addToQueue = useCallback((message) => {
    messageQueue.current.push(message);
    // console.log("messageQueue.current", messageQueue.current);
    if (messageQueue.current.length === 20) {
      chatRef.current.sendAnnotations(
        JSON.stringify(
          compressData(messageQueue.current, scaleFactorRef.current)
        )
      );
      messageQueue.current = [];
    }
  }, []);

  const processQueue = () => {
    chatRef.current.sendAnnotations(
      JSON.stringify(compressData(messageQueue.current, scaleFactorRef.current))
    );
    messageQueue.current = [];
  };

  const undo = useCallback(() => {
    if (undoHistory.length > 0) {
      const previousState = undoHistory[undoHistory.length - 1];
      setRedoHistory((prevRedo) => [
        ...prevRedo,
        { rectangles, circles, arrows, scribbles },
      ]);
      setRectangles(previousState.rectangles || []);
      setCircles(previousState.circles || []);
      setArrows(previousState.arrows || []);
      setScribbles(previousState.scribbles || []);
      setUndoHistory((prev) => prev.slice(0, -1));
    }
  }, [undoHistory, rectangles, circles, arrows, scribbles]);

  const redo = useCallback(() => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1];
      const { rectangles, circles, arrows, scribbles } = nextState;
      addToUndoHistory({ rectangles, circles, arrows, scribbles });
      setRectangles(rectangles || []);
      setCircles(circles || []);
      setArrows(arrows || []);
      setScribbles(scribbles || []);
      setRedoHistory((prevRedo) => prevRedo.slice(0, -1));
    }
  }, [redoHistory]);

  const onPointerDown = useCallback(
    (userId, currentPage) => {
      if (action === DRAW_ACTIONS.SELECT) return;
      const stage = stageRef.current;
      const { x, y } = stage.getPointerPosition();
      const shapeId = nanoid(5);

      currentShapeId.current = shapeId;
      currentUserId.current = userId;
      isPaining.current = true;

      handleAddShape(action, userId, shapeId, x, y, fillColor, currentPage);
      const message = {
        type: action,
        userId,
        id: currentShapeId.current,
        points: [x, y],
        fillColor,
        currentPage,
      };
      addToQueue(message);
    },
    [action, addToUndoHistory, fillColor]
  );

  function onPointerMove(userId, currentPage) {
    if (action === DRAW_ACTIONS.SELECT || !isPaining.current) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    handleUpdateShape(
      action,
      userId,
      currentShapeId.current,
      x,
      y,
      currentPage
    );
    const message = {
      type: action,
      userId,
      id: currentShapeId.current,
      points: [x, y],
      currentPage,
    };
    addToQueue(message);
  }

  function onPointerUp() {
    isPaining.current = false;
    processQueue();
  }

  function handleExport() {
    // Currently Downloading as png but we will do as pdf later it for testing.
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e) {
    if (action !== DRAW_ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }

  const clearAll = useCallback(() => {
    addToUndoHistory({ rectangles, circles, arrows, scribbles });
    // setRectangles([]);
    // setCircles([]);
    // setArrows([]);
    // setScribbles([]);
    setPageAnnotations((prevAnnotations) => ({
      ...prevAnnotations,
      [currentPageRef.current]: {},
    }));
    let attributes = {};
    attributes["type"] = "app:ANNOTATIONS";
    const message = {
      type: "CLEARALL",
      points: [0, 1],
      currentPage: currentPageRef.current,
    };
    messageQueue.current.push(message);
    chatRef.current.sendAnnotations(
      JSON.stringify(compressData(messageQueue.current, scaleFactorRef.current))
    );
    messageQueue.current = [];
  }, [addToUndoHistory, rectangles, circles, arrows, scribbles]);

  const clearCurrentPage = useCallback(
    (currentPage) => {
      addToUndoHistory({ rectangles, circles, arrows, scribbles });
      // setRectangles([]);
      // setCircles([]);
      // setArrows([]);
      // setScribbles([]);
      setPageAnnotations((prevAnnotations) => ({
        ...prevAnnotations,
        [currentPage]: {},
      }));
      let attributes = {};
      attributes["type"] = "app:ANNOTATIONS";
      const message = {
        type: "CLEARALL",
        points: [0, 1],
        currentPage,
      };
      messageQueue.current.push(message);
      chatRef.current.sendAnnotations(
        JSON.stringify(
          compressData(messageQueue.current, scaleFactorRef.current)
        )
      );
      messageQueue.current = [];
    },
    [addToUndoHistory, rectangles, circles, arrows, scribbles]
  );

  const handleAddShape = useCallback(
    (action, userId, shapeId, x, y, fillColor, currentPage) => {
      addToUndoHistory({ rectangles, circles, arrows, scribbles });
      let newShape;

      switch (action) {
        case DRAW_ACTIONS.RECTANGLE:
          newShape = { id: shapeId, x, y, width: 20, height: 20, fillColor };
          addRectangles(userId, shapeId, x, y, fillColor);
          break;
        case DRAW_ACTIONS.CIRCLE:
          newShape = { id: shapeId, x, y, radius: 20, fillColor };
          addCircles(userId, shapeId, x, y, fillColor);
          break;
        case DRAW_ACTIONS.ARROW:
          newShape = { id: shapeId, points: [x, y, x + 20, y + 20], fillColor };
          addArrows(userId, shapeId, x, y, fillColor);
          break;
        case DRAW_ACTIONS.SCRIBBLE:
          newShape = { id: shapeId, points: [x, y], fillColor };
          addScribbles(userId, shapeId, x, y, fillColor);
          break;

        default:
          console.warn("Unhandled action:", action);
      }
      setPageAnnotations((prevAnnotations) => ({
        ...prevAnnotations,
        [currentPage]: {
          ...prevAnnotations[currentPage],
          [action]: [
            ...(prevAnnotations[currentPage]?.[action] || []),
            newShape,
          ],
        },
      }));
    },
    [rectangles, circles, arrows, scribbles]
  );

  const handleUpdateShape = useCallback(
    (action, userId, shapeId, x, y, currentPage) => {
      setPageAnnotations((prevAnnotations) => {
        const updatedShapes = prevAnnotations[currentPage]?.[action]?.map(
          (shape) => {
            if (shape.id === shapeId) {
              switch (action) {
                case DRAW_ACTIONS.RECTANGLE:
                  return {
                    ...shape,
                    width: Math.abs(x - shape.x),
                    height: Math.abs(y - shape.y),
                  };
                case DRAW_ACTIONS.CIRCLE:
                  return {
                    ...shape,
                    radius: Math.sqrt(
                      Math.pow(y - shape.y, 2) + Math.pow(x - shape.x, 2)
                    ),
                  };
                case DRAW_ACTIONS.ARROW:
                  return {
                    ...shape,
                    points: [shape.points[0], shape.points[1], x, y],
                  };
                case DRAW_ACTIONS.SCRIBBLE:
                  return { ...shape, points: [...shape.points, x, y] };
                default:
                  return shape;
              }
            }
            return shape;
          }
        );

        return {
          ...prevAnnotations,
          [currentPage]: {
            ...prevAnnotations[currentPage],
            [action]: updatedShapes || [],
          },
        };
      });

      switch (action) {
        case DRAW_ACTIONS.RECTANGLE:
          updateRectangles(userId, shapeId, x, y);
          break;
        case DRAW_ACTIONS.CIRCLE:
          updateCircles(userId, shapeId, x, y);
          break;
        case DRAW_ACTIONS.ARROW:
          updateArrows(userId, shapeId, x, y);
          break;
        case DRAW_ACTIONS.SCRIBBLE:
          updateScribbles(userId, shapeId, x, y);
          break;
        default:
          console.warn("Unhandled action:", action);
      }
    },
    [updateRectangles, updateCircles, updateArrows, updateScribbles]
  );

  const handleMessage = useCallback(
    (data) => {
      const {
        type,
        userId: rUserId,
        id: shapeId,
        points,
        fillColor,
        currentPage,
      } = data;
      let x = points[0];
      let y = points[1];

      if (rUserId !== currentUserId?.current) {
        switch (type) {
          case DRAW_ACTIONS.RECTANGLE:
            setRectangles((rectangles) => {
              let shape = findShape(rectangles, data.userId, data.id);
              if (!!shape) {
                return {
                  ...rectangles,
                  [rUserId]:
                    rectangles[rUserId]?.map((rectangle) => {
                      if (rectangle.id === shapeId) {
                        return {
                          ...rectangle,
                          width: Math.abs(x - rectangle.x),
                          height: Math.abs(y - rectangle.y),
                        };
                      }
                      return rectangle;
                    }) || [],
                };
              } else {
                return {
                  ...rectangles,
                  [rUserId]: [
                    ...(rectangles[rUserId] || []),
                    {
                      id: shapeId,
                      x: x,
                      y: y,
                      height: 20,
                      width: 20,
                      fillColor: fillColor,
                    },
                  ],
                };
              }
            });
            setPageAnnotations((prevAnnotations) => {
              const updatedRectangles =
                prevAnnotations[currentPage]?.RECTANGLE || [];
              const existingRectangleIndex = updatedRectangles.findIndex(
                (rect) => rect.id === shapeId
              );

              if (existingRectangleIndex !== -1) {
                updatedRectangles[existingRectangleIndex] = {
                  ...updatedRectangles[existingRectangleIndex],
                  width: Math.abs(
                    x - updatedRectangles[existingRectangleIndex].x
                  ),
                  height: Math.abs(
                    y - updatedRectangles[existingRectangleIndex].y
                  ),
                };
              } else {
                updatedRectangles.push({
                  id: shapeId,
                  x: x,
                  y: y,
                  height: 20,
                  width: 20,
                  fillColor: fillColor,
                });
              }

              return {
                ...prevAnnotations,
                [currentPage]: {
                  ...prevAnnotations[currentPage],
                  RECTANGLE: updatedRectangles,
                },
              };
            });
            break;
          case DRAW_ACTIONS.CIRCLE:
            setCircles((circles) => {
              let shape = findShape(circles, data.userId, data.id);
              if (!!shape) {
                return {
                  ...circles,
                  [rUserId]:
                    circles[rUserId]?.map((circle) => {
                      if (circle.id === shapeId) {
                        const newRadius = Math.sqrt(
                          Math.pow(y - circle.y, 2) + Math.pow(x - circle.x, 2)
                        );
                        return {
                          ...circle,
                          radius: newRadius,
                        };
                      }
                      return circle;
                    }) || [],
                };
              } else {
                return {
                  ...circles,
                  [rUserId]: [
                    ...(circles[rUserId] || []),
                    {
                      id: shapeId,
                      x: x,
                      y: y,
                      radius: 20,
                      fillColor: fillColor,
                    },
                  ],
                };
              }
            });
            setPageAnnotations((prevAnnotations) => {
              const updatedCircles = prevAnnotations[currentPage]?.CIRCLE || [];
              const existingCircleIndex = updatedCircles.findIndex(
                (circle) => circle.id === shapeId
              );

              if (existingCircleIndex !== -1) {
                const existingCircle = updatedCircles[existingCircleIndex];
                const newRadius = Math.sqrt(
                  Math.pow(y - existingCircle.y, 2) +
                    Math.pow(x - existingCircle.x, 2)
                );
                updatedCircles[existingCircleIndex] = {
                  ...existingCircle,
                  radius: newRadius,
                };
              } else {
                updatedCircles.push({
                  id: shapeId,
                  x: x,
                  y: y,
                  radius: 20,
                  fillColor: fillColor,
                });
              }

              return {
                ...prevAnnotations,
                [currentPage]: {
                  ...prevAnnotations[currentPage],
                  CIRCLE: updatedCircles,
                },
              };
            });
            break;
          case DRAW_ACTIONS.ARROW:
            setArrows((arrows) => {
              let shape = findShape(arrows, data.userId, data.id);
              if (!!shape) {
                return {
                  ...arrows,
                  [rUserId]:
                    arrows[rUserId]?.map((arrow) => {
                      if (arrow.id === shapeId) {
                        return {
                          ...arrow,
                          points: [arrow.points[0], arrow.points[1], x, y],
                        };
                      }
                      return arrow;
                    }) || [],
                };
              } else {
                return {
                  ...arrows,
                  [rUserId]: [
                    ...(arrows[rUserId] || []),
                    {
                      id: shapeId,
                      points: [x, y, x + 20, y + 20],
                      fillColor: fillColor,
                    },
                  ],
                };
              }
            });
            setPageAnnotations((prevAnnotations) => {
              const updatedArrows = prevAnnotations[currentPage]?.ARROW || [];
              const existingArrowIndex = updatedArrows.findIndex(
                (arrow) => arrow.id === shapeId
              );

              if (existingArrowIndex !== -1) {
                updatedArrows[existingArrowIndex] = {
                  ...updatedArrows[existingArrowIndex],
                  points: [
                    updatedArrows[existingArrowIndex].points[0],
                    updatedArrows[existingArrowIndex].points[1],
                    x,
                    y,
                  ],
                };
              } else {
                updatedArrows.push({
                  id: shapeId,
                  points: [x, y, x + 20, y + 20],
                  fillColor: fillColor,
                });
              }

              return {
                ...prevAnnotations,
                [currentPage]: {
                  ...prevAnnotations[currentPage],
                  ARROW: updatedArrows,
                },
              };
            });
            break;
          case DRAW_ACTIONS.SCRIBBLE:
            setScribbles((scribbles) => {
              let shape = findShape(scribbles, data.userId, data.id);
              if (!!shape) {
                return {
                  ...scribbles,
                  [rUserId]:
                    scribbles[rUserId]?.map((scribble) => {
                      if (scribble.id === shapeId) {
                        return {
                          ...scribble,
                          points: [...scribble.points, x, y],
                        };
                      }
                      return scribble;
                    }) || [],
                };
              } else {
                return {
                  ...scribbles,
                  [rUserId]: [
                    ...(scribbles[rUserId] || []),
                    {
                      id: shapeId,
                      points: [x, y],
                      fillColor,
                    },
                  ],
                };
              }
            });
            setPageAnnotations((prevAnnotations) => {
              const updatedScribbles =
                prevAnnotations[currentPage]?.SCRIBBLE || [];
              const existingScribbleIndex = updatedScribbles.findIndex(
                (scribble) => scribble.id === shapeId
              );

              if (existingScribbleIndex !== -1) {
                updatedScribbles[existingScribbleIndex] = {
                  ...updatedScribbles[existingScribbleIndex],
                  points: [
                    ...updatedScribbles[existingScribbleIndex].points,
                    x,
                    y,
                  ],
                };
              } else {
                updatedScribbles.push({
                  id: shapeId,
                  points: [x, y],
                  fillColor: fillColor,
                });
              }

              return {
                ...prevAnnotations,
                [currentPage]: {
                  ...prevAnnotations[currentPage],
                  SCRIBBLE: updatedScribbles,
                },
              };
            });
            break;
          case "CLEARALL":
            // setRectangles([]);
            // setCircles([]);
            // setArrows([]);
            // setScribbles([]);
            setPageAnnotations((prevAnnotations) => ({
              ...prevAnnotations,
              [currentPage]: {},
            }));
            break;
        }
      }
    },
    [currentUserId]
  );

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
    pageAnnotations,
    currentPage,
    setCurrentPage,
  };
};

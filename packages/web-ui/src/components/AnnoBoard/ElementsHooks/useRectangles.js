import { useState } from "react";

const useRectangles = () => {
  const [rectangles, setRectangles] = useState({});

  const addRectangles = (userId, shapeId, x, y, fillColor) => {
    setRectangles((rectangles) => ({
      ...rectangles,
      [userId]: [
        ...(rectangles[userId] || []),
        {
          id: shapeId,
          x: x,
          y: y,
          height: 20,
          width: 20,
          fillColor: fillColor,
        },
      ],
    }));
  };

  const updateRectangles = (userId, shapeId, x, y) => {
    setRectangles((rectangles) => ({
      ...rectangles,
      [userId]:
        rectangles[userId]?.map((rectangle) => {
          if (rectangle.id === shapeId) {
            return {
              ...rectangle,
              width: Math.abs(x - rectangle.x),
              height: Math.abs(y - rectangle.y),
            };
          }
          return rectangle;
        }) || [],
    }));
  };

  return { rectangles, setRectangles, addRectangles, updateRectangles };
};

export default useRectangles;

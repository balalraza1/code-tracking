import { useState } from "react";

const useScribbles = () => {
  const [scribbles, setScribbles] = useState({});

  const addScribbles = (userId, shapeId, x, y, fillColor) => {
    setScribbles((scribbles) => ({
      ...scribbles,
      [userId]: [
        ...(scribbles[userId] || []),
        {
          id: shapeId,
          points: [x, y],
          fillColor: fillColor,
        },
      ],
    }));
  };

  const updateScribbles = (userId, shapeId, x, y) => {
    setScribbles((scribbles) => ({
      ...scribbles,
      [userId]:
        scribbles[userId]?.map((scribble) => {
          if (scribble.id === shapeId) {
            return {
              ...scribble,
              points: [...scribble.points, x, y],
            };
          }
          return scribble;
        }) || [],
    }));
  };

  return { scribbles, setScribbles, addScribbles, updateScribbles };
};

export default useScribbles;

import { useState } from "react";

const useArrows = () => {
  const [arrows, setArrows] = useState({});

  const addArrows = (userId, shapeId, x, y, fillColor) => {
    setArrows((arrows) => ({
      ...arrows,
      [userId]: [
        ...(arrows[userId] || []),
        {
          id: shapeId,
          points: [x, y, x + 20, y + 20],
          fillColor: fillColor,
        },
      ],
    }));
  };

  const updateArrows = (userId, shapeId, x, y) => {
    setArrows((arrows) => ({
      ...arrows,
      [userId]:
        arrows[userId]?.map((arrow) => {
          if (arrow.id === shapeId) {
            return {
              ...arrow,
              points: [arrow.points[0], arrow.points[1], x, y],
            };
          }
          return arrow;
        }) || [],
    }));
  };

  return { arrows, setArrows, addArrows, updateArrows };
};

export default useArrows;

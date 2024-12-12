import { useState } from "react";

const useCircles = () => {
  const [circles, setCircles] = useState({});

  const addCircles = (userId, shapeId, x, y, fillColor) => {
    setCircles((circles) => ({
      ...circles,
      [userId]: [
        ...(circles[userId] || []),
        {
          id: shapeId,
          x: x,
          y: y,
          radius: 20,
          fillColor: fillColor,
        },
      ],
    }));
  };

  const updateCircles = (userId, shapeId, x, y) => {
    setCircles((circles) => ({
      ...circles,
      [userId]:
        circles[userId]?.map((circle) => {
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
    }));
  };

  return { circles, setCircles, addCircles, updateCircles };
};

export default useCircles;

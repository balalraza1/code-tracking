import React from "react";
import { Line } from "react-konva";

const Scribble = React.memo(({ onClick, draggable, ...shapeProps }) => {
  const { id, points, fillColor } = shapeProps;

  return (
    <Line
      key={id}
      lineCap="round"
      lineJoin="round"
      points={points}
      stroke={fillColor}
      strokeWidth={2}
      fill={fillColor}
      draggable={draggable}
      onClick={onClick}
    />
  );
});

export default Scribble;

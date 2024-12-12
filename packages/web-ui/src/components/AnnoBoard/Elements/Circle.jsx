import React from "react";
import { Circle } from "react-konva";

const CustomCircle = React.memo(({ onClick, draggable,...shapeProps }) => {
  const { id, radius, x, y, fillColor } = shapeProps;

  return (
    <Circle
      key={id}
      radius={radius}
      x={x}
      y={y}
      stroke={fillColor}
      strokeWidth={2}
      // fill={fillColor}
      draggable={draggable}
      onClick={onClick}
    />
  );
});

export default CustomCircle;

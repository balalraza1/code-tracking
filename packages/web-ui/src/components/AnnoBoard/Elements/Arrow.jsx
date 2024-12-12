import React from "react";
import { Arrow } from "react-konva";

const CustomArrow = React.memo(({ onClick, draggable, ...shapeProps }) => {
  const { id, points, fillColor } = shapeProps;
  return (
    <Arrow
      key={id}
      points={points}
      stroke={fillColor}
      strokeWidth={2}
      fill={fillColor}
      draggable={draggable}
      onClick={onClick}
    />
  );
});

export default CustomArrow;

import React from "react";
import { Rect } from "react-konva";

const Rectangle = React.memo(({ onClick, draggable, ...shapeProps }) => {
  const { id, x, y, fillColor, height, width } = shapeProps;

  return (
    <Rect
      key={id}
      x={x}
      y={y}
      stroke={fillColor}
      strokeWidth={2}
      fill={fillColor}
      height={height}
      width={width}
      draggable={draggable}
      onClick={onClick}
    />
  );
});

export default Rectangle;

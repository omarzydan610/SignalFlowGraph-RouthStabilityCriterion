import React from "react";
import { Circle, Text } from "react-konva";

function Node({ node }) {
  return (
    <React.Fragment>
      <Circle x={node.x} y={node.y} radius={16} fill={node.color} />
      <Text
        x={node.x}
        y={node.y}
        text={node.name}
        fill="white"
        fontSize={16}
        fontStyle="bold"
        align="center"
        verticalAlign="middle"
        offsetX={node.name.length * 4}
        offsetY={7}
      />
    </React.Fragment>
  );
}

export default Node;

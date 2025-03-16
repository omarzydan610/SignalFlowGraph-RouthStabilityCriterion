import React from "react";
import { Circle, Text } from "react-konva";

function Node({ node }) {
  return (
    <React.Fragment>
      <Circle x={node.x} y={node.y} radius={10} fill={node.color} />
      <Text
        x={node.x + 15}
        y={node.y - 5}
        text={node.name}
        fill={node.color}
        fontSize={16}
        fontStyle="bold"
      />
    </React.Fragment>
  );
}

export default Node;

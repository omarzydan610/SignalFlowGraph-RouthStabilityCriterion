import React from "react";
import { Arrow, Text } from "react-konva";

const Edge = ({ edge, nodes, edges }) => {
  const getNodePosition = (nodeName) => {
    const node = nodes.find((node) => node.name === nodeName);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const getArrowPoints = (sourcePos, destPos, isCurved) => {
    const dx = destPos.x - sourcePos.x;
    const dy = destPos.y - sourcePos.y;
    const angle = Math.atan2(dy, dx);
    const nodeRadius = 18;
    const points = [
      sourcePos.x + nodeRadius * Math.cos(angle),
      sourcePos.y + nodeRadius * Math.sin(angle),
      destPos.x - nodeRadius * Math.cos(angle),
      destPos.y - nodeRadius * Math.sin(angle),
    ];

    if (isCurved) {
      const midX = (points[0] + points[2]) / 2;
      const midY = (points[1] + points[3]) / 2;
      const curveOffset = 16;
      const controlX = midX + curveOffset * Math.sin(angle);
      const controlY = midY - curveOffset * Math.cos(angle);
      return [points[0], points[1], controlX, controlY, points[2], points[3]];
    }

    return points;
  };

  const sourcePos = getNodePosition(edge.source);
  const destPos = getNodePosition(edge.destination);
  const isCurved = edges.some(
    (e) => e.source === edge.destination && e.destination === edge.source
  );
  const points = getArrowPoints(sourcePos, destPos, isCurved);

  return (
    <React.Fragment>
      <Arrow
        points={points}
        stroke="black"
        fill="black"
        pointerLength={10}
        pointerWidth={10}
        tension={isCurved ? 0.5 : 0}
      />
      <Text
        x={(points[0] + points[2]) / 2}
        y={(points[1] + points[3]) / 2 - 20}
        text={edge.value}
        fontSize={16}
        fill="black"
      />
    </React.Fragment>
  );
};

export default Edge;

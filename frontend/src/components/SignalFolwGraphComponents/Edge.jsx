import React from "react";
import { Arrow, Text, Rect, Circle } from "react-konva";

const Edge = ({ edge, nodes, edges }) => {
  const getNodePosition = (nodeName) => {
    const node = nodes.find((node) => node.name === nodeName);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const hasReverseEdge = (edge, edges) => {
    return edges.some(
      (e) => e.source === edge.destination && e.destination === edge.source
    );
  };

  const getArrowPoints = (
    sourcePos,
    destPos,
    isCurved,
    curveDirection,
    distance
  ) => {
    const dx = destPos.x - sourcePos.x;
    const dy = destPos.y - sourcePos.y;
    const angle = Math.atan2(dy, dx);
    const nodeRadius = 18;

    // Start and end points adjusted to avoid overlapping with nodes
    const startX = sourcePos.x + nodeRadius * Math.cos(angle);
    const startY = sourcePos.y + nodeRadius * Math.sin(angle);
    const endX = destPos.x - nodeRadius * Math.cos(angle);
    const endY = destPos.y - nodeRadius * Math.sin(angle);

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Dynamic curve radius based on distance (scaled to avoid intersections)
    const curveOffset = distance / 8;

    let controlX = midX + curveOffset * Math.sin(angle);
    let controlY = midY - curveOffset * Math.cos(angle);

    return [startX, startY, controlX, controlY, endX, endY];
  };

  const sourcePos = getNodePosition(edge.source);
  const destPos = getNodePosition(edge.destination);

  const distance = Math.abs(destPos.x - sourcePos.x); // Calculate distance

  const isReverse = hasReverseEdge(edge, edges);

  const isSelfEdge = edge.source === edge.destination;
  const isConsecutive = distance < 100;
  const isCurved = isReverse || !isConsecutive;
  const curveDirection = isReverse
    ? "up"
    : sourcePos.x < destPos.x
    ? "up"
    : "down";

  const points = getArrowPoints(
    sourcePos,
    destPos,
    isCurved,
    curveDirection,
    distance
  );

  const textWidth = edge.value.length * 8;
  const textHeight = 20;

  return (
    <React.Fragment>
      {isSelfEdge ? (
        <React.Fragment>
          <Circle
            x={sourcePos.x}
            y={sourcePos.y - 30}
            radius={15}
            stroke="black"
          />
          <Arrow
            points={[
              sourcePos.x + 20 * Math.cos(Math.PI / 4) - 15,
              sourcePos.y - 30 + 20 * Math.sin(Math.PI / 4),
              sourcePos.x + 20 * Math.cos(Math.PI / 4) - 15,
              sourcePos.y - 30 + 20 * Math.sin(Math.PI / 4),
            ]}
            stroke="black"
            fill="white"
            pointerLength={10}
            pointerWidth={10}
          />
          <Rect
            x={sourcePos.x - textWidth / 2 - 2}
            y={sourcePos.y - 40}
            width={textWidth + 8}
            height={textHeight}
            fill="black"
            cornerRadius={10}
          />
          <Text
            x={sourcePos.x - textWidth / 2 + 2}
            y={sourcePos.y - 40 + 1}
            text={edge.value}
            fontSize={16}
            fill="white"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Arrow
            points={points}
            stroke="black"
            fill="white"
            pointerLength={10}
            pointerWidth={10}
            tension={isCurved ? 0.5 : 0}
          />
          <Rect
            x={(sourcePos.x + destPos.x) / 2 - 4}
            y={
              (points[1] + points[3] - (destPos.x - sourcePos.x + 50) / 5) / 2 -
              1
            }
            width={textWidth + 8}
            height={textHeight + 2}
            fill="black"
            cornerRadius={10}
          />
          <Text
            x={(sourcePos.x + destPos.x) / 2}
            y={(points[1] + points[3] - (destPos.x - sourcePos.x + 50) / 5) / 2}
            text={edge.value}
            fontSize={16}
            fill="white"
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Edge;

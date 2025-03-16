import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stage, Layer } from "react-konva";
import Header from "../components/Header";
import NodeInput from "../components/SignalFolwGraphComponents/NodeInput";
import Node from "../components/SignalFolwGraphComponents/Node";
import ClearStageButton from "../components/SignalFolwGraphComponents/ClearStageButton";
import NodesListWindow from "../components/SignalFolwGraphComponents/NodesListWindow";

function SignalFlowGraphPage() {
  const navigate = useNavigate();
  const [nodeName, setNodeName] = useState("");
  const [nodes, setNodes] = useState([]);

  const handleAddNode = () => {
    if (isNodeNameInvalid(nodeName, nodes)) {
      alert("Node name must be unique and not empty");
      return;
    }
    const newNodes = [...nodes, { name: nodeName, color: getRandomColor() }];
    setNodes(positionNodes(newNodes));
    setNodeName("");
  };

  const handleRemoveNode = (index) => {
    const newNodes = nodes.filter((_, i) => i !== index);
    setNodes(positionNodes(newNodes));
  };

  const handleClearStage = () => {
    setNodes([]);
  };

  const isNodeNameInvalid = (name, nodes) => {
    return name.trim() === "" || nodes.some((node) => node.name === name);
  };

  const positionNodes = (nodes) => {
    const stageWidth = 800;
    const stageHeight = 500;
    const radius = Math.min(stageWidth, stageHeight) / 2.5;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;

    if (nodes.length === 1) {
      return [{ ...nodes[0], x: centerX, y: centerY }];
    }

    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400 flex">
      <div className="flex-1">
        <Header navigate={navigate} label={"Signal Flow Graph"} />
        <div className="p-4">
          <NodeInput
            nodeName={nodeName}
            setNodeName={setNodeName}
            handleAddNode={handleAddNode}
          />
          <ClearStageButton handleClearStage={handleClearStage} />
        </div>
        <div className="flex justify-center items-center mt-4">
          <Stage
            className="mb-4 rounded-lg"
            width={800}
            height={500}
            style={{ backgroundColor: "white", borderRadius: "15px" }}
          >
            <Layer>
              {nodes.map((node, index) => (
                <Node key={index} node={node} />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      {nodes.length > 0 && (
        <NodesListWindow nodes={nodes} handleRemoveNode={handleRemoveNode} />
      )}
    </div>
  );
}

export default SignalFlowGraphPage;

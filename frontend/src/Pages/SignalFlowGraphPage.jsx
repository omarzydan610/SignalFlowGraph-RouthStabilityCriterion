import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Stage, Layer } from "react-konva";
import NodeInput from "../components/SignalFolwGraphComponents/NodeInput";
import NodeList from "../components/SignalFolwGraphComponents/NodeList";
import Node from "../components/SignalFolwGraphComponents/Node";

function SignalFlowGraphPage() {
  const navigate = useNavigate();
  const [nodeName, setNodeName] = useState("");
  const [nodes, setNodes] = useState([]);

  const handleAddNode = () => {
    if (
      nodeName.trim() === "" ||
      nodes.some((node) => node.name === nodeName)
    ) {
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

  const positionNodes = (nodes) => {
    const stageWidth = 800;
    const stageHeight = 400;
    const radius = Math.min(stageWidth, stageHeight) / 3;
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400">
      <div className="w-full bg-white/10 backdrop-blur-sm shadow-lg relative h-16">
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 
          text-white bg-blue-400 rounded-full text-xl
          transition-all duration-300 hover:bg-blue-500 
          hover:shadow-blue-400/50 hover:scale-105 
          active:scale-95"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text pt-3 text-center">
          Signal Flow Graph
        </h1>
      </div>
      <div className="p-4">
        <NodeInput
          nodeName={nodeName}
          setNodeName={setNodeName}
          handleAddNode={handleAddNode}
        />
        <NodeList nodes={nodes} handleRemoveNode={handleRemoveNode} />
      </div>
      <div className="flex justify-center items-center mt-4">
        <Stage
          className="mb-4 rounded-lg"
          width={800}
          height={400}
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
  );
}

export default SignalFlowGraphPage;

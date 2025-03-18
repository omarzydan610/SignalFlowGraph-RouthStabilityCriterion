import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stage, Layer } from "react-konva";
import Header from "../components/Header";
import NodeInput from "../components/SignalFolwGraphComponents/NodeInput";
import Node from "../components/SignalFolwGraphComponents/Node";
import ClearStageButton from "../components/SignalFolwGraphComponents/ClearStageButton";
import NodesListWindow from "../components/SignalFolwGraphComponents/NodesListWindow";
import EdgeInput from "../components/SignalFolwGraphComponents/EdgeInput";
import EdgesListWindow from "../components/SignalFolwGraphComponents/EdgesListWindow";
import Edge from "../components/SignalFolwGraphComponents/Edge";
import SolveButton from "../components/SignalFolwGraphComponents/SolveButton";
import solveSignalFlowGraph from "../services/SolveSignalFlowGraphService";

function SignalFlowGraphPage() {
  const navigate = useNavigate();
  const [nodeName, setNodeName] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [edge, setEdge] = useState({ source: "", destination: "", value: "" });

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
    const nodeName = nodes[index].name;
    const newNodes = nodes.filter((_, i) => i !== index);
    const newEdges = edges.filter(
      (edge) => edge.source !== nodeName && edge.destination !== nodeName
    );
    setNodes(positionNodes(newNodes));
    setEdges(newEdges);
  };

  const handleClearStage = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleAddEdge = () => {
    if (isEdgeInvalid(edge, nodes, edges)) {
      alert(
        "Edge must have valid source, destination, and value, and must not be a duplicate"
      );
      return;
    }
    setEdges([...edges, edge]);
    setEdge({ source: "", destination: "", value: "" });
  };

  const handleRemoveEdge = (index) => {
    const newEdges = edges.filter((_, i) => i !== index);
    setEdges(newEdges);
  };

  const constructAdjacencyMatrix = (nodes, edges) => {
    const nodeNames = nodes.map((node) => node.name);
    const matrix = Array(nodes.length)
      .fill(null)
      .map(() => Array(nodes.length).fill(0));

    edges.forEach((edge) => {
      const sourceIndex = nodeNames.indexOf(edge.source);
      const destinationIndex = nodeNames.indexOf(edge.destination);
      matrix[sourceIndex][destinationIndex] = parseFloat(edge.value);
    });

    return matrix;
  };

  const handleSolve = async () => {
    const matrix = constructAdjacencyMatrix(nodes, edges);
    const nodesNames = nodes.map((node) => node.name);
    try {
      console.log("Nodes:", nodesNames);
      console.log("Matrix:", matrix);

      const result = await solveSignalFlowGraph(nodes, matrix);
      console.log("Solve result:", result);
      alert("Solve result: " + JSON.stringify(result));
    } catch (error) {
      alert("Error solving signal flow graph");
    }
  };

  const isNodeNameInvalid = (name, nodes) => {
    return name.trim() === "" || nodes.some((node) => node.name === name);
  };

  const isEdgeInvalid = (edge, nodes, edges) => {
    const { source, destination, value } = edge;
    const nodeNames = nodes.map((node) => node.name);
    const isDuplicate = edges.some(
      (e) => e.source === source && e.destination === destination
    );
    return (
      source.trim() === "" ||
      destination.trim() === "" ||
      value.trim() === "" ||
      !nodeNames.includes(source) ||
      !nodeNames.includes(destination) ||
      isDuplicate
    );
  };

  const positionNodes = (nodes) => {
    const stageWidth = 800;
    const stageHeight = 500;
    const nodeSpacing = stageWidth / (nodes.length + 1);
    const centerY = stageHeight / 2;

    return nodes.map((node, index) => ({
      ...node,
      x: nodeSpacing * (index + 1),
      y: centerY,
    }));
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
          <EdgeInput
            edge={edge}
            setEdge={setEdge}
            handleAddEdge={handleAddEdge}
          />
          <div className="flex space-x-20">
            <ClearStageButton handleClearStage={handleClearStage} />
            <SolveButton handleSolve={handleSolve} />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Stage
            className=" rounded-lg"
            width={800}
            height={500}
            style={{ backgroundColor: "white", borderRadius: "15px" }}
          >
            <Layer>
              {nodes.map((node, index) => (
                <Node key={index} node={node} />
              ))}
              {edges.map((edge, index) => (
                <Edge key={index} edge={edge} nodes={nodes} edges={edges} />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
      {nodes.length > 0 && (
        <div className="w-1/4 flex flex-col">
          <NodesListWindow nodes={nodes} handleRemoveNode={handleRemoveNode} />
          <EdgesListWindow edges={edges} handleRemoveEdge={handleRemoveEdge} />
        </div>
      )}
    </div>
  );
}

export default SignalFlowGraphPage;

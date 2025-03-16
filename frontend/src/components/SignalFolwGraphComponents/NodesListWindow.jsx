import React from "react";
import NodeList from "./NodeList";

const NodesListWindow = ({ nodes, handleRemoveNode }) => (
  <div className="w-1/4 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm shadow-lg">
    <NodeList nodes={nodes} handleRemoveNode={handleRemoveNode} />
  </div>
);

export default NodesListWindow;

import React from "react";

function NodeInput({ nodeName, setNodeName, handleAddNode }) {
  return (
    <div>
      <input
        type="text"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
        placeholder="Enter node name"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleAddNode}
        className="ml-2 p-2 bg-blue-400 text-white rounded-md transition-all duration-300 hover:bg-blue-500"
      >
        Add Node
      </button>
    </div>
  );
}

export default NodeInput;

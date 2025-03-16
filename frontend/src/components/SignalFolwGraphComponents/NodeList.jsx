import React from "react";

function NodeList({ nodes, handleRemoveNode }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold text-white">Nodes List</h2>
      {nodes.map((node, index) => (
        <div key={index} className="mt-2 flex items-center">
          <input
            type="text"
            value={node.name}
            readOnly
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => handleRemoveNode(index)}
            className="ml-2 p-2 bg-red-400 text-white rounded-md transition-all duration-300 hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default NodeList;

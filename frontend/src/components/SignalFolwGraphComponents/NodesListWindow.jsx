import React from "react";

const NodesListWindow = ({ nodes, handleRemoveNode }) => (
  <div className="h-1/2 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm shadow-lg">
    <div className="">
      <h2 className="text-xl font-bold text-white">Nodes List</h2>
      {nodes.map((node, index) => (
        <div key={index} className="mt-2 flex items-center justify-around">
          <input
            type="text"
            value={node.name}
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-md"
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
  </div>
);

export default NodesListWindow;

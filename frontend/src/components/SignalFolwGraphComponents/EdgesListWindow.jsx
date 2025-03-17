import React from "react";

function EdgesListWindow({ edges, handleRemoveEdge }) {
  return (
    <div className="h-1/2 p-4 overflow-y-auto bg-white/10 backdrop-blur-sm shadow-lg">
      <h2 className="text-xl font-bold text-white">Edges List</h2>
      {edges.map((edge, index) => (
        <div key={index} className="mt-2 flex items-center">
          <input
            type="text"
            value={edge.source}
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            value={edge.destination}
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            value={edge.value}
            readOnly
            className="w-20 p-2 border border-gray-300 rounded-md mr-2"
          />
          <button
            onClick={() => handleRemoveEdge(index)}
            className="p-2 bg-red-400 text-white rounded-md transition-all duration-300 hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default EdgesListWindow;

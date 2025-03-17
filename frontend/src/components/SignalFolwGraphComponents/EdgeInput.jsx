import React from "react";

function EdgeInput({ edge, setEdge, handleAddEdge }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdge((prevEdge) => ({ ...prevEdge, [name]: value }));
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        name="source"
        value={edge.source}
        onChange={handleChange}
        placeholder="Source"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        name="destination"
        value={edge.destination}
        onChange={handleChange}
        placeholder="Destination"
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        name="value"
        value={edge.value}
        onChange={handleChange}
        placeholder="Value"
        className="mr-2 p-2 border rounded"
      />
      <button onClick={handleAddEdge} className="p-2 bg-blue-500 text-white rounded">
        Add Edge
      </button>
    </div>
  );
}

export default EdgeInput;

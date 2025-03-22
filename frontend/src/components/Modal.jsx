import React from "react";

const Modal = ({ result, onClose }) => {
  const input_node = result["input_node"];
  const output_node = result["output_node"];
  const forward_paths = result["forward_paths"];
  const loop_gains = result["loop_gains"];
  const loops = result["loops"];
  const non_touching_loop_groups = result["non_touching_loop_groups"];
  const path_deltas = result["path_deltas"];
  const path_gains = result["path_gains"];
  const total_system_delta = result["total_system_delta"];
  const transfer_function = result["transfer_function"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 rounded-lg shadow-lg w-1/2 h-3/4 overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white">Result</h2>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Input Node:</strong> <span>{input_node}</span>
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Output Node:</strong> <span>{output_node}</span>
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Forward Paths:</strong>
          {forward_paths.length > 0 ? (
            forward_paths.map((path, idx) => (
              <div key={idx} className="ml-4">
                {idx + 1}. {path.join(", ")}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Path Gains:</strong>
          {path_gains.length > 0 ? (
            path_gains.map((gain, idx) => (
              <div key={idx} className="ml-4">
                {idx + 1}. {gain}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Path Deltas:</strong>
          {path_deltas.length > 0 ? (
            path_deltas.map((delta, idx) => (
              <div key={idx} className="ml-4">
                {idx + 1}. {delta}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Loops:</strong>
          {loops.length > 0 ? (
            loops.map((loop, idx) => (
              <div key={idx} className="ml-4">
                {idx + 1}. {loop.join(", ")}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Loop Gains:</strong>
          {loop_gains.length > 0 ? (
            loop_gains.map((gain, idx) => (
              <div key={idx} className="ml-4">
                {idx + 1}. {gain}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Non-Touching Loop Groups:</strong>
          {non_touching_loop_groups.length > 0 ? (
            non_touching_loop_groups.map((group, idx) => (
              <div key={idx} className="ml-4">
                {idx + 2} Non-Touching Loops:
                {group.map((subGroup, subIdx) => (
                  <div key={subIdx} className="ml-4">
                    {subGroup
                      .map((loopIndex) =>
                        Array.isArray(loops[loopIndex])
                          ? loops[loopIndex].join(", ")
                          : ""
                      )
                      .join(" & ")}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <span className="ml-4">None</span>
          )}
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Total System Delta:</strong> <span>{total_system_delta}</span>
        </div>
        <div className="mb-2 text-white text-lg border-b border-gray-300 pb-2">
          <strong>Transfer Function:</strong> <span>{transfer_function}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;

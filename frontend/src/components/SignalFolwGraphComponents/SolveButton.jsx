import React from "react";

const SolveButton = ({ handleSolve }) => (
  <button
    onClick={handleSolve}
    className="mt-4 p-2 bg-green-400 text-white rounded-md transition-all duration-300 hover:bg-green-500"
  >
    Solve
  </button>
);

export default SolveButton;

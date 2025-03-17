import React from "react";

const ClearStageButton = ({ handleClearStage }) => (
  <button
    onClick={handleClearStage}
    className="mt-4 p-2 bg-red-400 text-white rounded-md transition-all duration-300 hover:bg-red-500"
  >
    Clear Stage
  </button>
);

export default ClearStageButton;

// ./src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignalFlowGraphPage from "./Pages/SignalFlowGraphPage";
import RouthStabilityPage from "./Pages/RouthStabilityPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signal-flow-graph" element={<SignalFlowGraphPage />} />
      <Route path="/routh-stability" element={<RouthStabilityPage />} />
    </Routes>
  );
}

export default App;

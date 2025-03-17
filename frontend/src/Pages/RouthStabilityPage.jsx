import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function RouthStabilityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400">
      <Header navigate={navigate} label={"Routh Stability Criterion"} />
    </div>
  );
}

export default RouthStabilityPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/HomePageComponents/button";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400 flex items-center justify-center">
      <div className="text-center backdrop-blur-sm bg-white/10 p-16 rounded-2xl shadow-2xl w-[800px] max-w-[90%] h-[60%]">
        <h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text drop-shadow-lg">
          Control Project
        </h1>
        <div className="flex flex-col gap-12 max-w-2xl mx-auto">
          <Button
            onClick={() => navigate("/signal-flow-graph")}
            fromColor="blue-800"
            toColor="blue-400"
          >
            Signal Flow Graph
          </Button>
          <Button
            onClick={() => navigate("/Routh-stability")}
            fromColor="blue-700"
            toColor="blue-300"
          >
            Routh Stability Criterion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

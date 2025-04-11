import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import EquationForm from "../components/RouthStabilityComponents/EquationForm";
import RouthTable from "../components/RouthStabilityComponents/RouthTable";

function RouthStabilityPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async (equation) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch("/api/routh-stability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ equation }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate stability");
      }

      const data = await response.json();
      setResults(data);
      console.log("Equation solved:", equation);
      console.log("Results:", data);
    } catch (err) {
      console.error("Error solving equation:", err);
      setError(
        "Could not solve the equation. Please check the format and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400">
      <Header navigate={navigate} label={"Routh Stability Criterion"} />

      <div className="container mx-auto px-4 py-8">
        <EquationForm onSolve={handleSolve} />

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/70 text-white p-4 rounded-lg mt-6 max-w-2xl mx-auto">
            <p>{error}</p>
          </div>
        )}

        {!loading && results && (
          <RouthTable
            routhArray={results.routhArray}
            isStable={results.isStable}
            rightHalfPoleCount={results.rightHalfPoleCount}
          />
        )}
      </div>
    </div>
  );
}

export default RouthStabilityPage;

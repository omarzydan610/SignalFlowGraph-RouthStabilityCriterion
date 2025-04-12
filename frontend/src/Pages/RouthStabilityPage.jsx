import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import EquationForm from "../components/RouthStabilityComponents/EquationForm";
import RouthTable from "../components/RouthStabilityComponents/RouthTable";
import solveRouthHurwitz from "../services/SolveRouthHurwitz Service";

function RouthStabilityPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractCoefficients = (equation) => {
    try {
      const cleanEquation = equation.replace(/\s+/g, "");
      const coeffsMap = {};
      const termsRegex = /([+-]?\d*\.?\d*)?s\^?(\d+)?/g;
      let match;

      while ((match = termsRegex.exec(cleanEquation)) !== null) {
        let coeff = match[1] || "";
        if (coeff === "+" || coeff === "") coeff = "1";
        else if (coeff === "-") coeff = "-1";

        let power = match[2];
        if (!power && match[0].includes("s")) power = "1";
        else if (!power) power = "0";

        power = parseInt(power);
        coeffsMap[power] = parseFloat(coeff);
      }

      const terms = cleanEquation
        .replace(/([+-])/g, " $1")
        .trim()
        .split(/\s+/);

      for (const term of terms) {
        if (!term.includes("s")) {
          if (term !== "+" && term !== "-") {
            coeffsMap[0] = parseFloat(term);
          }
        }
      }

      const maxPower = Math.max(...Object.keys(coeffsMap).map(Number));
      const coeffsArray = [];

      for (let i = maxPower; i >= 0; i--) {
        coeffsArray.push(coeffsMap[i] || 0);
      }

      return coeffsArray;
    } catch (error) {
      return [];
    }
  };

  const handleSolve = async (equation) => {
    try {
      setError(null);
      setLoading(true);

      const extractedCoeffs = extractCoefficients(equation);
      console.log("Extracted Coefficients:", extractedCoeffs);

      // Send the coefficients directly to the service
      const data = await solveRouthHurwitz(extractedCoeffs);
      console.log("Routh Stability Data:", data);
      setResults({
        routhArray: data.routhMatrix ,
        isStable: data.isStable,
        positiveRoots: data.positiveRoots,
      });
    } catch (err) {
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
            positiveRoots={results.positiveRoots}
          />
        )}
      </div>
    </div>
  );
}

export default RouthStabilityPage;

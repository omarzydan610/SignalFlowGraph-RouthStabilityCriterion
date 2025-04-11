import React, { useState } from 'react';

function EquationForm({ onSolve }) {
  const [equation, setEquation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSolve(equation);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">
        Enter System Characteristic Equation
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="e.g., s^3 + 2s^2 + 3s + 4"
          className="flex-1 px-4 py-3 rounded-md bg-white border border-white/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Solve
        </button>
      </form>
    </div>
  );
}

export default EquationForm;

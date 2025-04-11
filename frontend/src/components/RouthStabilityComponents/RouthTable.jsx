import React from "react";

function RouthTable({ routhArray, isStable, rightHalfPoleCount }) {
  if (!routhArray || routhArray.length === 0) {
    return null;
  }

  const maxCols = Math.max(...routhArray.map((row) => row.length));

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        Routh-Hurwitz Table
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-6">
          <tbody>
            {routhArray.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-blue-300 bg-blue-600/30 text-white px-4 py-2 font-medium">
                  s<sup>{routhArray.length - rowIndex - 1}</sup>
                </td>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-blue-300 bg-white/20 text-white px-4 py-2"
                  >
                    {cell.toFixed(4)}
                  </td>
                ))}
                {/* Add empty cells to even out the table */}
                {[...Array(maxCols - row.length)].map((_, index) => (
                  <td
                    key={`empty-${index}`}
                    className="border border-blue-300 bg-white/20 px-4 py-2"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-md bg-white/20 text-white">
        <h3 className="text-xl font-bold mb-2">Analysis Results</h3>
        <p className="text-lg">
          System is{" "}
          <span
            className={
              isStable ? "text-green-400 font-bold" : "text-red-400 font-bold"
            }
          >
            {isStable ? "stable" : "unstable"}
          </span>
        </p>
        {!isStable && (
          <p className="mt-2">
            Number of right-half plane poles:{" "}
            <span className="font-bold">{rightHalfPoleCount}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default RouthTable;

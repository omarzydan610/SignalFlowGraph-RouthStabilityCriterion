import React from "react";

function RouthTable({ routhArray, isStable, positiveRoots }) {
  if (!routhArray || routhArray.length === 0) {
    return null;
  }

  const maxCols = Math.max(...routhArray.map((row) => row.length));

  // Count sign changes in the first column
  const countSignChanges = () => {
    let count = 0;
    let firstCol = routhArray.map((row) => row[0]);

    // Filter out zeros or very small numbers
    firstCol = firstCol.filter((val) => Math.abs(val) > 1e-15);

    for (let i = 0; i < firstCol.length - 1; i++) {
      if (firstCol[i] * firstCol[i + 1] < 0) {
        count++;
      }
    }

    return count;
  };

  const signChangeCount = countSignChanges();

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
                    {cellIndex === 0 && Math.abs(cell) < 1e-15
                      ? "1e-10"
                      : cell.toFixed(2)}
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
          <div className="mt-2">
            <p>
              Number of right-half plane poles:{" "}
              <span className="font-bold">{signChangeCount}</span>{" "}
              <span className="text-sm">
              </span>
            </p>

            {/* Display the actual roots */}
            <div className="mt-2">
              <p className="font-semibold">Right-half plane poles:</p>
              <ul className="list-disc pl-6">
                {(() => {
                  // Single number
                  if (typeof positiveRoots === "number") {
                    return <li>{positiveRoots.toFixed(2)}</li>;
                  }

                  // Array of numbers or objects
                  if (Array.isArray(positiveRoots)) {
                    return positiveRoots.map((root, idx) => {
                      if (typeof root === "number") {
                        // Simple real number
                        return <li key={idx}>{root.toFixed(2)}</li>;
                      } else if (typeof root === "object" && root !== null) {
                        // Complex number as object with real/imag
                        try {
                          const realPart =
                            typeof root.real === "number"
                              ? root.real.toFixed(2)
                              : root.real;
                          let imagPart = "";
                          if (root.imag !== 0) {
                            const imagValue =
                              typeof root.imag === "number"
                                ? Math.abs(root.imag).toFixed(2)
                                : Math.abs(parseFloat(root.imag));
                            const imagSign =
                              parseFloat(String(root.imag)) >= 0 ? "+" : "-";
                            imagPart = `${imagSign} ${imagValue}i`;
                          }
                          return (
                            <li key={idx}>
                              {realPart} {imagPart}
                            </li>
                          );
                        } catch (err) {
                          return <li key={idx}>{JSON.stringify(root)}</li>;
                        }
                      }
                      return <li key={idx}>{String(root)}</li>;
                    });
                  }

                  // Object with numeric keys (complex numbers)
                  if (
                    typeof positiveRoots === "object" &&
                    positiveRoots !== null
                  ) {
                    return Object.keys(positiveRoots).map((key) => {
                      const root = positiveRoots[key];
                      try {
                        const realPart =
                          typeof root.real === "number"
                            ? root.real.toFixed(2)
                            : root.real;
                        let imagPart = "";
                        if (root.imag !== 0) {
                          const imagValue =
                            typeof root.imag === "number"
                              ? Math.abs(root.imag).toFixed(2)
                              : Math.abs(parseFloat(root.imag));
                          const imagSign =
                            parseFloat(String(root.imag)) >= 0 ? "+" : "-";
                          imagPart = `${imagSign} ${imagValue}i`;
                        }
                        return (
                          <li key={key}>
                            {realPart} {imagPart}
                          </li>
                        );
                      } catch (err) {
                        return <li key={key}>{JSON.stringify(root)}</li>;
                      }
                    });
                  }

                  return <li>No roots data available</li>;
                })()}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RouthTable;

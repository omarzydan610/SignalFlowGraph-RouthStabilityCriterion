import React from "react";

const Modal = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 p-6 rounded-lg shadow-lg w-1/2 h-3/4 overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white">Result</h2>
        <div>
          {Object.entries(result).map(([key, value], index) => (
            <div
              key={index}
              className="mb-2 text-white text-lg border-b border-gray-300 pb-2"
            >
              <strong>{key}:</strong>
              {Array.isArray(value) ? (
                value.length > 0 ? (
                  value.map((item, idx) => (
                    <div key={idx} className="ml-4">
                      {Array.isArray(item) ? item.join(", ") : item}
                    </div>
                  ))
                ) : (
                  <span className="ml-4">None</span>
                )
              ) : (
                <span> {value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

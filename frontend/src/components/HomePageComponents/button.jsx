import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-10 py-4
        font-semibold text-white text-lg
        bg-blue-400
        rounded-xl
        shadow-lg
        transition-all duration-300
        hover:bg-blue-500
        hover:scale-105
        hover:shadow-blue-400/50
        active:scale-95
      `}
    >
      {children}
    </button>
  );
}

export default Button;

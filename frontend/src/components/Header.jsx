import React from "react";
import { IoArrowBack } from "react-icons/io5";

const Header = ({ navigate, label }) => (
  <div className="w-full bg-white/10 backdrop-blur-sm shadow-lg relative h-16">
    <button
      onClick={() => navigate("/")}
      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 
      text-white bg-blue-400 rounded-full text-xl
      transition-all duration-300 hover:bg-blue-500 
      hover:shadow-blue-400/50 hover:scale-105 
      active:scale-95"
    >
      <IoArrowBack />
    </button>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 text-transparent bg-clip-text pt-3 text-center">
      {label}
    </h1>
  </div>
);

export default Header;

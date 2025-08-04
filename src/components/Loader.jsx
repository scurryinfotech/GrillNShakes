import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen white">
      <div className="relative w-16 h-16">
        {/* Main spinning ring with gradient */}
        <div className="w-16 h-16 rounded-full animate-spin" style={{
          background: 'conic-gradient(from 0deg, #3b82f6 0deg, #ef4444 180deg, transparent 180deg, transparent 360deg)',
          mask: 'radial-gradient(circle at center, transparent 50%, black 52%)',
          WebkitMask: 'radial-gradient(circle at center, transparent 50%, black 52%)'
        }}></div>
      </div>
    </div>
  );
};

export default Loader;
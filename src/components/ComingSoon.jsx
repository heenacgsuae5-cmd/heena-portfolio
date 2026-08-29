import React from 'react';

const ComingSoon = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#ccff00] w-full">
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest mb-8 text-center px-4">
        Coming Soon
      </h1>
      <button 
        onClick={onBack}
        className="cursor-pointer px-8 py-3 rounded-full border border-[#ccff00] text-black bg-[#ccff00] font-bold text-sm md:text-base hover:bg-black hover:text-[#ccff00] transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default ComingSoon;

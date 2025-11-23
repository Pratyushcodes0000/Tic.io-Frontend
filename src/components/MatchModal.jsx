import React from "react";

const MatchModal = ({ visible, onCancel }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Modal Card */}
      <div className="relative glass rounded-3xl p-8 md:p-10 max-w-md w-full text-center animate-scaleIn shadow-2xl border border-white/30">
        {/* Animated Loader */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-20 h-20">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 border-r-blue-400 rounded-full animate-spin"></div>
            
            {/* Inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Finding a Match...
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 mb-8 text-base md:text-lg">
          Please wait while we pair you with a player
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-red-500/30 hover:border-red-500/50"
        >
          Cancel Search
        </button>
      </div>

    </div>
  );
};

export default MatchModal;

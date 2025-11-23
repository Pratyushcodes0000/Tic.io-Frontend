// GameEndModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "./Socket";

const GameEndModal = ({ visible, result }) => {
  const navigate = useNavigate();
  if (!visible) return null;

  const returnToDashboard = () => {
    navigate("/");
    socket.emit("back_to_dashboard");
    
  };

  const getResultContent = () => {
    if (result === "draw") {
      return {
        emoji: "🤝",
        title: "It's a Draw!",
        subtitle: "Great game! Both players played well.",
        gradient: "from-gray-400 to-gray-600",
        iconBg: "bg-gray-500/20",
        iconColor: "text-gray-300",
      };
    } else {
      const isWin = result === "X" || result === "O";
      return {
        emoji: isWin ? "🎉" : "😔",
        title: isWin ? `${result} Wins!` : "Game Over",
        subtitle: isWin ? "Congratulations on the victory!" : "Better luck next time!",
        gradient: result === "X" ? "from-blue-400 to-blue-600" : "from-purple-400 to-purple-600",
        iconBg: result === "X" ? "bg-blue-500/20" : "bg-purple-500/20",
        iconColor: result === "X" ? "text-blue-300" : "text-purple-300",
      };
    }
  };

  const content = getResultContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={returnToDashboard}
      ></div>

      {/* Modal Card */}
      <div className="relative glass rounded-3xl p-8 md:p-10 max-w-md w-full text-center animate-scaleIn shadow-2xl border border-white/30">
        {/* Result Icon */}
        <div className={`mb-6 mx-auto w-24 h-24 ${content.iconBg} rounded-full flex items-center justify-center text-6xl`}>
          {content.emoji}
        </div>

        {/* Title */}
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${content.gradient} bg-clip-text text-transparent`}>
          {content.title}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 mb-8 text-lg">
          {content.subtitle}
        </p>

        {/* Symbol Display (if not draw) */}
        {result !== "draw" && (
          <div className={`mb-8 inline-flex items-center justify-center w-20 h-20 ${content.iconBg} rounded-2xl text-5xl font-bold ${content.iconColor}`}>
            {result}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={returnToDashboard}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Return to Dashboard
          </button>
        </div>
      </div>

    </div>
  );
};

export default GameEndModal;

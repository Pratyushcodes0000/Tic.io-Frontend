import React, { useState, useEffect } from "react";
import socket from "./Socket";
import { useNavigate } from "react-router-dom";
import Modal from "./MatchModal";
import Online from "./PlayersOnline.jsx";

// Decorative Tic-Tac-Toe Board Component
const TicTacToeBoard = ({ size = "small" }) => {
  const sizeClass = size === "small" ? "w-24 h-24" : "w-32 h-32";
  const cellSize = size === "small" ? "w-7 h-7" : "w-9 h-9";
  const textSize = size === "small" ? "text-lg" : "text-xl";
  
  // Random pattern for visual appeal
  const pattern = ["X", "", "O", "", "X", "O", "", "X", ""];
  
  return (
    <div className={`${sizeClass} glass rounded-lg p-2 border border-white/10`}>
      <div className="grid grid-cols-3 gap-1 h-full">
        {pattern.map((value, index) => (
          <div
            key={index}
            className={`${cellSize} flex items-center justify-center ${value ? (value === "X" ? "text-blue-400/60" : "text-purple-400/60") : ""} ${textSize} font-bold`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [finding, setFinding] = useState(false);
  const [online, setOnline] = useState(0);

  useEffect(() => {

    socket.emit("request_online_players");
    
    socket.on("online_players", (onlineCount) => {
      setOnline(onlineCount);
    });

    return () => {
      socket.off("online_players");
    };
  }, [online]);

  const handleFindMatch = () => {
    socket.emit("find_match");
    setFinding(true);
    socket.once("match_found", ({ opponent }) => {
      console.log("Match found with opponent:", opponent);
      setFinding(false);
      navigate("/game");
    });
  };

  const handleCancel = () => {
    socket.emit("cancel_find_match");
    setFinding(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="absolute bottom-0 w-full h-64 md:h-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="rgba(168, 85, 247, 0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="wave-animation-1"></path>
            <path fill="rgba(59, 130, 246, 0.1)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="wave-animation-2"></path>
          </svg>
        </div>
      </div>

      {/* Decorative Tic-Tac-Toe Board Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* Top Left Board */}
        <div className="absolute top-20 left-10 hidden md:block">
          <TicTacToeBoard size="small" />
        </div>
        {/* Top Right Board */}
        <div className="absolute top-32 right-10 hidden lg:block">
          <TicTacToeBoard size="small" />
        </div>
        {/* Bottom Left Board */}
        <div className="absolute bottom-32 left-10 hidden lg:block">
          <TicTacToeBoard size="small" />
        </div>
        {/* Bottom Right Board */}
        <div className="absolute bottom-20 right-10 hidden md:block">
          <TicTacToeBoard size="small" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* App Title */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Tic.io
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">Multiplayer Tic-Tac-Toe</p>
        </div>

        {/* Main Content Card */}
        <div className="space-y-6">
          {/* Online Players Card */}
          <Online online={online} />

          {/* Find Match Button */}
          <button
            onClick={handleFindMatch}
            disabled={finding}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {finding ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Match...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find a Match
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Match Modal */}
      <Modal visible={finding} onCancel={handleCancel} />
    </div>
  );
};

export default Dashboard;

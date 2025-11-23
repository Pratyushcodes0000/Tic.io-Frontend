import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";
import { useNavigate } from "react-router-dom";
import socket from "./Socket.jsx";
import GameEndModal from "./GameEndModal.jsx";

const GameScreen = () => {
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState(null);
  const [roomId, setroomId] = useState(null);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [status, setStatus] = useState("playing");
  const [myturn, setMyturn] = useState(false);
  const [me, setMe] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log("GameScreen mounted");
    socket.emit("ready_for_game"); // confirm presence in room
  }, []);

  useEffect(() => {
    socket.on("symbol", ({ symbol, opponent }) => {
      setMe(symbol);
      console.log("My symbol is:", symbol);
      setOpponent(opponent);
      console.log("Opponent symbol is:", opponent);
      setMyturn(symbol === "X"); // X always starts // boolean
      console.log("Is it my turn?", symbol === "X");
    });

    return () => {
      socket.off("symbol");
    };
  }, []);

  useEffect(() => {
    socket.once("game:start", (data) => {
      setroomId(data.roomId);
      setBoard(data.board);
      setTurn(data.turn);
      setStatus(data.status);
    });

    socket.on("move:done", ({ board, turn }) => {
      setBoard(board);
      setTurn(turn);
      setMyturn(turn === me);
      console.log(
        "Updated turn:",
        turn,
        "My symbol:",
        me,
        "Is my turn:",
        turn === me,
      );
    });

    return () => {
      socket.off("game:start");
      socket.off("move:done");
    };
  }, [me, turn]);

  //game end socket handler
  useEffect(() => {
    socket.on("game:end", ({ result, board }) => {
      setResult(result);
      setBoard(board);
      setStatus("ended");
    });

    return () => {
      socket.off("game:end");
    };
  }, []);

  const handleSquareClick = (index) => {
    console.log("Square clicked:", index);
    if (!myturn || board[index] !== "" || status !== "playing") return;

    setMyturn(false);

    socket.emit("move", { index, symbol: turn });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Turn Indicator */}
      <div className="mb-6 w-full max-w-2xl">
        <div className="glass rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`w-3 h-3 rounded-full ${turn === "X" ? "bg-blue-400 animate-pulse" : "bg-purple-400 animate-pulse"}`}></div>
            <h2 className="text-xl font-semibold">
              {status === "playing" ? (
                <span>
                  {turn === me ? "Your Turn" : "Opponent's Turn"}
                </span>
              ) : (
                <span>Game Ended</span>
              )}
            </h2>
            <div className={`w-3 h-3 rounded-full ${turn === "O" ? "bg-blue-400 animate-pulse" : "bg-purple-400 animate-pulse"}`}></div>
          </div>
          <p className="text-sm text-gray-300">
            Current Turn: <span className="font-bold text-lg">{turn}</span>
          </p>
        </div>
      </div>

      {/* Player Cards */}
      <div className="mb-6 w-full max-w-2xl grid grid-cols-2 gap-4">
        {/* My Card */}
        <div className={`glass rounded-xl p-4 transition-all duration-300 ${myturn && status === "playing" ? "ring-2 ring-purple-400 neon-glow" : "opacity-70"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">You</p>
              <p className="text-2xl font-bold">{me || "—"}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold ${me === "X" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
              {me || "?"}
            </div>
          </div>
          {myturn && status === "playing" && (
            <div className="mt-2 text-xs text-purple-300 animate-pulse">Your turn!</div>
          )}
        </div>

        {/* Opponent Card */}
        <div className={`glass rounded-xl p-4 transition-all duration-300 ${!myturn && status === "playing" ? "ring-2 ring-blue-400 neon-glow" : "opacity-70"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Opponent</p>
              <p className="text-2xl font-bold">{opponent || "—"}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold ${opponent === "X" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
              {opponent || "?"}
            </div>
          </div>
          {!myturn && status === "playing" && (
            <div className="mt-2 text-xs text-blue-300 animate-pulse">Their turn</div>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className={!myturn ? "disabled-cursor" : ""}>
        <Board
          board={board}
          turn={turn}
          onSquareClick={handleSquareClick}
          me={me}
        />
      </div>

      {/* Game End Modal */}
      <GameEndModal visible={status === "ended"} result={result} />
    </div>
  );
};

export default GameScreen;

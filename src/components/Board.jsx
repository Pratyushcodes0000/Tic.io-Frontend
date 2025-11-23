function Board({ board, turn, winner, onSquareClick, onReset, me }) {
  const getSymbolColor = (symbol) => {
    if (symbol === "X") return "text-blue-400";
    if (symbol === "O") return "text-purple-400";
    return "text-transparent";
  };

  const getSymbolGlow = (symbol) => {
    if (symbol === "X") return "shadow-[0_0_15px_rgba(59,130,246,0.6)]";
    if (symbol === "O") return "shadow-[0_0_15px_rgba(168,85,247,0.6)]";
    return "";
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Tic Tac Toe
      </h1>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8 p-4 glass rounded-2xl">
        {board.map((value, index) => (
          <button
            key={index}
            className={`
              w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
              glass rounded-xl
              flex items-center justify-center
              text-4xl md:text-5xl lg:text-6xl font-bold
              transition-all duration-300
              ${value ? "cursor-default" : "cursor-pointer"}
              ${value ? getSymbolColor(value) : "text-gray-400"}
              ${value ? getSymbolGlow(value) : ""}
              hover:scale-105 hover:bg-white/20
              active:scale-95
              ${value ? "" : "hover:neon-glow"}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            onClick={() => onSquareClick(index)}
            disabled={!!value}
          >
            {value || ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Board;

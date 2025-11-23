import React from "react";
import "./App.css";
import Board from "./components/Board.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import GameScreen from "./components/GameScreen.jsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

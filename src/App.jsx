import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerSettings from "./pages/PlayerSettings";
import GameSettings from "./pages/GameSettings";
import CardManager from "./pages/CardManager";
import Game from "./pages/Game";
import Layout from "./components/Layout";
import { GameProvider } from "./context/GameProvider";


export default function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="players" element={<PlayerSettings />} />
            <Route path="settings" element={<GameSettings />} />
            <Route path="cards" element={<CardManager />} />
            <Route path="game" element={<Game />} />
          </Route>
        </Routes>
      </Router>
    </GameProvider>
  );
}

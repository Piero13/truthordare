import { useEffect } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useGameStore } from "../context/gameStore";
import { getAll } from "../db/db";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import GameSetupModal from "../components/Game/GameSetupModal";
import GameScoreboard from "../components/Game/GameScoreboard";
import GameControls from "../components/Game/GameControls";
import GameCard from "../components/Game/GameCard";

export default function Game() {
  const {
    players,
    gameSettings,
    gameState,
    setGameState,
    loadFromDB,
    resetGame
  } = useGameStore();

  useEffect(() => {
    loadFromDB().then(() => {
      if (!players.length || !gameSettings) return;
      if (gameState.cardsPlayedCount > 0 && !gameState.gameOver) {
        if (!window.confirm("Reprendre la partie en cours ?")) {
          resetGame();
        }
      } else {
        setGameState({ showSetup: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (players.length && gameSettings) {
      loadCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, gameSettings, gameState.currentLevel]);

  const loadCards = async () => {
    let cards = await getAll("cards");
    const filtered = cards.filter(card => {
      if (card.type === "action" && card.niveau > gameSettings.niveau) return false;
      if (gameSettings.tirage !== "aleatoire" && card.type !== gameSettings.tirage) return false;
      return true;
    });
    setGameState({ availableCards: filtered });
  };

  const filterCardsForPlayer = (playerIndex, type = null, excludeCardId = null) => {
    const currentPlayerData = players[playerIndex];

    return gameState.availableCards.filter(card => {
      if (
        card.genre &&
        card.genre !== "all" &&
        card.genre !== "M" && // ✅ genre mixte autorisé pour tout le monde
        card.genre !== currentPlayerData.genre
      ) {
        return false;
      }
      if (card.type === "action" && card.actes?.length) {
        const matchActes = card.actes.some(a => currentPlayerData.actes.includes(a));
        if (!matchActes) return false;
      }
      if (card.type === "action" && card.niveau !== gameState.currentLevel) {
        return false;
      }
      if (type && card.type !== type) {
        return false;
      }
      if (excludeCardId && card.id === excludeCardId) {
        return false;
      }
      return true;
    });
  };

  const handleStart = (playerIndex) => {
    setGameState({ currentPlayer: playerIndex, showSetup: false });
  };

  const handleChoose = (type) => {
    let chosenType = type;
    if (type === "random" && gameSettings.tirage === "aleatoire") {
      const isAction = Math.random() * 100 < gameSettings.pourcentageActions;
      chosenType = isAction ? "action" : "verite";
    }
    const filtered = filterCardsForPlayer(gameState.currentPlayer, chosenType);
    if (filtered.length > 0) {
      const card = filtered[Math.floor(Math.random() * filtered.length)];
      setGameState({ currentCard: card });
    } else {
      alert("Aucune carte disponible pour ce joueur !");
    }
  };

  const handleValidate = (accepted) => {
    let points = gameState.currentCard.type === "action"
      ? gameState.currentCard.niveau
      : 1;

    const newScores = [...gameState.scores];
    if (accepted) {
      newScores[gameState.currentPlayer] += points;
    } else {
      newScores[gameState.currentPlayer] -= points;
    }

    const newCount = gameState.cardsPlayedCount + 1;
    let newLevel = gameState.currentLevel;
    const cardsPerLevel = Math.floor(gameSettings.duree / gameSettings.niveau);
    if (newCount % cardsPerLevel === 0 && newLevel < gameSettings.niveau) {
      newLevel++;
    }

    const gameOver = newCount >= gameSettings.duree;

    setGameState({
      scores: newScores,
      cardsPlayedCount: newCount,
      currentLevel: newLevel,
      gameOver,
      currentCard: null,
      currentPlayer: gameOver ? gameState.currentPlayer : (gameState.currentPlayer + 1) % 2
    });
  };

  const handleJoker = () => {
    if (!gameState.currentCard) return;
    const filtered = filterCardsForPlayer(
      gameState.currentPlayer,
      gameState.currentCard.type,
      gameState.currentCard.id
    );
    if (filtered.length > 0) {
      const card = filtered[Math.floor(Math.random() * filtered.length)];
      setGameState({ currentCard: card });
    } else {
      alert("Aucune autre carte disponible pour ce joueur !");
    }
  };

  const restartGame = () => {
    resetGame();
    setGameState({ showSetup: true });
  };

  return (
    <Container className="pt-4 px-4">
      <GameSetupModal
        show={gameState.showSetup}
        players={players}
        onSelect={handleStart}
      />

      {!gameState.showSetup && (
        <>
            <div className="d-flex justify-content-center">
                <GameScoreboard
                    players={players}
                    scores={gameState.scores}
                    currentPlayer={gameState.currentPlayer}
                />
            </div>
            <p className="text-center">Niveau actuel : {gameState.currentLevel}</p>

            {gameState.gameOver && (
                <Alert variant="success" className="text-center">
                🎉 Partie terminée !<br />
                Scores finaux : {players[0].name} {gameState.scores[0]} pts -{" "}
                {players[1].name} {gameState.scores[1]} pts
                <div className="mt-3">
                    <Button className="bg-gradient-tertiary" onClick={restartGame}>
                    Rejouer
                    </Button>
                </div>
                </Alert>
            )}

            {!gameState.gameOver && !gameState.currentCard && (
                <GameControls
                  modeTirage={gameSettings.tirage}
                  onChoose={handleChoose}
                />
            )}

            <AnimatePresence mode="wait">
            {!gameState.gameOver && gameState.currentCard && (
                <motion.div
                  key={gameState.currentCard.id}
                  initial={{ opacity:0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <GameCard
                    card={gameState.currentCard}
                    onValidate={handleValidate}
                    onJoker={handleJoker}
                  />
                </motion.div>
            )}
            </AnimatePresence>
        </>
      )}
    </Container>
  );
}

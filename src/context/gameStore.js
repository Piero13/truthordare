import { create } from "zustand";
import { getItem, setItem, clearStore } from "../db/db";

export const useGameStore = create((set, get) => ({
  players: [],
  gameSettings: null,

  // État complet de la partie
  gameState: {
    showSetup: true,
    currentPlayer: 0,
    scores: [0, 0],
    currentLevel: 1,
    cardsPlayedCount: 0,
    availableCards: [],
    currentCard: null,
    gameOver: false
  },

  /**
   * Met à jour l'état de la partie et le sauvegarde en IndexedDB
   */
  setGameState: (updates) => {
    const newState = { ...get().gameState, ...updates };
    set({ gameState: newState });
    setItem("gameState", newState, "state");
  },

  /**
   * Met à jour les joueurs et sauvegarde
   */
  setPlayers: (players) => {
    set({ players });
    setItem("players", players, "list");
  },

  /**
   * Met à jour les paramètres de jeu et sauvegarde
   */
  setGameSettings: (settings) => {
    set({ gameSettings: settings });
    setItem("gameSettings", settings, "settings");
  },

  /**
   * Charge toutes les données sauvegardées depuis IndexedDB
   */
  loadFromDB: async () => {
    const savedPlayers = await getItem("players", "list");
    const savedSettings = await getItem("gameSettings", "settings");
    const savedGameState = await getItem("gameState", "state");

    if (savedPlayers) set({ players: savedPlayers });
    if (savedSettings) set({ gameSettings: savedSettings });
    if (savedGameState) set({ gameState: savedGameState });
  },

  /**
   * Réinitialise uniquement la partie (pas les joueurs ni les paramètres)
   */
  resetGame: async () => {
    const resetState = {
      showSetup: true,
      currentPlayer: 0,
      scores: [0, 0],
      currentLevel: 1,
      cardsPlayedCount: 0,
      availableCards: [],
      currentCard: null,
      gameOver: false
    };
    set({ gameState: resetState });
    await clearStore("gameState");
  }
}));

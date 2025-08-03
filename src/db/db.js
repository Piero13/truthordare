const DB_NAME = "TruthOrDareDB";
const DB_VERSION = 3; // ⬅️ incrémenté pour recréer les stores si besoin

// Ouvrir la base
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store des cartes avec autoIncrement
      if (!db.objectStoreNames.contains("cards")) {
        db.createObjectStore("cards", { keyPath: "id", autoIncrement: true });
      }

      // Store pour les joueurs (clé fixe)
      if (!db.objectStoreNames.contains("players")) {
        db.createObjectStore("players"); // pas de keyPath, on utilisera clé "list"
      }

      // Store pour paramètres de jeu (clé fixe)
      if (!db.objectStoreNames.contains("gameSettings")) {
        db.createObjectStore("gameSettings"); // clé "settings"
      }

      // Store pour l'état de partie (clé fixe)
      if (!db.objectStoreNames.contains("gameState")) {
        db.createObjectStore("gameState"); // clé "state"
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (err) => reject(err);
  });
};

// Ajouter / mettre à jour un élément
export const setItem = async (storeName, value, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = key !== undefined ? store.put(value, key) : store.put(value);
    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
};

// Récupérer un élément par clé
export const getItem = async (storeName, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = (err) => reject(err);
  });
};

// Récupérer tous les éléments
export const getAll = async (storeName) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = (err) => reject(err);
  });
};

// Supprimer un élément par clé
export const deleteItem = async (storeName, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
};

// Vider complètement un store
export const clearStore = async (storeName) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
};

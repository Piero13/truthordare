// src/data/options.js

export const genreOptions = [
  { value: "H", label: "Homme" },
  { value: "F", label: "Femme" },
  { value: "M", label: "Mixte"}
];

export const genreOptionsPlayers = genreOptions.filter(opt => opt.value !== "M");

export const tenueOptions = [
  { value: "1", label: "Habillé(e)" },
  { value: "2", label: "Sous-vêtements" },
  { value: "3", label: "Nu(e)" }
];

export const actesOptions = [
  { value: "1", label: "Soft (caresses, masturbation...)" },
  { value: "2", label: "Oral" },
  { value: "3", label: "Anal soft (doigt, langue...)" },
  { value: "4", label: "Anal hard (jouet, sexe...)" },
  { value: "5", label: "Domination" },
  { value: "6", label: "Soumission" },
  { value: "7", label: "Photo" },
  { value: "8", label: "Vidéo" },
  { value: "9", label: "Fun (scénarios, défis..." }
];

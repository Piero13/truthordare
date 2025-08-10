import { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useGameStore } from "../context/gameStore";

export default function GameSettings() {
  const { gameSettings, setGameSettings, gameState, resetGame } = useGameStore();

  const [form, setForm] = useState(
    gameSettings || {
      tirage: "aleatoire",
      duree: 50,
      niveau: 3,
      pourcentageActions: 50
    }
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (gameState.cardsPlayedCount > 0 && !gameState.gameOver) {
      setShowConfirm(true);
    } else {
      saveSettings();
    }
  };

  const saveSettings = () => {
    setGameSettings(form);
    resetGame();
    setShowConfirm(false);
    alert("Paramètres enregistrés !");
  };

  return (
    <Container className="p-4">
      <h2 className="mb-8 text-primary">Paramètres de jeu</h2>

      <Form>
        {/* Mode de tirage */}
        <Form.Group className="mb-4 border border-2 border-primary p-2 bg-secondary rounded-2 bs-primary">
          <Form.Label className="text-primary">Mode de tirage</Form.Label>
          <Form.Select
            className="border border-2 border-primary"
            value={form.tirage}
            onChange={(e) => handleChange("tirage", e.target.value)}
          >
            <option value="aleatoire">Aléatoire</option>
            <option value="choix">Au choix</option>
          </Form.Select>
        </Form.Group>

        {/* Durée */}
        <Form.Group className="mb-4 border border-2 border-primary p-2 bg-secondary rounded-2 bs-primary">
          <Form.Label className="text-primary">Durée (cartes totales par joueur)</Form.Label>
          <Form.Select
            className="border border-2 border-primary"
            value={form.duree}
            onChange={(e) => handleChange("duree", Number(e.target.value))}
          >
            <option value={20}>Très courte (20 cartes)</option>
            <option value={30}>Courte (30 cartes)</option>
            <option value={50}>Moyenne (50 cartes)</option>
            <option value={80}>Longue (80 cartes)</option>
            <option value={100}>Très longue (100 cartes)</option>
          </Form.Select>
        </Form.Group>

        {/* Niveau max */}
        <Form.Group className="mb-4 border border-2 border-primary p-2 bg-secondary rounded-2 bs-primary">
          <Form.Label className="text-primary">Niveau max</Form.Label>
          <Form.Select
            className="border border-2 border-primary"
            value={form.niveau}
            onChange={(e) => handleChange("niveau", Number(e.target.value))}
          >
            <option value={1}>Facile (niveau 1)</option>
            <option value={2}>Moyen (niveau 1 à 2)</option>
            <option value={3}>Difficile (niveau 1 à 3)</option>
            <option value={4}>Très difficile (niveau 1 à 4)</option>
            <option value={5}>Extrême (niveau 1 à 5)</option>
          </Form.Select>
        </Form.Group>

        {/* Pourcentage d'actions */}
        {form.tirage === "aleatoire" && (
          <Form.Group className="mb-8 border border-2 border-primary p-2 bg-secondary rounded-2 bs-primary">
            <Form.Label className="text-primary">Pourcentage d'actions</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Range
                className="px-2 py-3 me-2 border border-2 border-primary rounded-1 bg-white"
                value={form.pourcentageActions}
                min={0}
                max={100}
                step={10}
                onChange={(e) => handleChange("pourcentageActions", Number(e.target.value))}
              />
              <div className="w-content">{form.pourcentageActions}%</div>
            </div>
            
          </Form.Group>
        )}

        <Button className="bg-gradient-tertiary border border-2 border-primary p-2" onClick={handleSave}>
          Enregistrer
        </Button>
      </Form>

      {/* Confirmation si partie en cours */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Réinitialiser la partie ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Changer les paramètres va réinitialiser la partie en cours.
          Voulez-vous continuer ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={saveSettings}>
            Oui, réinitialiser
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

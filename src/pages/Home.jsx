import { useState } from "react";
import { Container, Button, Modal, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../context/gameStore";

export default function Home() {
  const navigate = useNavigate();
  const { players, gameState, resetGame } = useGameStore();

  const [showModal, setShowModal] = useState(false);

  const hasOngoingGame =
    gameState.cardsPlayedCount > 0 && !gameState.gameOver;

  const handlePlay = () => {
    if (hasOngoingGame) {
      setShowModal(true);
    } else {
      navigate("/game");
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate("/game");
  };

  const handleNewGame = async () => {
    await resetGame();
    setShowModal(false);
    navigate("/game");
  };

  return (
    <Container className=" text-center p-4">
      <h1 className="mb-8">Truth or Dare</h1>

      <div className="d-flex justify-content-center">
        {/* Affichage joueurs si existants */}
        {players.length === 2 && (
          <Row className="mb-8">
            {players.map((p, i) => (
              <Col key={i}>
                <Card className="pt-3 px-3 border border-primary">
                  <h5>{p.name || `Joueur ${i + 1}`}</h5>
                  {hasOngoingGame ? (
                    <p>{gameState.scores[i]} pts</p>
                  ) : (
                    <p>-</p>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Bouton Jouer */}
      <Button variant="primary" size="lg" onClick={handlePlay}>
        Jouer
      </Button>

      {/* Boutons paramètres */}
      <div className="mt-8">
        <Button
          variant="secondary outline-primary"
          className="mb-4 border border-2 border-primary"
          onClick={() => navigate("/players")}
        >
          Paramètres des joueurs
        </Button>
        <Button
          variant="secondary"
          className="border border-2 border-primary"
          onClick={() => navigate("/settings")}
        >
          Paramètres de jeu
        </Button>
      </div>

      {/* Modal choix continuer/nouvelle partie */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Partie en cours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Une partie est déjà en cours. Voulez-vous la continuer ou démarrer une nouvelle partie ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="success" onClick={handleContinue}>
            Continuer
          </Button>
          <Button variant="danger" onClick={handleNewGame}>
            Nouvelle partie
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

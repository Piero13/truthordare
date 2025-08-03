import { useState, useEffect } from "react";
import { Container, Form, Button, Modal, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../context/gameStore";
import { genreOptions, tenueOptions, actesOptions } from "../datas/playerOptions";

export default function PlayerSettings() {
    const navigate = useNavigate();
    const { players, setPlayers, gameState, resetGame, loadFromDB } = useGameStore();

    const [localPlayers, setLocalPlayers] = useState([
        { name: "Joueur 1", genre: "H", tenue: "1", actes: [] },
        { name: "Joueur 2", genre: "F", tenue: "1", actes: [] }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [pendingSave, setPendingSave] = useState(false);

    useEffect(() => {
        loadFromDB();
    }, [loadFromDB]);

    useEffect(() => {
        if (players.length === 2) {
            setLocalPlayers(players);
        }
    }, [players]);


    const handleChange = (index, field, value) => {
        const updated = [...localPlayers];
        updated[index][field] = value;
        setLocalPlayers(updated);
    };

    const handleActeChange = (index, acte) => {
        const updated = [...localPlayers];
        const current = updated[index].actes;
        updated[index].actes = current.includes(acte)
        ? current.filter(a => a !== acte)
        : [...current, acte];
        setLocalPlayers(updated);
    };

    const saveSettings = async () => {
        await setPlayers(localPlayers);
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (gameState) {
        setPendingSave(true);
        setShowModal(true);
        } else {
        saveSettings();
        }
    };

    const confirmSave = async () => {
        await resetGame();
        setShowModal(false);
        if (pendingSave) {
        await saveSettings();
        setPendingSave(false);
        }
    };

    return (
        <Container className="p-4">
            <h2 className="mb-8">Paramètres des joueurs</h2>
            <Form onSubmit={handleSubmit}>
                <Accordion alwaysOpen className="mb-8">
                {localPlayers.map((player, index) => (
                    <Accordion.Item eventKey={String(index)} key={index} className="mb-4">
                    <Accordion.Header className="border border-2 border-primary rounded-1">
                        <Form.Group className="mb-0 w-100 ">
                        <Form.Label>Nom du joueur {index + 1}</Form.Label>
                        <Form.Control
                            type="text"
                            value={player.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                        />
                        </Form.Group>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-2">
                        <Form.Label>Genre</Form.Label>
                        <div>
                            {genreOptions.map(opt => (
                            <Form.Check
                                className="text-start"
                                key={opt.value}
                                inline
                                type="radio"
                                label={opt.label}
                                name={`genre-${index}`}
                                checked={player.genre === opt.value}
                                onChange={() => handleChange(index, "genre", opt.value)}
                            />
                            ))}
                        </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                        <Form.Label>Tenue</Form.Label>
                        <div>
                            {tenueOptions.map(opt => (
                            <Form.Check
                                className="text-start"
                                key={opt.value}
                                inline
                                type="radio"
                                label={opt.label}
                                name={`tenue-${index}`}
                                checked={player.tenue === opt.value}
                                onChange={() => handleChange(index, "tenue", opt.value)}
                            />
                            ))}
                        </div>
                        </Form.Group>

                        <Form.Group className="mb-2">
                        <Form.Label>Actes</Form.Label>
                        <div>
                            {actesOptions.map(opt => (
                            <Form.Check
                                className="text-start"
                                key={opt.value}
                                inline
                                type="checkbox"
                                label={opt.label}
                                checked={player.actes.includes(opt.value)}
                                onChange={() => handleActeChange(index, opt.value)}
                            />
                            ))}
                        </div>
                        </Form.Group>

                    </Accordion.Body>
                    </Accordion.Item>
                ))}
                </Accordion>

                <Button type="submit" className="bg-gradient-tertiary border border-2 border-primary mb-4">
                    Enregistrer
                </Button>
                <Button variant="secondary" className=" border border-2 border-primary" onClick={() => navigate("/")}>
                    Annuler
                </Button>
            </Form>

            {/* Modal confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Réinitialiser la partie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Changer les paramètres des joueurs va réinitialiser la partie en cours. Continuer ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={confirmSave}>
                    Oui, réinitialiser
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

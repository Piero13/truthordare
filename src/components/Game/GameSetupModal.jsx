import { Modal, Button } from "react-bootstrap";

export default function GameSetupModal({ show, players, onSelect }) {
  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Header className="bg-secondary">
        <Modal.Title>Qui commence ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center px-4 bg-secondary rounded-2">
        {players.map((p, index) => (
          <Button
            key={index}
            className="p-2 mb-4 bg-gradient-tertiary border border-2 border-primary rounded-5 bs-primary"
            onClick={() => onSelect(index)}
          >
            {p.name}
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}

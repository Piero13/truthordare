import { Modal, Button } from "react-bootstrap";

export default function GameSetupModal({ show, players, onSelect }) {
  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Qui commence ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center px-4">
        {players.map((p, index) => (
          <Button
            key={index}
            className="p-2 mb-4 bg-gradient-tertiary border border-2 border-primary"
            onClick={() => onSelect(index)}
          >
            {p.name}
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}

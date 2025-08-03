import { Modal, Button } from "react-bootstrap";

export default function GameSetupModal({ show, players, onSelect }) {
  return (
    <Modal show={show} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Qui commence ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {players.map((p, index) => (
          <Button
            key={index}
            className="m-2 bg-gradient-tertiary"
            onClick={() => onSelect(index)}
          >
            {p.name}
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}

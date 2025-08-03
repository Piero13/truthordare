import { Button } from "react-bootstrap";

export default function GameControls({ modeTirage, onChoose }) {
  if (modeTirage === "aleatoire") {
    return (
      <div className="d-flex justify-content-center gap-2 mb-3">
        <Button variant="primary" onClick={() => onChoose("random")}>
          Tirage aléatoire
        </Button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center gap-2 mb-3">
      <Button className="text-secondary" variant="quaternary" onClick={() => onChoose("action")}>
        Action
      </Button>
      <Button variant="success" onClick={() => onChoose("verite")}>
        Vérité
      </Button>
    </div>
  );
}

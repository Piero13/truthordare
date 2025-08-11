import { Button } from "react-bootstrap";

export default function GameControls({ modeTirage, onChoose }) {
  if (modeTirage === "aleatoire") {
    return (
      <div className="d-flex justify-content-center gap-2 mb-3">
        <Button className="bg-gradient-tertiary" onClick={() => onChoose("random")}>
          Tirage aléatoire
        </Button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-3 p-4">
      <Button className="text-secondary fs-5 rounded-5 bg-gradient-secondary border border-primary bs-primary mb-6 w-75 p-2" onClick={() => onChoose("action")}>
        Action
      </Button>
      <Button className="text-secondary fs-5 rounded-5 bg-gradient-quaternary border border-2 border-primary bs-primary w-75 p-2" onClick={() => onChoose("verite")}>
        Vérité
      </Button>
    </div>
  );
}

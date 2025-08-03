import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

export default function GameCard({ card, onValidate, onJoker }) {
  const [timeLeft, setTimeLeft] = useState(null);

  // Redémarre le minuteur quand la carte change
  useEffect(() => {
    if (card.duree) {
      setTimeLeft(card.duree);
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [card]);

  return (
    <Card className="p-3 text-center">
      <div className="d-flex justify-content-between">
        <h5 className="mb-0 text-uppercase">{card.type}</h5>
        <span>{card.type === "action" ? `${card.niveau} pts` : "1 pt"}</span>
      </div>

      {card.image && (
        <div className="my-2 p-4">
          <img src={card.image} alt="" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </div>
      )}

      <p style={{ whiteSpace: "pre-line" }}>{card.texte}</p>

      {timeLeft !== null && (
        <div className="mb-2 fs-2">⏳ {timeLeft}s</div>
      )}

      <div className="d-flex justify-content-between mt-3">
        <Button
          className="p-2"
          variant="primary"
          disabled={timeLeft !== null && timeLeft > 0}
          onClick={() => onValidate(true)}
        >
          Valider
        </Button>
        <Button
          className="p-2"
          variant="warning" 
          onClick={onJoker}
        >
          Joker
        </Button>
        <Button
          className="text-secondary p-2"
          variant="quaternary"
          onClick={() => onValidate(false)}
        >
          Refuser
        </Button>
      </div>
    </Card>
  );
}

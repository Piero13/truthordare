import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ImageCapture from "./ImageCapture";
import ImageViewer from "./ImageViewer";

export default function GameCard({ card, onValidate, onJoker }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);

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
    <>
      <Card className="p-4 text-center border border-2 border-primary bs-primary">
        <div className="d-flex justify-content-between">
          <h5 className="mb-0 text-uppercase text-primary">{card.type}</h5>
          <span className="text-primary">{card.type === "action" ? `${card.niveau} pts` : "1 pt"}</span>
        </div>

        {card.image && (
          <div className="my-2 p-4">
            <img src={card.image} alt="" style={{ maxWidth: "100%", borderRadius: "8px" }} />
          </div>
        )}

        <p className="text-primary" style={{ whiteSpace: "pre-line" }}>{card.texte}</p>

        {/* Bouton appareil photo */}
        <div className="my-3">
          <ImageCapture onCapture={setCapturedFile} />
        </div>

        {timeLeft !== null && (
          <div className="mb-2 fs-2 text-primary">⏳ {timeLeft}s</div>
        )}

        <div className="d-flex justify-content-between mt-3">
          <Button
            className="border border-2 border-primary p-2 bg-gradient-tertiary w-30"
            disabled={timeLeft !== null && timeLeft > 0}
            onClick={() => onValidate(true)}
          >
            Valider
          </Button>
          <Button
            className="border border-2 border-primary p-2 w-30"
            variant="warning"
            onClick={onJoker}
          >
            Joker
          </Button>
          <Button
            className="border border-2 border-primary text-secondary p-2 w-30"
            variant="quaternary"
            onClick={() => onValidate(false)}
          >
            Refuser
          </Button>
        </div>
      </Card>

      {/* Modal aperçu */}
      <ImageViewer file={capturedFile} onClose={() => setCapturedFile(null)} />
    </>
  );
}

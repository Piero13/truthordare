import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ImageCapture from "./ImageCapture";
import ImageViewer from "./ImageViewer";
import VideoCapture from "./VideoCapture";
import VideoViewer from "./VideoViewer";
import { actesOptions } from "../../datas/playerOptions";

export default function GameCard({ card, onValidate, onJoker }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);

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

  const handleValidateImage = () => {
    setCapturedImage(null);
    onValidate(true);
  };

  const handleValidateVideo = () => {
    setCapturedVideo(null);
    onValidate(true);
  };

  return (
    <>
      <Card className="p-4 text-center border border-2 border-primary bs-primary">
        <div className="d-flex justify-content-between align-items-center">
          {card.type === "action" && card.actes?.length > 0 && (
            <span className="fw-bold text-primary">
              {actesOptions.find(a => String(a.value) === String(card.actes[0]))?.label.split(" ")[0] || "Acte inconnu"}
            </span>
          )}

          <div className="d-flex align-items-center gap-2">
            <h5 className="mb-0 text-uppercase text-primary">{card.type}</h5>
          </div>

          <span className="text-primary">
            {card.type === "action" ? `${card.niveau} pts` : "1 pt"}
          </span>
        </div>

        {card.image && (
          <div className="my-2 p-4">
            <img
              src={card.image}
              alt=""
              style={{ maxWidth: "80%", borderRadius: "8px" }}
            />
          </div>
        )}

        <p className="text-primary" style={{ whiteSpace: "pre-line" }}>
          {card.texte}
        </p>

        {/* Boutons capture */}
        <div className="my-3 d-flex justify-content-center gap-3">
          <ImageCapture onCapture={setCapturedImage} />
          <VideoCapture onCapture={setCapturedVideo} />
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

      {/* Modal aperçu image */}
      <ImageViewer
        file={capturedImage}
        onClose={() => setCapturedImage(null)}
        onValidate={handleValidateImage}
      />

      {/* Modal aperçu vidéo */}
      <VideoViewer
        file={capturedVideo}
        onClose={() => setCapturedVideo(null)}
        onValidate={handleValidateVideo}
      />
    </>
  );
}

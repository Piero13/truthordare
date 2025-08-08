import { useState, useEffect, useRef } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import ImageCapture from "./ImageCapture";
import ImageViewer from "./ImageViewer";
import VideoCapture from "./VideoCapture";
import VideoViewer from "./VideoViewer";
import { actesOptions } from "../../datas/playerOptions";
import { useGameStore } from "../../context/gameStore";

export default function GameCard({ card, onValidate, onJoker }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const timerRef = useRef(null);
  const { players } = useGameStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (card.duree) {
      setTimeLeft(card.duree);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            playTimeUpSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    } else {
      setTimeLeft(null);
    }
  }, [card]);

  const playTimeUpSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.warn("Audio error:", err));
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const renderText = () => {
    let txt = card.texte;
    const homme = players.find(p => p.genre === "H")?.name || "Joueur H";
    const femme = players.find(p => p.genre === "F")?.name || "Joueur F";
    txt = txt.replace(/\{H\}/g, homme);
    txt = txt.replace(/\{F\}/g, femme);
    return txt;
  };

  const handleValidate = () => {
    if (timeLeft > 0) {
      setShowConfirmModal(true);
    } else {
      onValidate(true);
    }
  };

  const confirmValidation = () => {
    stopTimer();
    setShowConfirmModal(false);
    onValidate(true);
  };

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
      <audio ref={audioRef} src="/sounds/times-up.mp3" preload="auto" />

      <Card className="p-4 text-center border border-2 border-primary bs-primary mb-4">
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
          {renderText()}
        </p>

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
            onClick={handleValidate}
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
            onClick={() => {
              stopTimer();
              onValidate(false);
            }}
          >
            Refuser
          </Button>
        </div>
      </Card>

      {/* Modal confirmation arrêt timer */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Le temps n'est pas écoulé. Valider quand même ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmValidation}>
            Oui, valider
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Aperçus image/vidéo */}
      <ImageViewer
        file={capturedImage}
        onClose={() => setCapturedImage(null)}
        onValidate={handleValidateImage}
      />
      <VideoViewer
        file={capturedVideo}
        onClose={() => setCapturedVideo(null)}
        onValidate={handleValidateVideo}
      />
    </>
  );
}

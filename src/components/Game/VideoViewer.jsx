// src/components/Game/VideoViewer.jsx
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function VideoViewer({ file, onClose }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleSave = () => {
    if (!file) return;
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name || `video_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    onClose();
  };

  return (
    <Modal show={!!file} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Prévisualisation vidéo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {file && (
          <video src={url} controls style={{ maxWidth: "100%", borderRadius: "8px" }} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="border border-2 border-primary"
          variant="secondary"
          onClick={onClose}
        >
          Annuler
        </Button>
        <Button
          className="border border-2 border-primary bg-gradient-tertiary"
          onClick={handleSave}
        >
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

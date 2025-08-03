import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ImageViewer({ file, onClose }) {
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
    a.download = file.name || `capture_${Date.now()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    onClose();
  };

  return (
    <Modal show={!!file} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Prévisualisation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {file && file.type.startsWith("image/") && (
          <img src={url} alt="Capture" style={{ maxWidth: "100%" }} />
        )}
        {file && file.type.startsWith("video/") && (
          <video src={url} controls style={{ maxWidth: "100%" }} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="border border-2 border-primary" variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button className="border border-2 border-primary bg-gradient-tertiary" onClick={handleSave}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

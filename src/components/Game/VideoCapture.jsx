import { useRef } from "react";
import { Button } from "react-bootstrap";
import { Clapperboard } from "lucide-react";

export default function VideoCapture({ onCapture }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onCapture(file);
    e.target.value = ""; // reset pour pouvoir reprendre une vidéo ensuite
  };

  return (
    <>
      <Button
        className="bg-secondary border border-2 border-primary"
        onClick={() => fileInputRef.current?.click()}
      >
        <Clapperboard size={36} color="#531f5e"/>
      </Button>
      <input
        type="file"
        accept="video/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}

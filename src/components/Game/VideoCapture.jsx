import { useRef } from "react";
import { Button } from "react-bootstrap";
// import { Clapperboard } from "lucide-react";
import { BsCameraVideo } from "react-icons/bs"

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
        className="bg-gradient-tertiary border border-2 border-primary rounded-5 bs-primary"
        onClick={() => fileInputRef.current?.click()}
      >
        <BsCameraVideo size={36} style={{fill: "#fff0f7"}}/>
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

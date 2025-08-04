import { useRef } from "react";
import { Button } from "react-bootstrap";
// import { Camera } from "lucide-react";
import { BsCamera } from "react-icons/bs"

export default function ImageCapture({ onCapture }) {
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onCapture(file);
    }
  };

  return (
    <>
      <Button
        className="bg-secondary border border-2 border-primary"
        onClick={() => fileInputRef.current.click()}
      >
        <BsCamera size={36} style={{fill: "#531f5e"}}/>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
}

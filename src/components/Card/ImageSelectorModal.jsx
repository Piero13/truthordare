import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageSelectorModal({ show, onClose, onSelect }) {
  // Auto-import des images du dossier
  const images = Object.entries(
    import.meta.glob("/src/assets/card_pictures/*.{png,jpg,jpeg,webp}", { eager: true })
  ).map(([path, module]) => ({
    name: path.split("/").pop(),
    path: `src/assets/card_pictures/${path.split("/").pop()}`,
    src: module.default
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Choisir une image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="text-center">
              <img
                src={img.src}
                alt={img.name}
                style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }}
              />
              <p className="mt-2 text-primary fw-bold">{img.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSelect(images[activeIndex].path);
            onClose();
          }}
        >
          Choisir cette image
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

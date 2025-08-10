import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImageSelectorModal({ show, onClose, onSelect }) {
  // Auto-import des images du dossier
  const allImages = import.meta.glob(
    "/src/assets/card_pictures/*.{png,jpg,jpeg,webp}",
    { eager: true }
  );

  const images = Object.entries(allImages).map(([path, module]) => ({
    name: path.split("/").pop(), // ex: bouche.png
    url: module.default // URL finale (fonctionne en prod)
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
          {images.map((img, idx) => {
            const displayName = img.name
              .replace(/\.[^/.]+$/, "") // supprime l'extension
              .replace(/[_-]+/g, " ");  // remplace _ et - par espaces

            return (
              <SwiperSlide key={idx} className="text-center">
                <img
                  src={img.url}
                  alt={displayName}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    borderRadius: "8px"
                  }}
                />
                <p className="mt-2 text-primary fw-bold">{displayName}</p>
              </SwiperSlide>
            );
          })}

        </Swiper>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            // Ici on renvoie uniquement le nom du fichier à sauvegarder en BDD
            onSelect(images[activeIndex].name);
            onClose();
          }}
        >
          Choisir cette image
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

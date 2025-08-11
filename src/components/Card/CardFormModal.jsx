import { Modal, Form, Button } from "react-bootstrap";
import { genreOptions, actesOptions } from "../../datas/playerOptions";
import { useState, useEffect, useRef } from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import ImageSelectorModal from "./ImageSelectorModal";

// Fonction utilitaire pour retrouver l'URL à partir du nom de fichier
const getCardImageUrl = (fileName) => {
    if (!fileName) return "";
    const images = import.meta.glob("/src/assets/card_pictures/*", { eager: true });
    const match = Object.keys(images).find((path) => path.endsWith(fileName));
    return match ? images[match].default : "";
};

export default function CardFormModal({ show, onClose, onSave, onDelete, initialData }) {
    const [formData, setFormData] = useState(initialData);
    const textareaRef = useRef(null);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    const insertAtCursor = (text) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = formData.texte;

        const newText =
            currentText.substring(0, start) +
            text +
            currentText.substring(end);

        handleChange("texte", newText);

        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + text.length;
            textarea.focus();
        }, 0);
    };

    return (
        <>
            <Modal show={show} onHide={onClose} fullscreen className="p-0">
                <Modal.Header className="bg-secondary border-bottom border-primary" closeButton>
                    <Modal.Title className="text-primary">{formData.id ? "Modifier la carte" : "Ajouter une carte"}</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-secondary">
                    <Form>
                        {/* Type */}
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                value={formData.type}
                                onChange={(e) => handleChange("type", e.target.value)}
                            >
                                <option value="action">Action</option>
                                <option value="verite">Vérité</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Genre */}
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Select
                                value={formData.genre}
                                onChange={(e) => handleChange("genre", e.target.value)}
                            >
                                {genreOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Niveau */}
                        {formData.type === "action" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Niveau</Form.Label>
                                <Form.Select
                                    value={formData.niveau}
                                    onChange={(e) => handleChange("niveau", Number(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <option key={n} value={n}>Niveau {n}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {/* Actes */}
                        {formData.type === "action" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Actes</Form.Label>
                                <div>
                                    {actesOptions.map(opt => (
                                        <Form.Check
                                            key={opt.value}
                                            inline
                                            type="checkbox"
                                            label={opt.label}
                                            checked={formData.actes.includes(opt.value)}
                                            onChange={() => {
                                                const current = formData.actes;
                                                handleChange(
                                                    "actes",
                                                    current.includes(opt.value)
                                                        ? current.filter(a => a !== opt.value)
                                                        : [...current, opt.value]
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        )}

                        {/* Texte + Boutons insertion */}
                        <Form.Group className="mb-3">
                            <Form.Label>Texte</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                ref={textareaRef}
                                value={formData.texte}
                                onChange={(e) => handleChange("texte", e.target.value)}
                            />
                            <div className="mt-2 d-flex justify-content-center">
                                <Button
                                    size="sm"
                                    className="me-4 w-7 rounded-5 bg-none border border-primary"
                                    onClick={() => insertAtCursor("{H}")}
                                >
                                    <AiOutlineMan size={24} style={{fill: "#6610f2"}}/>
                                </Button>
                                <Button
                                    size="sm"
                                    className="w-7 rounded-5 bg-none border border-primary"
                                    onClick={() => insertAtCursor("{F}")}
                                >
                                    <AiOutlineWoman size={24} style={{fill: "#d63384"}}/>
                                </Button>
                            </div>
                        </Form.Group>

                        {/* Durée */}
                        {formData.type === "action" && (
                            <Form.Group className="mb-3">
                                <Form.Label>Durée (secondes)</Form.Label>
                                <Form.Select
                                    value={formData.duree}
                                    onChange={(e) => handleChange("duree", Number(e.target.value))}
                                >
                                    {[0, 15, 30, 45, 60, 90, 120, 150, 180].map(sec => (
                                        <option key={sec} value={sec}>{sec} secondes</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}

                        {/* Sélection d'image */}
                        {formData.type === "action" && (
                            <Form.Group className="mb-2">
                                <Form.Label>Image</Form.Label>
                                <div className="d-flex flex-column align-items-center">
                                    <Button className="w-50 border border-primary mb-4 text-secondary bg-gradient-tertiary bs-primary rounded-5" onClick={() => setShowImageModal(true)}>
                                        Choisir une image
                                    </Button>
                                    {formData.image && (
                                        <img
                                            className="h-15 w-auto mx-5"
                                            src={getCardImageUrl(formData.image)}
                                            alt="Preview"
                                        />
                                    )}
                                </div>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                
                <Modal.Footer className="bg-secondary border-top border-primary p-4">
                    {formData.id && (
                        <Button
                            className="border border-primary text-secondary rounded-5 mb-4 bs-primary"
                            variant="quaternary"
                            onClick={() => {
                                if (window.confirm("Supprimer cette carte ?")) {
                                    onDelete(formData.id);
                                }
                            }}
                        >
                            Supprimer
                        </Button>
                    )}
                    <Button 
                        className="border border-primary mb-4 text-primary rounded-5 bs-primary"
                        variant="secondary" 
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                    <Button
                        className="border border-primary bg-gradient-tertiary rounded-5 bs-primary"
                        onClick={handleSubmit}
                    >
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal choix image */}
            <ImageSelectorModal
                show={showImageModal}
                onClose={() => setShowImageModal(false)}
                onSelect={(fileName) => {
                    handleChange("image", fileName); // On ne stocke que le nom
                    setShowImageModal(false);
                }}
            />
        </>
    );
}

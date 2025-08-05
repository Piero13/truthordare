import { Modal, Form, Button } from "react-bootstrap";
import { genreOptions, actesOptions } from "../../datas/playerOptions";
import imageCompression from "browser-image-compression";
import { useState, useEffect, useRef } from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

export default function CardFormModal({ show, onClose, onSave, onDelete, initialData }) {
    const [formData, setFormData] = useState(initialData);
    const textareaRef = useRef(null);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

        setFormData(prev => ({ ...prev, image: base64 }));
    };

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
        <Modal show={show} onHide={onClose} fullscreen className="p-0">
            <Modal.Header className="bg-secondary" closeButton>
                <Modal.Title>{formData.id ? "Modifier carte" : "Ajouter carte"}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-secondary">
                <Form>
                    {/* Type */}
                    <Form.Group className="mb-2">
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
                    <Form.Group className="mb-2">
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
                        <Form.Group className="mb-2">
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
                        <Form.Group className="mb-2">
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
                    <Form.Group className="mb-2">
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
                                variant="outline-primary"
                                className="me-4 w-7"
                                onClick={() => insertAtCursor("{H}")}
                            >
                                <AiOutlineMan size={24} style={{fill: "#6610f2"}}/>
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="w-7"
                                onClick={() => insertAtCursor("{F}")}
                            >
                                <AiOutlineWoman size={24} style={{fill: "#d63384"}}/>
                            </Button>
                        </div>
                    </Form.Group>

                    {/* Durée */}
                    {formData.type === "action" && (
                        <Form.Group className="mb-2">
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

                    {/* Image */}
                    {formData.type === "action" && (
                        <Form.Group className="mb-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {formData.image && (
                                <div className="d-flex justify-content-center bg-white mt-2">
                                    <img
                                        className="w-90 p-2"
                                        src={formData.image}
                                        alt="Preview"
                                        style={{ width: "100px", marginTop: "10px" }}
                                    />
                                </div>
                            )}
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            
            <Modal.Footer className="bg-secondary">
                {formData.id && (
                    <Button
                        className="border border-primary text-secondary"
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
                    className="border border-primary"
                    variant="secondary" 
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <Button
                    className="border border-primary bg-gradient-tertiary"
                    onClick={handleSubmit}
                >
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

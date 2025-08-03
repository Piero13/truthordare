import { Modal, Form, Button } from "react-bootstrap";
import { genreOptions, actesOptions } from "../../datas/playerOptions";
import imageCompression from "browser-image-compression";
import { useState, useEffect } from "react";

export default function CardFormModal({ show, onClose, onSave, onDelete, initialData }) {
    const [formData, setFormData] = useState(initialData);

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

    return (
        <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>{formData.id ? "Modifier carte" : "Ajouter carte"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

            {/* Niveau (si action) */}
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

            {/* Texte */}
            <Form.Group className="mb-2">
                <Form.Label>Texte</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                value={formData.texte}
                onChange={(e) => handleChange("texte", e.target.value)}
                />
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
                    <div className="d-flex justify-content-center">
                        <img
                            className="w-90 mt-4"
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
        <Modal.Footer>
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
                className="border, border-primary"
                variant="secondary" 
                onClick={onClose}
            >
                Annuler
            </Button>
            <Button
                className="border, border-primary"
                variant="primary" 
                onClick={handleSubmit}
            >
                Enregistrer
            </Button>
        </Modal.Footer>
        </Modal>
    );
    }

import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { getAll, setItem, deleteItem } from "../db/db";
import CardFilters from "../components/Card/CardFilters";
import CardTable from "../components/Card/CardTable";
import CardFormModal from "../components/Card/CardFormModal";

export default function CardManager() {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    genre: "all",
    niveau: "all",
    acte: "all"
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const data = await getAll("cards");
    setCards(data);
  };

  const filteredCards = cards.filter(c => {
    if (filters.type !== "all" && c.type !== filters.type) return false;
    if (filters.genre !== "all" && c.genre !== filters.genre) return false;
    if (filters.niveau !== "all" && c.niveau !== Number(filters.niveau)) return false;
    if (filters.acte !== "all" && !c.actes.includes(filters.acte)) return false;
    return true;
  });

  const handleAdd = () => {
    setEditingCard(null);
    setShowFormModal(true);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setShowFormModal(true);
    };

  const handleSave = async (cardData) => {
    const dataToSave = { ...cardData };
    if (!editingCard) {
        // Si c'est un ajout → ne pas mettre d'id
        delete dataToSave.id;
    } else {
        // Si c'est une édition → garder l'id
        dataToSave.id = editingCard.id;
    }

    await setItem("cards", dataToSave);
    setShowFormModal(false);
    loadCards();
    };

  return (
    <Container className="p-4">
      <h2 className="mb-4">Liste des cartes</h2>

      <CardFilters filters={filters} onChange={setFilters} />
 
      <Button className="mb-4 bg-gradient-tertiary border border-2 border-primary p-2" onClick={handleAdd}>
        Ajouter une carte
      </Button>

      <CardTable cards={filteredCards} onEdit={handleEdit} />

      <CardFormModal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleSave}
        onDelete={async (id) => {
            await deleteItem("cards", id);
            setShowFormModal(false);
            loadCards();
        }}
        initialData={
            editingCard || {
            type: "action",
            genre: "H",
            niveau: 1,
            actes: [],
            texte: "",
            duree: 30,
            image: null
            }
        }
    />

    </Container>
  );
}

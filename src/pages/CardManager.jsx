import { useState, useEffect } from "react";
import { Container, Button, Pagination } from "react-bootstrap";
import { getAll, setItem, deleteItem } from "../db/db";
import CardFilters from "../components/Card/CardFilters";
import CardTable from "../components/Card/CardTable";
import CardFormModal from "../components/Card/CardFormModal";

const ITEMS_PER_PAGE = 25;

export default function CardManager() {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    genre: "all",
    niveau: "all",
    acte: "all"
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    // reset à la première page quand les filtres changent
    setCurrentPage(1);
  }, [filters]);

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

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      delete dataToSave.id;
    } else {
      dataToSave.id = editingCard.id;
    }
    await setItem("cards", dataToSave);
    setShowFormModal(false);
    loadCards();
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <Container className="p-4">
      <h2 className="mb-4 text-primary">Liste des cartes</h2>

      <CardFilters filters={filters} onChange={setFilters} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          className="bg-gradient-tertiary border border-2 border-primary p-2"
          onClick={handleAdd}
        >
          Ajouter une carte
        </Button>
      </div>

      <p className="text-primary bg-secondary opacity-75 mb-2">
          {filteredCards.length} carte{filteredCards.length > 1 ? "s" : ""}
      </p>

      <CardTable cards={paginatedCards} onEdit={handleEdit} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      )}

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

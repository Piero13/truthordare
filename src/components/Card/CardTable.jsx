import { Table } from "react-bootstrap";

export default function CardTable({ cards, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Niveau</th>
          <th>Texte</th>
        </tr>
      </thead>
      <tbody>
        {cards.map(card => (
          <tr
            key={card.id}
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(card)}
          >
            <td>{card.type}</td>
            <td>{card.type === "action" ? card.niveau : "—"}</td>
            <td style={{
              maxWidth: "250px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              {card.texte}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

import { Table } from "react-bootstrap";

export default function CardTable({ cards, onEdit }) {
  return (
    <Table size="sm" striped bordered hover className="bs-primary border border-2 border-primary table-fixed">
      <thead>
        <tr>
          <th className="text-primary bg-sec" style={{ width: '15%' }}>Type</th>
          <th className="text-primary" style={{ width: '15%' }}>Lvl</th>
          <th className="text-primary"  style={{ width: 'auto' }}>Texte</th>
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
              maxWidth: "220px",
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

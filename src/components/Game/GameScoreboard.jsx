import { Card, Row, Col } from "react-bootstrap";

export default function GameScoreboard({ players, scores, currentPlayer }) {
  return (
    <Row className="mb-3">
      {players.map((p, index) => (
        <Col key={index}>
          <Card
            className="p-2 text-center"
            style={{
              border: index === currentPlayer ? "2px solid #0a3a4e" : "1px solid #0a3a4e",
              boxShadow: index === currentPlayer ? "0 0 10px #0a3a4e" : "none",
              transition: "all 0.3s ease"
            }}
          >
            <h5>{p.name}</h5>
            <h6>{scores[index]} pts</h6>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

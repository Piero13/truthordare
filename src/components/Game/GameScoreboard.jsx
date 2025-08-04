import { Card, Row, Col } from "react-bootstrap";

export default function GameScoreboard({ players, scores, currentPlayer }) {
  return (
    <Row className="mb-3">
      {players.map((p, index) => (
        <Col key={index}>
          <Card
            className="p-2 text-center text-primary"
            style={{
              border: index === currentPlayer ? "2px solid #531f5e" : "1px solid #531f5e",
              boxShadow: index === currentPlayer ? "0 0 10px #531f5e" : "none",
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

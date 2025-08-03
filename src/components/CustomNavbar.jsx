import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function CustomNavbar() {
    const location = useLocation();
    const [expanded, setExpanded] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLinkClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar
            className="p-3 bg-gradient-primary"
            expand="lg"
            collapseOnSelect
            expanded={expanded}
            onToggle={setExpanded}
        >
            <Container fluid className="justify-content-between">
                <div className="col col-md-5 d-flex align-items-center">
                    <h1 className='font-title text-secondary fw-bold fs-4 fs-md-2 m-0 text-start'>Truth or Dare</h1>
                </div>
                <Navbar.Toggle className="w-auto p-1 border-secondary d-flex justify-content-center align-items-center" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="align-items-center justify-content-md-end">
                        <Nav.Link
                            as={Link}
                            to="/"
                            onClick={handleLinkClick}
                            className={`link fs-md-5 text-secondary ${isActive("/") ? "active" : ""}`}
                        >
                            Accueil
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/game"
                            onClick={handleLinkClick}
                            className={`link fs-md-5 text-secondary ${isActive("/game") ? "active" : ""}`}
                        >
                            Jeu
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/players"
                            onClick={handleLinkClick}
                            className={`link fs-md-5 text-secondary ${isActive("/players") ? "active" : ""}`}
                        >
                            Joueurs
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/settings"
                            onClick={handleLinkClick}
                            className={`link fs-md-5 text-secondary ${isActive("/settings") ? "active" : ""}`}
                        >
                            Paramètres
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/cards"
                            onClick={handleLinkClick}
                            className={`link fs-md-5 text-secondary ${isActive("/cards") ? "active" : ""}`}
                        >
                            Cartes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
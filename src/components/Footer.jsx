import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-gradient-quaternary text-light py-3">
      <Container className="text-center">
        <small className='text-secondary'>&copy; {new Date().getFullYear()} Truth or Dare. Tous droits réservés.</small>
      </Container>
    </footer>
  );
}

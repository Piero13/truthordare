import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

export default function Header() {
  return (
    <header className='w-100'>
        <CustomNavbar/>
    </header>
  );
}

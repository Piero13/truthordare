import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

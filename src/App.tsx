import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ContactPage } from './routes/ContactPage';
import { HomePage } from './routes/HomePage';
import { LocationPage } from './routes/LocationPage';
import { MenuPage } from './routes/MenuPage';
import { ReservationPage } from './routes/ReservationPage';
import './styles/global.css';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/book" element={<ReservationPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

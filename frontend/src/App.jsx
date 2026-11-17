import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PretragaStranica, RezervacijaStranica } from './privremeno/Stranice';
import HomePage from './pages/HomePage';
import ShipDetailsPage from './pages/ShipDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plovila/:id" element={<ShipDetailsPage />} />
        <Route path="/plovila" element={<PretragaStranica />} />
        <Route path="/rezervacija/:id" element={<RezervacijaStranica />} />
      </Routes>
    </BrowserRouter>
  );
}
// PRIVREMENO zaglavlje, samo da se vidi kako izgleda stranica.
// Zamijeniti pravom navigacijom iz zadatka 4 (gumb za prijavu, odjava, izbornik po ulozi).
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKorisnik } from './useKorisnik';

export default function Zaglavlje() {
  const [otvoren, setOtvoren] = useState(false);
  const { prijava } = useKorisnik();
  return (
    <header className="pregled sticky-top pregled-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand pregled-brand" to="/">Jadran Charter</Link>
          <button className="navbar-toggler" type="button" aria-controls="glavni-izbornik" aria-expanded={otvoren} aria-label="Otvori izbornik" onClick={() => setOtvoren(!otvoren)}>
            <span className="navbar-toggler-icon" />
          </button>
          <div id="glavni-izbornik" className={`collapse navbar-collapse ${otvoren ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/plovila">Sva plovila</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/#vrste">Vrste plovila</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/#luke">Luke polaska</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/#kako-radi">Kako rezervirati</Link></li>
            </ul>
            <button type="button" className="btn btn-lg px-4 pregled-btn mt-3 mt-lg-0" onClick={() => prijava('/')}>Prijava</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

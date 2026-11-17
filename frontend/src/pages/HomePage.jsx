import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FleetStrip from '../components/FleetStrip';
import ShipCard from '../components/ShipCard';
import PortsMap from '../components/PortsMap';
import Ucitavanje from '../components/Ucitavanje';
import { dohvatiPlovila, PORTS } from '../api/plovila';

const STEPS = [
  { t: 'Odaberite plovilo', d: 'Pregledajte cijene, opremu i slobodne termine bez prijave.' },
  { t: 'Prijavite se i rezervirajte', d: 'Prijava Google računom, zatim odabir termina i dodatnih usluga.' },
  { t: 'Preuzmite plovilo', d: 'Potvrdu rezervacije dobivate e-poštom, a plovilo preuzimate u odabranoj luci.' },
];

export default function HomePage() {
  const { hash } = useLocation();
  const [ships, setShips] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    dohvatiPlovila().then(setShips).catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const sadrzaj = (render) => {
    if (error) return <p className="text-danger">Plovila se trenutno ne mogu učitati. Osvježite stranicu ili pokušajte kasnije.</p>;
    if (!ships) return <Ucitavanje />;
    return render(ships);
  };

  return (
    <main className="pregled">
      <header className="pregled-header sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg py-3">
            <div className="container-fluid px-0">
              <Link className="pregled-brand text-decoration-none" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Natalia Charter</Link>
              <div className="d-flex align-items-center gap-4 ms-auto me-4">
                <Link to="/plovila" className="nav-link">Sva plovila</Link>
                <Link to="/#vrste" className="nav-link">Vrste plovila</Link>
                <Link to="/#luke" className="nav-link">Luke polaska</Link>
                <Link to="/#kako-radi" className="nav-link">Kako rezervirati?</Link>
              </div>
              <Link to="/prijava" className="btn btn-prijava">Prijava</Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Iznajmite plovilo na Jadranu</h1>
          <p className="hero-sub">Pregled cijena, opreme, slobodnih termina te rezervaciju plovila uz prethodnu prijavu.</p>

          <div className="bg-white p-4 rounded-4 shadow-lg" style={{ maxWidth: '820px' }}>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label small text-muted fw-bold text-start d-block mb-1">Datum</label>
                <div className="input-group border rounded-3 p-1 bg-light">
                  <span className="input-group-text bg-transparent border-0 text-muted ps-2">📅</span>
                  <input type="text" className="form-control border-0 bg-transparent shadow-none px-1" readOnly value="Stu 7, 2026" />
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label small text-muted fw-bold text-start d-block mb-1">Trajanje</label>
                <div className="input-group border rounded-3 p-1 bg-light">
                  <span className="input-group-text bg-transparent border-0 text-muted ps-2">🌙</span>
                  <input type="text" className="form-control border-0 bg-transparent shadow-none px-1" readOnly value="1 tjedan" />
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label small text-muted fw-bold text-start d-block mb-1">Gosti</label>
                <div className="input-group border rounded-3 p-1 bg-light">
                  <span className="input-group-text bg-transparent border-0 text-muted ps-2">👥</span>
                  <input type="text" className="form-control border-0 bg-transparent shadow-none px-1" readOnly value="8 osoba" />
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label small text-muted fw-bold text-start d-block mb-1">Luka</label>
                <div className="input-group border rounded-3 p-1 bg-light">
                  <span className="input-group-text bg-transparent border-0 text-muted ps-2">⚓</span>
                  <input type="text" className="form-control border-0 bg-transparent shadow-none px-1" readOnly value="Sve luke" />
                </div>
              </div>
              <div className="col-md-2">
                <Link to="/plovila" className="btn pregled-btn w-100 py-2 d-flex align-items-center justify-content-center" style={{ height: '48px', fontSize: '1.05rem' }}>
                  Pretraži
                </Link>
              </div>
            </div>
            <div className="text-muted small mt-2 text-start ps-1">💡 Vizija napredne pretrage (datumi, trajanje, broj osoba i luka za kolegu)</div>
          </div>
        </div>
      </section>

      <section id="vrste" className="section">
        <div className="container">
          <h2>Vrste plovila</h2>
          <p className="section-lead">Pomaknite za pregled ponude ili otvorite cijeli katalog.</p>
          {sadrzaj((s) => <FleetStrip ships={s} />)}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
            <div>
              <h2 className="mb-1">Istaknuta plovila</h2>
              <p className="section-lead mb-0">Cijene su po danu najma, bez dodatnih usluga.</p>
            </div>
            <Link to="/plovila" className="btn btn-outline-secondary">Sva plovila</Link>
          </div>
          {sadrzaj((s) => (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {s.slice(0, 6).map((ship) => <div className="col" key={ship.id}><ShipCard ship={ship} /></div>)}
            </div>
          ))}
        </div>
      </section>

      <section id="luke" className="section">
        <div className="container">
          <h2>Luke polaska</h2>
          <p className="section-lead">Odaberite luku na karti ili s popisa kako biste vidjeli u njoj dostupna plovila.</p>
          <div className="row g-4">
            <div className="col-lg-8"><PortsMap ports={PORTS} /></div>
            <div className="col-lg-4">
              <div className="port-list">
                {PORTS.map((p, index) => (
                  <Link
                    key={p.id}
                    to={`/plovila?luka=${p.id}`}
                    className="port-item-link"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="badge rounded-circle text-white d-inline-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px', fontSize: '13px', backgroundColor: '#12808F' }}
                      >
                        {index + 1}
                      </span>
                      <span className="fw-bold">{p.naziv}</span>
                    </div>
                    {ships && <span className="text-muted small">{ships.filter((s) => s.luka === p.id).length} plovila</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kako-radi" className="section section-alt">
        <div className="container">
          <h2>Kako rezervirati?</h2>
          <div className="row g-4 mt-1">
            {STEPS.map((s, i) => (
              <div className="col-md-4" key={s.t}>
                <div className="step-num">{i + 1}</div>
                <h3 className="h5">{s.t}</h3>
                <p className="mb-0">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer"><div className="container">Natalia Charter</div></footer>
    </main>
  );
}
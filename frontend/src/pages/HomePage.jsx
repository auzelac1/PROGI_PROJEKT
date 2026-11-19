import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FleetStrip from '../components/FleetStrip';
import ShipCard from '../components/ShipCard';
import PortsMap from '../components/PortsMap';
import SearchBar from '../components/SearchBar';
import Ucitavanje from '../components/Ucitavanje';

import { useStyles } from '../useStyles';
import indexCss from '../styles/index.css?url';
import { useProfileContext } from '../contexts/ProfileContext';
import { getCategories, getFleet, getPorts } from '../services/fleetServices';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const STEPS = [
  { t: 'Odaberite plovilo', d: 'Pregledajte cijene, opremu i slobodne termine bez prijave.' },
  { t: 'Prijavite se i rezervirajte', d: 'Prijava Google računom, zatim odabir termina i dodatnih usluga.' },
  { t: 'Preuzmite plovilo', d: 'Potvrdu rezervacije dobivate e-poštom, a plovilo preuzimate u odabranoj luci.' },
];

function pickFeaturedShips(ships) {
  const shuffled = [...ships];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 6);
}

export default function HomePage() {
  useStyles(indexCss);

  const { loggedUser } = useProfileContext();

  const { hash } = useLocation();
  const navigate = useNavigate();
  const [ships, setShips] = useState(null);
  const [featuredShips, setFeaturedShips] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  const [portsError, setPortsError] = useState(false);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    getFleet().then((fleet) => {
      setShips(fleet);
      setFeaturedShips(pickFeaturedShips(fleet));
    }).catch(() => setError(true));
  }, []);

  useEffect(() => {
    getPorts().then(setPorts).catch(() => setPortsError(true));
  }, []);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    // Tonko: popis ovisnosti koji se trebaju prvo ucitat prije skroljanja, 
    // inace bi skrollalo na krivi dio jer se ostatak nije ucito jos
  }, [hash, ships, categories, ports, error]);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash]);

  const sadrzaj = (render) => {
    if (error) return <p className="text-danger">Plovila se trenutno ne mogu učitati. Osvježite stranicu ili pokušajte kasnije.</p>;
    if (!ships) return <Ucitavanje />;
    return render(ships);
  };

  return (
    <>
      <main className="pregled">
        <PublicHeader />

        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Iznajmite plovilo na Jadranu</h1>
            <p className="hero-sub">Pregled cijena, opreme, slobodnih termina te rezervacija plovila uz prethodnu prijavu.</p>

            <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
              <SearchBar />
            </div>
          </div>
        </section>

        <section id="vrste" className="section">
          <div className="container">
            <h2>Kategorije plovila</h2>
            <p className="section-lead">Istražite našu flotu i odaberite željeno plovilo.</p>
            {sadrzaj((s) => <FleetStrip ships={s} categories={categories} />)}
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="mb-4">
            <h2 className="mb-1">Istaknuta plovila</h2>
            <p className="section-lead mb-0">Prikazane cijene odnose se na dnevni najam plovila bez dodatnih usluga.</p>
          </div>
              {sadrzaj(() => (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {featuredShips.map((ship) => <div className="col" key={ship.basics.id_brod}><ShipCard ship={ship} /></div>)}
                </div>
              ))}
          </div>
        </section>

        <section id="luke" className="section">
          <div className="container">
            <h2>Luke polaska</h2>
            <p className="section-lead">Pregled naših polaznih luka.</p>
            <div className="row g-4">
              <div className="col-lg-8"><PortsMap ports={ports} /></div>
              <div className="col-lg-4">
                <div className="port-list">
                  {ports.map((p, index) => (
                    <Link key={p.id_luka} to={`/plovila?port=${p.id_luka}`} className='port-item-link'>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="badge rounded-circle text-white d-inline-flex align-items-center justify-content-center"
                          style={{ width: '28px', height: '28px', fontSize: '13px', backgroundColor: '#12808F' }}
                        >
                          {index + 1}
                        </span>
                        <span className="fw-bold">{p.ime_luka}</span>
                      </div>
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
        <PublicFooter />
      </main>
    </>
  );
}

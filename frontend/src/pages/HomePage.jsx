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
                    <div key={p.id_luka} className='port-item-link'>
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="badge rounded-circle text-white d-inline-flex align-items-center justify-content-center"
                          style={{ width: '28px', height: '28px', fontSize: '13px', backgroundColor: '#12808F' }}
                        >
                          {index + 1}
                        </span>
                        <span className="fw-bold">{p.ime_luka}</span>
                      </div>
                    </div>
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
        <footer className="site-footer">
          <div className="container poppins">
            <div className="row">
              <div className="col-md-4">
                <h3 className="fw-bold">Natalia Charter</h3>
                <p>Sva prava pridržana &copy; 2026.</p>
              </div>
              <div className="col-md-4">
                <p className="fw-bold text-uppercase pb-2">Kontakt</p>
                <div className="footer-location">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_53_185)">
                      <path d="M28 13.3333C28 22.6666 16 30.6666 16 30.6666C16 30.6666 4 22.6666 4 13.3333C4 10.1507 5.26428 7.09841 7.51472 4.84797C9.76516 2.59753 12.8174 1.33325 16 1.33325C19.1826 1.33325 22.2348 2.59753 24.4853 4.84797C26.7357 7.09841 28 10.1507 28 13.3333ZM20 13.3333C20 15.5424 18.2091 17.3333 16 17.3333C13.7909 17.3333 12 15.5424 12 13.3333C12 11.1241 13.7909 9.33325 16 9.33325C18.2091 9.33325 20 11.1241 20 13.3333Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_53_185">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="footer-white">
                    Medulićeva ulica 14C<br />
                    10 000 Zagreb<br />
                    Hrvatska
                  </p>
                </div>
                <div className="footer-phone">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3334 22.56V26.56C29.3349 26.9313 29.2589 27.2989 29.1101 27.6391C28.9613 27.9793 28.7431 28.2848 28.4695 28.5358C28.1959 28.7868 27.8728 28.9779 27.5211 29.0969C27.1693 29.2159 26.7966 29.2601 26.4267 29.2266C22.3239 28.7808 18.3827 27.3788 14.9201 25.1333C11.6985 23.0862 8.96719 20.3549 6.92007 17.1333C4.66671 13.6549 3.2644 9.69463 2.82674 5.5733C2.79342 5.20459 2.83724 4.83298 2.95541 4.48213C3.07357 4.13128 3.2635 3.80889 3.51309 3.53546C3.76269 3.26204 4.06648 3.04358 4.40513 2.894C4.74378 2.74441 5.10986 2.66698 5.48007 2.66663H9.48007C10.1271 2.66026 10.7545 2.8894 11.2451 3.31134C11.7357 3.73328 12.0562 4.31923 12.1467 4.95997C12.3156 6.24006 12.6287 7.49694 13.0801 8.70663C13.2595 9.18387 13.2983 9.70252 13.1919 10.2011C13.0856 10.6998 12.8386 11.1574 12.4801 11.52L10.7867 13.2133C12.6848 16.5514 15.4487 19.3152 18.7867 21.2133L20.4801 19.52C20.8426 19.1615 21.3003 18.9144 21.7989 18.8081C22.2975 18.7018 22.8162 18.7406 23.2934 18.92C24.5031 19.3714 25.76 19.6845 27.0401 19.8533C27.6878 19.9447 28.2793 20.2709 28.7021 20.77C29.125 21.269 29.3496 21.9061 29.3334 22.56Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                  </svg>
                  <a href="tel:" className="footer-white">
                    +385 1 234 567
                  </a>
                </div>
                <div className="footer-mail">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3332 7.99992C29.3332 6.53325 28.1332 5.33325 26.6665 5.33325H5.33317C3.8665 5.33325 2.6665 6.53325 2.6665 7.99992M29.3332 7.99992V23.9999C29.3332 25.4666 28.1332 26.6666 26.6665 26.6666H5.33317C3.8665 26.6666 2.6665 25.4666 2.6665 23.9999V7.99992M29.3332 7.99992L15.9998 17.3333L2.6665 7.99992" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                  </svg>
                  <a href="mailto:" className="footer-white">
                    info@company.com
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <p className="fw-bold text-uppercase">Društvene mreže</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

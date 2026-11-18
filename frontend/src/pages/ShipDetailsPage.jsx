import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import ShipImage from '../components/ShipImage';
import PortsMap from '../components/PortsMap';
import PrijavaModal from '../components/PrijavaModal';
import Ucitavanje from '../components/Ucitavanje';
import { useKorisnik } from '../privremeno/useKorisnik';
import { PORTS, TYPES, eur } from '../api/plovila';
import { useProfileContext } from '../contexts/ProfileContext';
import NavBar from '../components/NavBar';

import { useStyles } from '../useStyles';
import indexCss from '../styles/index.css?url';
import { getBoat } from '../services/fleetServices';

export default function ShipDetailsPage() {
  useStyles(indexCss);

  const {loggedUser} = useProfileContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { prijavljen, prijava } = useKorisnik();
  const [ship, setShip] = useState(undefined);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const [pitajPrijavu, setPitajPrijavu] = useState(false);

  useEffect(() => {
    setShip(undefined);
    setActive(0);
    getBoat(id).then(setShip).catch(() => setError(true));
  }, [id]);

  if (error) return <main className="pregled section"><div className="container"><p className="text-danger">Plovilo se trenutno ne može učitati. Pokušajte ponovno kasnije.</p></div></main>;
  if (ship === undefined) return <main className="pregled section"><div className="container"><Ucitavanje /></div></main>;
  if (ship === null) {
    return (
      <main className="pregled section"><div className="container">
        <h1 className="h3">Plovilo nije pronađeno</h1>
        <p>Možda je uklonjeno iz ponude. <Link to="/plovila">Pogledajte cijeli katalog</Link>.</p>
      </div></main>
    );
  }

  const luka = PORTS.find((p) => p.id === ship.luka);
  const tip = TYPES.find((t) => t.id === ship.tip)?.naziv;
  const rezerviraj = () => (loggedUser.uloga !== "korisnik" ? navigate(`/rezervacija/${ship.id_brod}`) : setPitajPrijavu(true));

  const specs = [
    ['Vrsta', ship.model.tip], ['Proizvođač i model', `${ship.model.proizvodjac} ${ship.model.model}`], ['Godina proizvodnje', ship.basics.godina_proizvodnje],
    ['Kapacitet', `${ship.model.kapacitet} osoba`], ['Kabine', ship.model.broj_kabina], ['Ležajevi', ship.model.broj_lezajeva], ['Matična luka', ship.port.ime_luka],
  ];

  return (
    <>
    {loggedUser.uloga !== "korisnik" && <div id="styleCss" className='py-1'>
        <NavBar user={loggedUser} brand={false}/>
      </div>}
    <main className="pregled">
      <header className="pregled-header sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg py-3">
            <div className="container-fluid px-0">
              <Link className="pregled-brand text-decoration-none" to="/">Natalia Charter</Link>
              <div className="d-flex align-items-center gap-4 ms-auto">
                <Link to="/#vrste" className="nav-link">Kategorije plovila</Link>
                <Link to="/#luke" className="nav-link">Luke polaska</Link>
                <Link to="/#kako-radi" className="nav-link">Kako rezervirati?</Link>
              </div>
              {loggedUser.uloga === "korisnik" && <Link to="/prijava" className="ms-4 btn btn-prijava">Prijava</Link>}
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-5">
        <nav aria-label="Navigacija" className="mb-3">
          <Link to="/plovila" className="btn btn-sm btn-outline-secondary back-link">
            <span className="me-1">&lsaquo;&nbsp;</span> Povratak na pretragu
          </Link>
        </nav>
        <div className="row g-4">
          <div className="col-lg-8">
            <ShipImage src={ship.photos[0].url_foto} alt={ship.basics.naziv} className="gallery-main" />
            {ship.photos.length > 1 && (
              <div className="gallery-thumbs">
                {ship.photos.map((photo, i) => (
                  <button key={photo.url_foto} type="button" className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Fotografija ${i + 1}`}>
                    <ShipImage src={photo.url_foto} alt="" />
                  </button>
                ))}
              </div>
            )}

            <h1 className="mt-4">{ship.basics.naziv}</h1>
            <p className="text-muted">{ship.model.tip}, matična luka {ship.port.ime_luka}</p>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Osnovni podaci</h2>
              <dl className="specs mb-0">{specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Oprema</h2>
              <ul className="equip mb-0">{ship.equipment.map((o) => <li key={o.id_opreme}>{o.naziv}</li>)}</ul>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Dodatne usluge</h2>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead><tr><th>Usluga</th><th className="text-end">Cijena (jednokratno)</th></tr></thead>
                  <tbody>{ship.services.map((u) => <tr key={u.id_dodatne_usluge}><td>{u.naziv}</td><td className="text-end fw-bold">{eur(u.cijena)}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Lokacija preuzimanja</h2>
              <PortsMap ports={[ship.port]} zoom={11} link={false} height={320} />
            </div>
          </div>

          <div className="col-lg-4">
            <aside className="booking-card">
              <div><span className="ship-price big">{eur(ship.basics.cijena_dan)}</span> <span className="ship-price-day">po danu</span></div>
              <p className="small text-muted mt-1">Najkraći najam je 1 dan. Dodatne usluge naplaćuju se jednokratno.</p>
              <button type="button" className="btn btn-lg pregled-btn w-100 mt-3" onClick={rezerviraj}>Rezerviraj</button>
              {!(loggedUser.uloga !== "korisnik") && <p className="small text-muted mt-2 mb-0">Za rezervaciju je potrebna prijava.</p>}
            </aside>
          </div>
        </div>
      </div>

      <PrijavaModal show={pitajPrijavu} onClose={() => setPitajPrijavu(false)} onPrijava={() => prijava(pathname)} />
    </main>
    </>
  );
}
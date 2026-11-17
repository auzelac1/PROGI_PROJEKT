import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import ShipImage from '../components/ShipImage';
import PortsMap from '../components/PortsMap';
import PrijavaModal from '../components/PrijavaModal';
import Ucitavanje from '../components/Ucitavanje';
import { useKorisnik } from '../privremeno/useKorisnik';
import { dohvatiPlovilo, PORTS, TYPES, eur, fmtDate } from '../api/plovila';
import { useProfileContext } from '../contexts/ProfileContext';
import NavBar from '../components/NavBar';

import { useStyles } from '../useStyles';
import indexCss from '../styles/index.css?url';

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
    dohvatiPlovilo(id).then(setShip).catch(() => setError(true));
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
  const rezerviraj = () => (prijavljen ? navigate(`/rezervacija/${ship.id}`) : setPitajPrijavu(true));

  const specs = [
    ['Vrsta', tip], ['Proizvođač i model', `${ship.proizvodac} ${ship.model}`], ['Godina proizvodnje', ship.godina],
    ['Kapacitet', `${ship.kapacitet} osoba`], ['Kabine', ship.kabine], ['Ležajevi', ship.lezajevi], ['Matična luka', luka?.naziv],
  ];

  return (
    <>
    {loggedUser.uloga !== "KORISNIK" && <div id="styleCss" className='py-1'>
        <NavBar user={loggedUser} brand={false}/>
      </div>}
    <main className="pregled">
      <header className="pregled-header sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg py-3">
            <div className="container-fluid px-0">
              <Link className="pregled-brand text-decoration-none" to="/">Natalia Charter</Link>
              <div className="d-flex align-items-center gap-4 ms-auto">
                <Link to="/plovila" className="nav-link">Sva plovila</Link>
                <Link to="/#vrste" className="nav-link">Vrste plovila</Link>
                <Link to="/#luke" className="nav-link">Luke polaska</Link>
                <Link to="/#kako-radi" className="nav-link">Kako rezervirati?</Link>
              </div>
              {loggedUser.uloga === "KORISNIK" && <Link to="/prijava" className="ms-4 btn btn-prijava">Prijava</Link>}
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-5">
        <nav aria-label="Navigacija" className="mb-3"><Link to="/plovila">&lsaquo; Natrag na plovila</Link></nav>
        <div className="row g-4">
          <div className="col-lg-8">
            <ShipImage src={ship.slike[active]} alt={ship.naziv} className="gallery-main" />
            {ship.slike.length > 1 && (
              <div className="gallery-thumbs">
                {ship.slike.map((src, i) => (
                  <button key={src} type="button" className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Fotografija ${i + 1}`}>
                    <ShipImage src={src} alt="" />
                  </button>
                ))}
              </div>
            )}

            <h1 className="mt-4">{ship.naziv}</h1>
            <p className="text-muted">{tip}, matična luka {luka?.naziv}</p>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Osnovni podaci</h2>
              <dl className="specs mb-0">{specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Oprema</h2>
              <ul className="equip mb-0">{ship.oprema.map((o) => <li key={o}>{o}</li>)}</ul>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Dodatne usluge</h2>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead><tr><th>Usluga</th><th className="text-end">Cijena (jednokratno)</th></tr></thead>
                  <tbody>{ship.usluge.map((u) => <tr key={u.id}><td>{u.naziv}</td><td className="text-end fw-bold">{eur(u.cijena)}</td></tr>)}</tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Zauzeti termini</h2>
              {ship.zauzeto.length === 0
                ? <div className="p-3 bg-light rounded-3 text-success fw-medium">✅ Trenutno nema zauzetih termina. Plovilo je u potpunosti dostupno za odabrani period.</div>
                : <ul className="mb-0">{ship.zauzeto.map((z) => <li key={z.od}>{fmtDate(z.od)} do {fmtDate(z.do)}</li>)}</ul>}
            </div>

            <div className="p-4 border rounded-4 bg-white shadow-sm mt-4">
              <h2 className="h4 mb-3">Lokacija preuzimanja</h2>
              <PortsMap ports={[luka]} zoom={11} link={false} height={320} />
            </div>
          </div>

          <div className="col-lg-4">
            <aside className="booking-card">
              <div><span className="ship-price big">{eur(ship.cijenaDan)}</span> <span className="text-muted">po danu</span></div>
              <p className="small text-muted mt-1">Najkraći najam je 1 dan. Dodatne usluge naplaćuju se jednokratno.</p>
              <button type="button" className="btn btn-lg pregled-btn w-100 mt-3" onClick={rezerviraj}>Rezerviraj</button>
              {!prijavljen && <p className="small text-muted mt-2 mb-0">Za rezervaciju je potrebna prijava.</p>}
            </aside>
          </div>
        </div>
      </div>

      <PrijavaModal show={pitajPrijavu} onClose={() => setPitajPrijavu(false)} onPrijava={() => prijava(pathname)} />
    </main>
    </>
  );
}
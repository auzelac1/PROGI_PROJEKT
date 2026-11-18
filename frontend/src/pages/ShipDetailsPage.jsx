import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoat } from '../services/fleetServices';
import PublicHeader from '../components/PublicHeader';
import Ucitavanje from '../components/Ucitavanje';
import { useStyles } from '../useStyles';
import indexCss from '../styles/index.css?url';
import { eur } from '../utils/format';

export default function ShipDetailsPage() {
  useStyles(indexCss);

  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBoat(id)
      .then((data) => {
        setShip(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Ucitavanje />;
  if (error || !ship) return <main className="pregled"><PublicHeader /><div className="container py-5"><p className="text-danger">Plovilo nije pronađeno.</p></div></main>;

  return (
    <main className="pregled">
      <PublicHeader />

      <div className="container py-5">
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            &lt; Natrag
          </button>
        </div>

        <div className="row g-5">
          <div className="col-lg-7">
            {ship.photos && ship.photos.length > 0 && (
              <>
                <div className="mb-3 rounded-4 overflow-hidden shadow-sm" style={{ height: '400px' }}>
                  <img
                    src={ship.photos[active].url_foto}
                    alt={ship.basics.naziv}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="row g-2">
                  {ship.photos.map((photo, index) => (
                    <div className="col-3" key={index}>
                      <button
                        type="button"
                        className={`p-0 border-0 rounded-3 overflow-hidden w-100 ${active === index ? 'ring-2' : ''}`}
                        style={{ height: '80px', cursor: 'pointer', opacity: active === index ? 1 : 0.6 }}
                        onClick={() => setActive(index)}
                      >
                        <img src={photo.url_foto} alt="" className="w-100 h-100 object-fit-cover" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="col-lg-5">
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <span className="text-muted small text-uppercase fw-bold">{ship.model.tip}, {ship.port.ime_luka}</span>
              <h1 className="h2 mt-1 mb-3">{ship.basics.naziv}</h1>
              <h3 className="text-primary fw-bold mb-4">{eur(ship.basics.cijena_dan)} <span className="text-muted small fw-normal">po danu</span></h3>

              <ul className="list-unstyled mb-4">
                <li className="py-2 border-bottom d-flex justify-content-between">
                  <span className="text-muted">Kapacitet:</span>
                  <span className="fw-bold">{ship.model.kapacitet} osoba</span>
                </li>
                <li className="py-2 border-bottom d-flex justify-content-between">
                  <span className="text-muted">Broj kabina:</span>
                  <span className="fw-bold">{ship.model.broj_kabina}</span>
                </li>
                <li className="py-2 border-bottom d-flex justify-content-between">
                  <span className="text-muted">Godina proizvodnje:</span>
                  <span className="fw-bold">{ship.basics.godina_proizvodnje}.</span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-primary w-100 py-3 fw-bold"
                onClick={() => navigate(`/rezervacija/${ship.basics.id_brod}`)}
              >
                Rezerviraj plovilo
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
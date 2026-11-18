import { Link } from 'react-router-dom';
import ShipImage from './ShipImage';
import { eur } from '../utils/format';

export default function ShipCard({ ship }) {
  return (
    <Link to={`/plovila/${ship.basics.id_brod}`} className="card ship-card h-100 text-decoration-none">
      <ShipImage src={ship.photos[0]?.url_foto} alt={ship.basics.naziv} />
      <div className="card-body d-flex flex-column">
        <div className="text-muted small">{ship.model.tip}, {ship.port.ime_luka}</div>
        <h3 className="h5 mt-1">{ship.basics.naziv}</h3>
        <ul className="ship-facts">
          <li>{ship.model.kapacitet} osoba</li>
          <li>{ship.model.broj_kabina} kabine</li>
          <li>{ship.basics.godina_proizvodnje}.</li>
        </ul>
        <div className="mt-auto pt-2">
          <span className="ship-price">{eur(ship.basics.cijena_dan)}</span>
          <span className="text-muted"> po danu</span>
        </div>
      </div>
    </Link>
  );
}
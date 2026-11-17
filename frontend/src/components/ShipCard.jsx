import { Link } from 'react-router-dom';
import ShipImage from './ShipImage';
import { PORTS, TYPES, eur } from '../api/plovila';

export default function ShipCard({ ship }) {
  const luka = PORTS.find((p) => p.id === ship.luka)?.naziv;
  const tip = TYPES.find((t) => t.id === ship.tip)?.naziv;
  return (
    <Link to={`/plovila/${ship.id}`} className="card ship-card h-100 text-decoration-none">
      <ShipImage src={ship.slike[0]} alt={ship.naziv} />
      <div className="card-body d-flex flex-column">
        <div className="text-muted small">{tip}, {luka}</div>
        <h3 className="h5 mt-1">{ship.naziv}</h3>
        <ul className="ship-facts">
          <li>{ship.kapacitet} osoba</li>
          <li>{ship.kabine} kabine</li>
          <li>{ship.godina}.</li>
        </ul>
        <div className="mt-auto pt-2">
          <span className="ship-price">{eur(ship.cijenaDan)}</span>
          <span className="text-muted"> po danu</span>
        </div>
      </div>
    </Link>
  );
}

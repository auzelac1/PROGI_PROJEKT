import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ShipImage from './ShipImage';
import { TYPES } from '../api/plovila';

export default function FleetStrip({ ships }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    const container = ref.current;
    if (!container) return;
    const scrollAmount = 320;

    if (dir === 1) {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div>
      <div className="fleet-strip" ref={ref} aria-label="Vrste plovila">
        {TYPES.map((t) => {
          const ofType = ships.filter((s) => s.tip === t.id);
          return (
            <Link key={t.id} to={`/plovila?tip=${t.id}`} className="fleet-item">
              <ShipImage src={ofType[0]?.slike[0]} alt={t.naziv} />
              <div className="fleet-label">
                <strong>{t.naziv}</strong>
                <span className="text-muted d-block small">{t.opis}</span>
                <span className="small">{ofType.length} u ponudi</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button type="button" className="btn rounded-circle fleet-arrow" onClick={() => scroll(-1)} aria-label="Prethodno">&lsaquo;</button>
        <Link to="/plovila" className="btn pregled-btn px-4 py-2 d-inline-flex align-items-center justify-content-center" style={{ height: '48px', fontSize: '1.05rem' }}>Pogledaj cijeli katalog</Link>
        <button type="button" className="btn rounded-circle fleet-arrow" onClick={() => scroll(1)} aria-label="Sljedeće">&rsaquo;</button>
      </div>
    </div>
  );
}
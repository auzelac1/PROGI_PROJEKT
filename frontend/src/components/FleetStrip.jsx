import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ShipImage from './ShipImage';

const categoryImages = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/*.{jpg,jpeg,png,webp,avif,svg}', {
    eager: true,
    query: '?url',
    import: 'default',
  })).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.')), url]),
);

const categoryImageNames = {
  jedrilica: 'jedrilica',
  'motorni brod': 'motorni-brod',
  katamaran: 'katamaran',
  gumenjak: 'gumenjak',
  ostalo: 'ostalo',
};

export default function FleetStrip({ ships, categories }) {
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
      <div className="fleet-strip" ref={ref} aria-label="Kategorije plovila">
        {categories.map((category) => {
          const ofCategory = ships.filter((s) => s.model.kategorija === category);
          return (
            <Link key={category} to={`/plovila?category=${category}`} className="fleet-item">
              <ShipImage src={categoryImages[categoryImageNames[category]]} alt={category} />
              <div className="fleet-label">
                <strong>{category}</strong>
                <span className="text-muted d-block small">{category}</span>
                <span className="small">{ofCategory.length} u ponudi</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="fleet-arrows-container d-flex justify-content-center align-items-center gap-3 mt-4">
        <button type="button" className="btn rounded-circle fleet-arrow" onClick={() => scroll(-1)} aria-label="Prethodno">&lsaquo;</button>
        <button type="button" className="btn rounded-circle fleet-arrow" onClick={() => scroll(1)} aria-label="Sljedeće">&rsaquo;</button>
      </div>
    </div>
  );
}
import { useState } from 'react';

// Fiksni omjer stranica + object-fit: cover, pa slika nikad nije stisnuta.
// Ako slike nema ili se ne učita, prikazuje se neutralna zamjenska pozadina.
export default function ShipImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return <div className={`ship-img ship-img-fallback ${className}`} role="img" aria-label={alt} />;
  }
  return <img className={`ship-img ${className}`} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

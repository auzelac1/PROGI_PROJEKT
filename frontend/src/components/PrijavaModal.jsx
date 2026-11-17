// Vlastiti prozor (bez dodatnih biblioteka) sa Bootstrap klasama.
import { useEffect } from 'react';

export default function PrijavaModal({ show, onClose, onPrijava }) {
  useEffect(() => {
    if (!show) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="pregled">
      <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="prijava-naslov" tabIndex={-1} onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="prijava-naslov" className="modal-title h4">Prijavite se za rezervaciju</h2>
              <button type="button" className="btn-close" aria-label="Zatvori" onClick={onClose} />
            </div>
            <div className="modal-body">
              Plovilo možete pregledavati bez prijave, ali rezervaciju može izraditi samo prijavljeni klijent. Nakon prijave vraćate se na ovo plovilo.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Odustani</button>
              <button type="button" className="btn pregled-btn" onClick={onPrijava}>Prijava</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getEquipment, getServices } from '../services/fleetServices';

export default function DodatniFilteri() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [equipment, setEquipment] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    Promise.all([getEquipment(), getServices()])
      .then(([eq, sv]) => {
        setEquipment(eq);
        setServices(sv);
      })
      .catch(() => {});
  }, []);

  const selectedEquipment = searchParams.getAll('equipment');
  const selectedServices = searchParams.getAll('services');

  // Označi ili odznači jednu stavku popisa (oprema ili usluge)
  const toggleList = (key, id) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll(key);
    const idStr = String(id);
    const next = current.includes(idStr)
      ? current.filter((x) => x !== idStr)
      : [...current, idStr];

    params.delete(key);
    next.forEach((value) => params.append(key, value));
    setSearchParams(params);
  };

  // Postavi ili makni broj (cijena, kabine)
  const setNumber = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === '' || Number(value) < 0) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
      <h2 className="h5 mb-3">Dodatni filtri</h2>
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-bold" htmlFor="max_price">
            Najveća cijena po danu (€)
          </label>
          <input
            id="max_price"
            type="number"
            min="0"
            className="form-control"
            value={searchParams.get('max_price') || ''}
            onChange={(e) => setNumber('max_price', e.target.value)}
          />
        </div>

        <div className="col-md-6 col-lg-3">
          <label className="form-label fw-bold" htmlFor="min_cabins">
            Najmanji broj kabina
          </label>
          <input
            id="min_cabins"
            type="number"
            min="0"
            className="form-control"
            value={searchParams.get('min_cabins') || ''}
            onChange={(e) => setNumber('min_cabins', e.target.value)}
          />
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="fw-bold mb-2">Oprema</div>
          {equipment.map((item) => (
            <div className="form-check" key={item.id_opreme}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`oprema-${item.id_opreme}`}
                checked={selectedEquipment.includes(String(item.id_opreme))}
                onChange={() => toggleList('equipment', item.id_opreme)}
              />
              <label className="form-check-label" htmlFor={`oprema-${item.id_opreme}`}>
                {item.naziv}
              </label>
            </div>
          ))}
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="fw-bold mb-2">Dodatne usluge</div>
          {services.map((item) => (
            <div className="form-check" key={item.id_dodatne_usluge}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`usluga-${item.id_dodatne_usluge}`}
                checked={selectedServices.includes(String(item.id_dodatne_usluge))}
                onChange={() => toggleList('services', item.id_dodatne_usluge)}
              />
              <label className="form-check-label" htmlFor={`usluga-${item.id_dodatne_usluge}`}>
                {item.naziv}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
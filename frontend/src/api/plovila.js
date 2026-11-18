// MOCK PODACI. Kad backend (zadatak 5) dovrši rute, samo se ovdje mijenja tijelo funkcija,
// npr. dohvatiPlovila = () => fetch('/api/plovila').then((r) => r.json()). Nazive polja uskladiti s backendom.
export const eur = (n) =>
  new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
export const fmtDate = (d) => new Date(d).toLocaleDateString('hr-HR');

export const TYPES = [
  { id: 'jedrilica', naziv: 'Jedrilice', opis: 'Klasično jedrenje, 2 do 6 kabina' },
  { id: 'katamaran', naziv: 'Katamarani', opis: 'Više prostora i stabilnosti' },
  { id: 'motorni', naziv: 'Motorni brodovi', opis: 'Brzi prijelazi između otoka' },
  { id: 'gumenjak', naziv: 'Gumenjaci i ostalo', opis: 'Kraći izleti, bez skipera' },
];

// Koordinate su približne
export const PORTS = [
  { id: 'pula', naziv: 'Pula', lat: 44.8693, lng: 13.842 },
  { id: 'zadar', naziv: 'Zadar', lat: 44.1, lng: 15.22 },
  { id: 'sibenik', naziv: 'Šibenik', lat: 43.7276, lng: 15.9047 },
  { id: 'trogir', naziv: 'Trogir', lat: 43.5139, lng: 16.2475 },
  { id: 'split', naziv: 'Split', lat: 43.5039, lng: 16.4384 },
  { id: 'dubrovnik', naziv: 'Dubrovnik', lat: 42.6586, lng: 18.0867 },
];

const usluge = (skiper = 900) => [
  { id: 'skiper', naziv: 'Skiper', cijena: skiper },
  { id: 'ciscenje', naziv: 'Završno čišćenje', cijena: 120 },
  { id: 'posteljina', naziv: 'Posteljina i ručnici', cijena: 60 },
  { id: 'sup', naziv: 'Daska za veslanje (SUP)', cijena: 50 },
];

const SHIPS = [
  { id: 1, naziv: 'Jeanneau Sun Odyssey 410', tip: 'jedrilica', proizvodac: 'Jeanneau', model: 'Sun Odyssey 410', godina: 2021, kapacitet: 10, kabine: 4, lezajevi: 10, luka: 'split', cijenaDan: 240, slike: ['/img/ships/1-1.jpg', '/img/ships/1-2.jpg'], oprema: ['GPS plotter', 'Autopilot', 'Klima uređaj', 'Gumenjak s motorom', 'Solarni paneli'], usluge: usluge(), zauzeto: [{ od: '2026-12-05', do: '2026-12-12' }] },
  { id: 2, naziv: 'Bavaria Cruiser 37', tip: 'jedrilica', proizvodac: 'Bavaria', model: 'Cruiser 37', godina: 2019, kapacitet: 8, kabine: 3, lezajevi: 8, luka: 'trogir', cijenaDan: 170, slike: ['/img/ships/2-1.jpg'], oprema: ['GPS plotter', 'Bimini', 'Roler jedro'], usluge: usluge(850), zauzeto: [] },
  { id: 3, naziv: 'Lagoon 42', tip: 'katamaran', proizvodac: 'Lagoon', model: '42', godina: 2022, kapacitet: 12, kabine: 4, lezajevi: 12, luka: 'zadar', cijenaDan: 420, slike: ['/img/ships/3-1.jpg'], oprema: ['Klima uređaj', 'Generator', 'Vanjski roštilj', 'SUP'], usluge: usluge(1000), zauzeto: [{ od: '2026-12-20', do: '2026-12-27' }] },
  { id: 4, naziv: 'Fountaine Pajot Lucia 40', tip: 'katamaran', proizvodac: 'Fountaine Pajot', model: 'Lucia 40', godina: 2020, kapacitet: 10, kabine: 4, lezajevi: 10, luka: 'sibenik', cijenaDan: 360, slike: [], oprema: ['GPS plotter', 'Klima uređaj'], usluge: usluge(950), zauzeto: [] },
  { id: 5, naziv: 'Princess V40', tip: 'motorni', proizvodac: 'Princess', model: 'V40', godina: 2018, kapacitet: 8, kabine: 2, lezajevi: 6, luka: 'dubrovnik', cijenaDan: 520, slike: [], oprema: ['Radar', 'Klima uređaj', 'Bow thruster'], usluge: usluge(1100), zauzeto: [] },
  { id: 6, naziv: 'Bénéteau Antares 8', tip: 'motorni', proizvodac: 'Bénéteau', model: 'Antares 8', godina: 2020, kapacitet: 6, kabine: 1, lezajevi: 4, luka: 'pula', cijenaDan: 190, slike: [], oprema: ['GPS plotter', 'Tenda', 'Hladnjak'], usluge: usluge(700), zauzeto: [] },
];

const kasni = (v) => new Promise((resolve) => setTimeout(() => resolve(v), 200));
export const dohvatiPlovila = () => kasni(SHIPS);
export const dohvatiPlovilo = (id) => kasni(SHIPS.find((s) => String(s.id) === String(id)) ?? null);

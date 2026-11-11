--podaci za razvoj - pokrenuti 001_initial_schema.sql
--ID-jeve dodjeljuje baza
--trenutne koordinate odgovaraju koordinatama luka - kasnije ih se može promijeniti da odgovaraju konkretnom "pick-up spot" unutar luke
--koordinate luka + tehnički podaci modela - približni, uvjerljivi test podaci

--tablice KORISNIK, REZERVACIJA i REZERVACIJA_USLUGA trenutno prazne
--prvi admin: osoba se prijavi putem vanjskog pružatelja identiteta te automatski dobije ulogu klijenta. 
--zatim joj developeri ručno promijene ulogu u admin

begin;

insert into luka (ime_luka, lat, lng) values
    ('ACI marina Split',         43.503600, 16.433900),
    ('Marina Kaštela',           43.546900, 16.393000),
    ('Marina Mandalina, Šibenik', 43.721500, 15.904800),
    ('ACI marina Dubrovnik',     42.671000, 18.126500),
    ('Marina Punat',             45.019000, 14.628000);

insert into model (tip, kategorija, proizvodjac, model, kapacitet, broj_kabina, broj_lezajeva) values
    ('krstareća jedrilica', 'jedrilica',    'Bavaria',         'Cruiser 46',        10, 4, 10),
    ('krstareća jedrilica', 'jedrilica',    'Jeanneau',        'Sun Odyssey 410',    8, 3,  8),
    ('krstareća jedrilica', 'jedrilica',    'Beneteau',        'Oceanis 46.1',      10, 4, 10),
    ('krstareća jedrilica', 'jedrilica',    'Dufour',          '390 Grand Large',    8, 3,  8),
    ('jedreni katamaran',   'katamaran',    'Lagoon',          '42',                10, 4, 10),
    ('jedreni katamaran',   'katamaran',    'Fountaine Pajot', 'Isla 40',           10, 4, 10),
    ('motorni kruzer',      'motorni brod', 'Jeanneau',        'Merry Fisher 1095',  8, 2,  6),
    ('motorni kruzer',      'motorni brod', 'Beneteau',        'Antares 9',          6, 2,  6),
    ('gumenjak (RIB)',      'ostalo',       'Zodiac',          'Medline 7.5',       10, 0,  0);

insert into dodatne_usluge (naziv) values
    ('skiper'),
    ('završno čišćenje'),
    ('posteljina i ručnici'),
    ('SUP daska'),
    ('transfer iz zračne luke');

insert into oprema (naziv) values
    ('GPS plotter'),
    ('autopilot'),
    ('bimini'),
    ('tuš'),
    ('gumenjak'),
    ('hladnjak'),
    ('klima uređaj'),
    ('generator'),
    ('solarni panel'),
    ('Wi-Fi');

insert into model_usluge (id_model, id_dodatne_usluge, cijena)
select model.id_model, dodatne_usluge.id_dodatne_usluge, c.cijena
from (values
    ('jedrilica',    'skiper',                  1200.00),
    ('jedrilica',    'završno čišćenje',         150.00),
    ('jedrilica',    'posteljina i ručnici',     100.00),
    ('jedrilica',    'SUP daska',                120.00),
    ('jedrilica',    'transfer iz zračne luke',   80.00),
    ('katamaran',    'skiper',                  1500.00),
    ('katamaran',    'završno čišćenje',         250.00),
    ('katamaran',    'posteljina i ručnici',     150.00),
    ('katamaran',    'SUP daska',                120.00),
    ('katamaran',    'transfer iz zračne luke',  120.00),
    ('motorni brod', 'skiper',                  1000.00),
    ('motorni brod', 'završno čišćenje',         120.00),
    ('motorni brod', 'posteljina i ručnici',      80.00),
    ('motorni brod', 'transfer iz zračne luke',   80.00),
    ('ostalo',       'skiper',                   150.00)
) as c (kategorija, usluga, cijena)
join model on model.kategorija = c.kategorija
join dodatne_usluge on dodatne_usluge.naziv = c.usluga;


insert into model_oprema (id_model, id_opreme)
select model.id_model, oprema.id_opreme
from (values
    ('jedrilica',    'GPS plotter'),
    ('jedrilica',    'autopilot'),
    ('jedrilica',    'bimini'),
    ('jedrilica',    'tuš'),
    ('jedrilica',    'gumenjak'),
    ('jedrilica',    'hladnjak'),
    ('katamaran',    'GPS plotter'),
    ('katamaran',    'autopilot'),
    ('katamaran',    'bimini'),
    ('katamaran',    'tuš'),
    ('katamaran',    'gumenjak'),
    ('katamaran',    'hladnjak'),
    ('katamaran',    'klima uređaj'),
    ('katamaran',    'generator'),
    ('katamaran',    'solarni panel'),
    ('katamaran',    'Wi-Fi'),
    ('motorni brod', 'GPS plotter'),
    ('motorni brod', 'bimini'),
    ('motorni brod', 'tuš'),
    ('motorni brod', 'hladnjak'),
    ('motorni brod', 'klima uređaj'),
    ('ostalo',       'GPS plotter'),
    ('ostalo',       'bimini')
) as c (kategorija, oprema)
join model on model.kategorija = c.kategorija
join oprema on oprema.naziv = c.oprema;

insert into brod (id_model, naziv, godina_proizvodnje, id_luka, cijena_dan, vrijeme_preuzimanja, vrijeme_povratka, aktivan)
select model.id_model, b.naziv, b.godina, luka.id_luka, b.cijena, b.preuzimanje, b.povratak, b.aktivan
from (values
    ('Bavaria',         'Cruiser 46',        'Adriana',      2019, 'ACI marina Split',          320.00, time '09:00', time '17:00', true),
    ('Bavaria',         'Cruiser 46',        'Bura',         2021, 'Marina Kaštela',            360.00, time '09:00', time '17:00', true),
    ('Bavaria',         'Cruiser 46',        'Galeb',        2017, 'Marina Punat',              290.00, time '10:00', time '18:00', true),
    ('Bavaria',         'Cruiser 46',        'Neptun',       2012, 'Marina Kaštela',            200.00, time '09:00', time '17:00', false),
    ('Jeanneau',        'Sun Odyssey 410',   'Maestral',     2022, 'ACI marina Split',          300.00, time '09:00', time '17:00', true),
    ('Jeanneau',        'Sun Odyssey 410',   'Lavanda',      2020, 'Marina Mandalina, Šibenik', 280.00, time '10:00', time '18:00', true),
    ('Beneteau',        'Oceanis 46.1',      'Tramontana',   2021, 'ACI marina Dubrovnik',      380.00, time '09:00', time '17:00', true),
    ('Beneteau',        'Oceanis 46.1',      'Kornat',       2023, 'Marina Mandalina, Šibenik', 410.00, time '10:00', time '18:00', true),
    ('Dufour',          '390 Grand Large',   'Vila Velebita',2019, 'Marina Punat',              250.00, time '10:00', time '18:00', true),
    ('Lagoon',          '42',                'Dupin',        2020, 'ACI marina Split',          650.00, time '09:00', time '17:00', true),
    ('Lagoon',          '42',                'Sirena',       2022, 'ACI marina Dubrovnik',      720.00, time '09:00', time '17:00', true),
    ('Fountaine Pajot', 'Isla 40',           'Mirna',        2021, 'Marina Kaštela',            600.00, time '09:00', time '17:00', true),
    ('Jeanneau',        'Merry Fisher 1095', 'Jugo',         2021, 'ACI marina Split',          450.00, time '08:00', time '18:00', true),
    ('Beneteau',        'Antares 9',         'Lastavica',    2020, 'Marina Punat',              280.00, time '08:00', time '18:00', true),
    ('Zodiac',          'Medline 7.5',       'Strijela',     2023, 'ACI marina Split',          220.00, time '08:00', time '20:00', true)
) as b (proizvodjac, model, naziv, godina, luka, cijena, preuzimanje, povratak, aktivan)
join model on model.proizvodjac = b.proizvodjac and model.model = b.model
join luka on luka.ime_luka = b.luka;

--dok se slike ne učitaju, prikazuje se prazno
insert into fotografija (id_brod, url_foto, redoslijed)
select brod.id_brod,
       'https://epkvmcdkxdmydbqqevcm.supabase.co/storage/v1/object/public/fotografije/' || f.datoteka, --putanja do datoteke na Supabaseu
       f.redoslijed
from (values
    ('Adriana',       'adriana-1.jpg',       1),
    ('Adriana',       'adriana-2.jpg',       2),
    ('Bura',          'bura-1.jpg',          1),
    ('Galeb',         'galeb-1.jpg',         1),
    ('Neptun',        'neptun-1.jpg',        1),
    ('Maestral',      'maestral-1.jpg',      1),
    ('Maestral',      'maestral-2.jpg',      2),
    ('Lavanda',       'lavanda-1.jpg',       1),
    ('Tramontana',    'tramontana-1.jpg',    1),
    ('Kornat',        'kornat-1.jpg',        1),
    ('Vila Velebita', 'vila-velebita-1.jpg', 1),
    ('Dupin',         'dupin-1.jpg',         1),
    ('Dupin',         'dupin-2.jpg',         2),
    ('Sirena',        'sirena-1.jpg',        1),
    ('Mirna',         'mirna-1.jpg',         1),
    ('Jugo',          'jugo-1.jpg',          1),
    ('Lastavica',     'lastavica-1.jpg',     1),
    ('Strijela',      'strijela-1.jpg',      1)
) as f (brod, datoteka, redoslijed)
join brod on brod.naziv = f.brod;

insert into nedostupnost (id_brod, datum_pocetak, datum_kraj, razlog)
select brod.id_brod, n.datum_pocetak, n.datum_kraj, n.razlog
from (values
    ('Galeb',    date '2026-11-01', date '2027-03-31', 'zimski servis'),
    ('Kornat',   date '2027-05-01', date '2027-05-10', 'servis motora'),
    ('Strijela', date '2026-12-01', date '2027-02-28', 'zimovanje na suhom')
) as n (brod, datum_pocetak, datum_kraj, razlog)
join brod on brod.naziv = n.brod;

commit;

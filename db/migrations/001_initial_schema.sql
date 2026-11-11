--korisnik pri logiranju automatski dobiva ulogu klijent
--ostale uloge ručno unosi isključivo administrator
--dozvoljeno je da ime, prezime i telefon nedostaju, ali će se zatražiti pri izradi prve rezervacije
--ime, prezime i telefon korisnik može izmijeniti pri svakoj rezervaciji klikom na "Uredi"
create table korisnik (
    uuid    text primary key,
    uloga   text not null default 'klijent'
            check (uloga in ('klijent', 'admin', 'djelatnik', 'voditelj')),
    ime     text,
    prezime text,
    email   text not null,
    telefon text
);

--lat/lng koordinate unutar luke za OpenStreetMap
create table luka (
    id_luka  bigint generated always as identity primary key,
    ime_luka text not null unique,
    lat      numeric(9, 6) not null,
    lng      numeric(9, 6) not null
);

--svi atributi NOT NULL jer moraju biti dostupni korisniku za pregled na stranici
create table model (
    id_model      bigint generated always as identity primary key,
    tip           text not null,
    kategorija    text not null
                  check (kategorija in ('jedrilica', 'motorni brod', 'katamaran', 'ostalo')),
    proizvodjac   text not null,
    model         text not null,
    kapacitet     integer not null,
    broj_kabina   integer not null,
    broj_lezajeva integer not null,
    unique (proizvodjac, model)
);

--unique: sprječava da administrator unese 2 identične usluge pod različitim id-jevima
create table dodatne_usluge (
    id_dodatne_usluge bigint generated always as identity primary key,
    naziv             text not null unique
);

--unique: sprječava da administrator unese 2 identične opreme pod različitim id-jevima
create table oprema (
    id_opreme bigint generated always as identity primary key,
    naziv     text not null unique
);

--references (integritet baze podataka): id koji se koristi MORA postojati u navedenim tablicama
create table brod (
    id_brod             bigint generated always as identity primary key,
    id_model            bigint not null references model (id_model),
    naziv               text not null,
    godina_proizvodnje  integer not null,
    id_luka             bigint not null references luka (id_luka),
    cijena_dan          numeric(10, 2) not null,
    vrijeme_preuzimanja time not null,
    vrijeme_povratka    time not null,
    aktivan             boolean not null default true, --aktivan = false unosi admin
    check (vrijeme_preuzimanja < vrijeme_povratka)
);

--dodatne usluge dostupne po modelu + njihove cijene (za taj model)
create table model_usluge (
    id_model          bigint not null references model (id_model),
    id_dodatne_usluge bigint not null references dodatne_usluge (id_dodatne_usluge),
    cijena            numeric(10, 2) not null,
    primary key (id_model, id_dodatne_usluge)
);

--oprema dostupna po modelu, ali nema cijene jer je oprema uključena u cijenu najma plovila
create table model_oprema (
    id_model  bigint not null references model (id_model),
    id_opreme bigint not null references oprema (id_opreme),
    primary key (id_model, id_opreme)
);

--timestamptz: timestamp + timezone (spremljen točan trenutak po UTC)
--now(): SQL fja koja vraća točan trenutak po zoni veze (njezina vrijednost upisuje se pri unosa rezervacije u tablicu)
--zona veze (Supabase): UTC
create table rezervacija (
    id_rezervacije    bigint generated always as identity primary key,
    uuid              text not null references korisnik (uuid),
    status            text not null
                      check (status in ('u tijeku', 'potvrdena', 'otkazana')),
    id_brod           bigint not null references brod (id_brod),
    broj_osoba        integer not null,
    datum_preuzimanja date not null,
    datum_povratka    date not null,
    vrijeme_nastanak  timestamptz not null default now(),
    id_luka           bigint not null references luka (id_luka),
    cijena_uk         numeric(10, 2),
    check (datum_preuzimanja <= datum_povratka) --dozvoljeno jednodnevno iznajmljivanje
);

--partial unique index
--ograničava da korisnik (uuid) smije imati isključivo jednu rezervaciju u tijeku
create unique index rezervacija_jedna_u_tijeku
    on rezervacija (uuid)
    where status = 'u tijeku';

--dodatne usluge se upisuju u rezervacija_usluga tek NAKON potvrde rezervacije
--odabrane dodatne usluge štite se od refresha stranice spremanjem u sessionStorage
create table rezervacija_usluga (
    id_rezervacije    bigint not null references rezervacija (id_rezervacije),
    id_dodatne_usluge bigint not null references dodatne_usluge (id_dodatne_usluge),
    primary key (id_rezervacije, id_dodatne_usluge)
);

--samo privremene nedostupnosti
--brodovi koji su trajno nedostupni (izvan flote) imaju aktivan = false
create table nedostupnost (
    id_brod       bigint not null references brod (id_brod),
    datum_pocetak date not null,
    datum_kraj    date not null,
    razlog        text not null,
    primary key (id_brod, datum_pocetak),
    check (datum_pocetak <= datum_kraj)
);

--unique: unutar jednog broda 2 fotografije ne mogu imati isti redoslijed
create table fotografija (
    id_brod    bigint not null references brod (id_brod),
    url_foto   text not null,
    redoslijed integer not null,
    primary key (id_brod, url_foto),
    unique (id_brod, redoslijed)
);

--Supabase nudi anon ključ na razini projekta pomoću kojeg se može pristupiti bilo kojoj tablici direktno iz bilokojeg programa-> OPASNO
--javni API - adresa na Supabase serveru kojoj programi (poput preglednika) mogu slati zahtjev (uz odgovarajući ključ)
--RLS bez dodatnih pravila: nitko preko javnog API-ja ne smije ništa
--backend se spaja direktno preko DATABASE_URL kao vlasnik tablica
alter table korisnik           enable row level security;
alter table luka               enable row level security;
alter table model              enable row level security;
alter table dodatne_usluge     enable row level security;
alter table oprema             enable row level security;
alter table brod               enable row level security;
alter table model_usluge       enable row level security;
alter table model_oprema       enable row level security;
alter table rezervacija        enable row level security;
alter table rezervacija_usluga enable row level security;
alter table nedostupnost       enable row level security;
alter table fotografija        enable row level security;

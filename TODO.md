# TODO

Popis onoga što još treba dodati ili popraviti. Kad nešto riješite, označite kvačicom `[x]` ili obrišite stavku.

Stanje pregledano na `main`, commit `d41087d` (18. 11. 2026.).

---

## Upravljanje korisnicima

Frontend je napravljen (`/users`, `/profile`), ali backend rute koje poziva još ne postoje. Google prijava (`/auth/google`, `/me`, `/logout`) rješava se zasebno.

### Backend: potrebno dodati — Antonija Gudelj

Rute koje frontend već poziva:

| Ruta | Tko smije | Što frontend očekuje |
| :--- | :--- | :--- |
| `GET /api/users` | admin | popis svih korisnika s poljima `{uuid, ime, prezime, email, telefon, uloga}` |
| `PATCH /api/users/{uuid}` | admin, vlasnik profila | admin drugom korisniku mijenja `telefon` i `uloga`; vlasnik profila sebi mijenja `telefon`, `ime` i `prezime`; vraća ažuriranog korisnika |

Funkcije koje treba dodati u `backend/repositories/users.py`:

- [ ] dohvat svih korisnika (za `GET /api/users`)
- [ ] `alter_user`: promjena telefona, imena, prezimena i uloge zadanog korisnika (za `PATCH /api/users/{uuid}`). Funkcija samo upisuje u bazu; provjere tko smije što mijenjati (pravila ispod) rade se u ruti, u `backend/routers/users.py`.
  - Potpis: `alter_user(uuid, telefon=None, ime=None, prezime=None, uloga=None)`. Mijenja samo polja koja nisu `None`, ostala ostaju kakva jesu. Upit se slaže dinamički (popis `stupac = %s` za zadana polja i popis vrijednosti, spojeno s `", ".join(...)`): `update korisnik set ... where uuid = %s returning *`.
  - Ruta prosljeđuje samo dozvoljena polja: klijent za sebe `alter_user(uuid, telefon=..., ime=..., prezime=...)`, admin za drugog korisnika `alter_user(uuid, telefon=..., uloga=...)`.
  - `None` znači „ne mijenjaj”, pa se polje ne može postaviti na `null`. To nije problem: kad korisnik obriše broj telefona, frontend šalje prazan tekst `""`, koji se normalno upiše.

Pravila na backendu:

- [ ] Svaka ruta provjerava prijavu (preko provjere iz Google prijave): `401` ako korisnik nije prijavljen, `403` ako nema odgovarajuću ulogu.
- [ ] `PATCH /api/users/{uuid}`: korisnik koji nije admin smije mijenjati samo svoj profil, i to `telefon`, `ime` i `prezime`. Polje `uloga` koje pošalje backend tiho ignorira, inače bi si svatko mogao dodijeliti ulogu admina.
- [ ] Uloge su svugdje malim slovima, kao u bazi: `klijent`, `admin`, `djelatnik`, `voditelj`. Backend ih tako sprema i tako vraća (`/me`, `/users`), bez pretvaranja u velika slova.
- [ ] **Admin ne smije sam sebi promijeniti ulogu.** `PATCH /api/users/{uuid}` mora izričito odbiti zahtjev (`403`) kad je `uuid` isti kao kod prijavljenog admina, a tijelo sadrži `uloga`. Frontend to već sprječava (tablica nema gumb „Uredi” za vlastiti redak), ali zahtjev se može poslati i mimo sučelja (Swagger, `curl`), pa zabrana mora biti na backendu. Inače bi admin mogao sam sebi oduzeti ovlasti, a ako je jedini admin, aplikacija ostaje bez ikoga tko dodjeljuje uloge.

### Frontend: potrebno popraviti — Ian Vrbaslija

- [x] **`UsersTable.jsx` se ruši za korisnika bez telefona.** `user.telefon.toLowerCase()` puca kad je telefon `null`, a takav je svaki novi korisnik. Popravak: `(user.telefon ?? "")`. Isto za `ime` i `prezime`, inače se u filtru pojavljuje `"null null"`.
- [x] **Krivi link za prijavu.** U `NavBarLinks.jsx` link „Prijava” vodi na `/login`, a ruta je `/prijava`.
- [x] **Ikona Googlea.** `src="src/assets/google-icon.png"` u `Login.jsx` radi samo lokalno. Sliku importati (`import googleIcon from '../assets/google-icon.png'`).
- [ ] **Adresa API-ja.** *(Tonko Buncuga)* Zamjenske adrese se razlikuju: `https://progiprojekt.vercel.app/api` u servisima i `Login.jsx`, a `http://localhost:8000/api` u `Logout.jsx`. Lokalno se tako zove produkcijski backend. Svugdje staviti `/api`:
  - na Vercelu radi jer su frontend i backend na istoj domeni
  - lokalno radi jer `vite.config.js` već prosljeđuje `/api` na `127.0.0.1:8000`
  - kolačići sesije onda rade bez CORS postavki

---

## Vlastiti profil

Frontend je napravljen (`/profile`): prikaz imena, e-maila, telefona i uloge, upozorenje kad broj telefona nije unesen, uređivanje imena, prezimena i broja telefona (s provjerom formata broja). Podatke o prijavljenom korisniku daje `GET /api/me`, koji se radi u sklopu Google prijave.

### Backend: potrebno dodati — Antonija Gudelj

- [ ] `PATCH /api/users/{uuid}` za promjenu imena, prezimena i broja telefona (ista ruta kao u upravljanju korisnicima). Korisnik koji nije admin smije mijenjati samo svoj profil, i to `telefon`, `ime` i `prezime`; `uloga` iz tijela zahtjeva backend ignorira.

### Frontend: potrebno popraviti — Ian Vrbaslija

- [x] **`ProfileInfo.jsx` se ruši kad nema imena.** `user.ime.charAt(0)` puca jer baza dopušta `ime` i `prezime` bez vrijednosti. Popravak: `user.ime?.charAt(0) ?? ""`.
- [x] **Natpisi u prozoru za uređivanje profila.** Prozor (`PhoneNumberModal.jsx`) i gumb na profilu (`ProfileInfo.jsx`) zovu se „Uredi broj telefona”, a uređuju se ime, prezime i telefon; preimenovati npr. u „Uredi podatke”. Natpis iznad polja za prezime (`PhoneNumberModal.jsx`, redak 79) glasi „Ime:”, treba „Prezime:”.
- [ ] **Adresa API-ja.** *(Tonko Buncuga)* Zamjenska adresa u `profileServices.js` je produkcijska (`https://progiprojekt.vercel.app/api`), pa lokalni profil zove produkcijski backend. Promijeniti u `/api` (vidi zadnju stavku u odjeljku *Upravljanje korisnicima*).

---

## Istaknuta plovila

Frontend je napravljen (odjeljak „Istaknuta plovila” na početnoj stranici), ali podatke uzima s rute `GET /api/boats`, koja još nije na `main`.

### Backend: potrebno napraviti — Nikolina Žderić

- [x] **Spojiti `feature/plovila-backend` u `main`.** Ruta `/api/boats` postoji samo u toj grani. Spajanje sada daje konflikte u `backend/repositories/fleet.py` i `backend/routers/boats.py`, jer su kod mergea `feature/prijava-frontend` izbačene izmjene backenda iz commita `97109c8`. Postupak:
  1. U granu `feature/plovila-backend` spojiti `main` (`git merge main`).
  2. Kod konflikata zadržati verzije iz `feature/plovila-backend` za `fleet.py` i `routers/boats.py`.
  3. Provjeriti da `backend/main.py` ima `from routers import boats` i `app.include_router(boats.router)`, a da postoji prazan `backend/routers/__init__.py`. Git ovo neće prijaviti kao konflikt, pa lako ostane izostavljeno.
  4. Pokrenuti backend lokalno i provjeriti `/api/boats` u Swaggeru (`/api/docs`), zatim spojiti granu u `main`.
- [x] **`/api/boats` treba vraćati ugniježđeni oblik.** Frontend (`ShipCard.jsx`, a kasnije i pretraga) očekuje isti oblik kao `/api/boats/{id}`: `ship.basics.naziv`, `ship.model.kapacitet`, `ship.port.ime_luka`, `ship.photos[0].url_foto`. Sada `search_boats` vraća ravan popis (`naziv`, `kapacitet`, `ime_luka`, `naslovna_foto`…).
  - **Ne** pozivati `get_boat_info` za svaki brod (za 15 brodova to je 15 veza i 90 upita). Zadržati postojeći jedan upit i retke u Pythonu presložiti:
    ```python
    boats = []
    for row in rows:
        boats.append({
            "basics": {"id_brod": row["id_brod"], "naziv": row["naziv"],
                       "cijena_dan": row["cijena_dan"], "godina_proizvodnje": row["godina_proizvodnje"]},
            "model":  {"kategorija": row["kategorija"], "tip": row["tip"], "proizvodjac": row["proizvodjac"],
                       "model": row["model"], "kapacitet": row["kapacitet"], "broj_kabina": row["broj_kabina"]},
            "port":   {"id_luka": row["id_luka"], "ime_luka": row["ime_luka"]},
            "photos": [{"url_foto": row["naslovna_foto"]}] if row["naslovna_foto"] else [],
        })
    return boats
    ```
  - U `select` dodati `m.tip`, jer ga `ShipCard` prikazuje.
  - `equipment` i `services` u popisu nisu potrebni; u `photos` je samo naslovna slika.

### Frontend: potrebno popraviti — Ana Bartulović

- [ ] **Krivi ključ u popisu istaknutih plovila.** U `HomePage.jsx` je `key={ship.id}`, a plovilo nema polje `id`, pa je ključ za sve kartice `undefined` i React u konzoli javlja upozorenje. Treba `key={ship.basics.id_brod}`.
- [ ] **Nedostaje pozadinska slika na vrhu početne.** `styles/index.css` (redak 252) za pozadinu odjeljka „Iznajmite plovilo na Jadranu” koristi `url('/img/hero.jpg')`, a datoteke `frontend/public/img/hero.jpg` nema, pa se prikazuje samo zamjenska tamnoplava boja. Provjeriti s autoricom početne je li slika trebala biti dodana; ako da, staviti je u `frontend/public/img/hero.jpg`.

---

## Detalji plovila

Frontend je napravljen (`ShipDetailsPage.jsx`, `/plovila/{id}`), ali podatke uzima s rute `GET /api/boats/{id}`, koja još nije na `main`; dolazi istim spajanjem grane `feature/plovila-backend` kao i `/api/boats` (vidi *Istaknuta plovila*).

### Frontend: potrebno popraviti — Ana Bartulović

- [ ] **Gumb „Rezerviraj” vodi na `/rezervacija/undefined`.** U `ShipDetailsPage.jsx` (redak 49) koristi se `ship.id_brod`, a mora biti `ship.basics.id_brod`. Rezervacija nije dio prve predaje, ali ispraviti kad se bude radila. *(Kasnije, uz rezervaciju.)*
- [ ] **Kriva poruka za nepostojeće plovilo.** Za nepostojeće ili neaktivno plovilo backend vraća `404`, a `getBoat` u `fleetServices.js` tada baca grešku, pa stranica prikazuje „Plovilo se trenutno ne može učitati” umjesto „Plovilo nije pronađeno”. Za `404` `getBoat` treba vratiti `null` (`if (response.status === 404) return null;` prije provjere `response.ok`).
- [ ] **Galerija ne mijenja sliku.** Klik na sličicu mijenja stanje `active`, ali velika slika u `ShipDetailsPage.jsx` (redak 86) uvijek prikazuje `ship.photos[0]`. Treba `ship.photos[active]`.
- [ ] **„Povratak na pretragu” uvijek vodi na prazan popis.** Link u `ShipDetailsPage.jsx` (redak 80) vodi na `/plovila` bez filtara koje je korisnik zadao, a korisnika koji je došao s početne (istaknuta plovila) vodi na stranicu na kojoj nije bio. Zamijeniti gumbom „Natrag” koji poziva `navigate(-1)` i vraća korisnika točno odakle je došao, zajedno s filtrima.
- [ ] **Mrtvi kod u `ShipDetailsPage.jsx`.** Ostaci iz vremena prije spajanja s backendom; ništa ne rade, pa ih obrisati:
  - redak 7 i 24: `useKorisnik` iz `privremeno/useKorisnik.js`
  - retci 47–48: `luka` i `tip`, koji traže po izmišljenim `PORTS` i `TYPES` iz `api/plovila.js`
  - redak 137: `onPrijava={() => prijava(pathname)}`, jer ga `PrijavaModal` ne koristi
- [ ] **Netočna rečenica u prozoru za prijavu.** `PrijavaModal.jsx` (prozor koji neprijavljeni korisnik dobije klikom na „Rezerviraj”) kaže „Nakon prijave vraćate se na ovo plovilo.”, ali prijava ne pamti s kojeg je plovila korisnik došao. Maknuti tu rečenicu.

---

## Brisanje izmišljenih podataka — Ana Bartulović

`frontend/src/api/plovila.js` sadrži izmišljene podatke napravljene prije backenda (`SHIPS`, `PORTS`, `TYPES`, `dohvatiPlovila`, `dohvatiPlovilo`, `fmtDate`). Stranice već uzimaju stvarne podatke s backenda (`services/fleetServices.js`), pa se izmišljeni podaci više ne prikazuju, ali ih pet datoteka još importa. Jedini pravi kod u datoteci je `eur` (oblikovanje cijene u eurima). Ako se datoteka samo obriše, aplikacija se neće pokrenuti, pa ići ovim redom:

- [ ] **1. Premjestiti `eur`** u novu datoteku `frontend/src/utils/format.js` i u `ShipCard.jsx` i `ShipDetailsPage.jsx` promijeniti import na nju.
- [ ] **2. Zamijeniti početnu vrijednost kategorije** u `HomePage.jsx` (ili u `SearchBar.jsx`, ako je tražilica već izdvojena, vidi *Pregled plovila*): `useState(TYPES[0].id || '')` → `useState('')` (opcija „Sve kategorije” u tražilici).
- [ ] **3. Obrisati mrtvi kod u `ShipDetailsPage.jsx`** (vidi *Detalji plovila*): retci 47–48 koriste `PORTS` i `TYPES`.
- [ ] **4. Maknuti importe iz `api/plovila.js`:**
  - `HomePage.jsx`: `dohvatiPlovila`, `PORTS`, `TYPES`
  - `PortsMap.jsx`: `PORTS`
  - `FleetStrip.jsx`: `TYPES`
  - `ShipDetailsPage.jsx`: `PORTS`, `TYPES` (a `eur` već ide iz `utils/format.js`)
- [ ] **5. Obrisati `api/plovila.js`** i praznu mapu `api/`.

Mapa `frontend/src/privremeno/` sadrži privremene zamjene; briše se postupno:

- [ ] `Zaglavlje.jsx`: ne koristi se nigdje, obrisati odmah.
- [ ] `useKorisnik.js`: koristi ga samo mrtvi kod u `ShipDetailsPage.jsx`; obrisati zajedno s njim.
- [ ] `Stranice.jsx`: `PretragaStranica` otpada kad se napravi nova stranica s popisom plovila (vidi *Pregled plovila*); `RezervacijaStranica` ostaje dok se ne napravi rezervacija, jer gumb „Rezerviraj” vodi na nju.

---

## Pregled plovila (rezultati pretrage i kategorija)

Javna stranica (za prijavljene i neprijavljene korisnike) koja prikazuje plovila prema filtrima: nakon klika na „Pretraži” u tražilici na početnoj ili klikom na karticu kategorije u „Kategorije plovila”. Radi se nakon popravaka iz odjeljaka iznad; ovisi posebno o stavkama za `/api/boats` u odjeljku *Istaknuta plovila* (spajanje grane i ugniježđeni oblik).

Već postoji:

- ruta `/plovila` u `App.jsx`, za sada s privremenom stranicom „U izradi” (`PretragaStranica` iz `privremeno/Stranice.jsx`)
- linkovi na nju: kartice kategorija (`FleetStrip.jsx`) vode na `/plovila?category=<kategorija>`, a gumb „Pretraži” na `/plovila?category=<odabrana kategorija>`
- `ShipCard.jsx` za prikaz rezultata (klik vodi na detalje plovila)
- dohvat kategorija i luka na početnoj (`getCategories()`, `getPorts()`)
- backend `GET /api/boats` s filtrima `date_from`, `date_to`, `num_of_people`, `port` (id luke) i `category`; vraća samo aktivna plovila slobodna u zadanom razdoblju
- backend rute `GET /api/equipment` i `GET /api/services` (popisi opreme i usluga), u grani `feature/plovila-backend`

Dogovor o filtrima (svi su neobavezni; zajedno pokrivaju sve kriterije iz UC-007):

| Gdje | Filtar | Parametar u adresi |
| :--- | :--- | :--- |
| tražilica na početnoj | datum od, datum do | `date_from`, `date_to` |
| tražilica na početnoj | broj osoba | `num_of_people` |
| tražilica na početnoj | luka | `port` |
| tražilica na početnoj | kategorija | `category` |
| dodatni filtri na stranici s rezultatima | oprema (plovilo mora imati svu odabranu) | `equipment` (može se ponoviti) |
| dodatni filtri na stranici s rezultatima | dodatne usluge (plovilo mora imati sve odabrane) | `services` (može se ponoviti) |
| dodatni filtri na stranici s rezultatima | najveća cijena po danu | `max_price` |
| dodatni filtri na stranici s rezultatima | najmanji broj kabina | `min_cabins` |

Primjer adrese: `/plovila?category=jedrilica&date_from=2027-06-01&date_to=2027-06-07&equipment=2&equipment=5&max_price=300`.

### Backend: potrebno napraviti — Nikolina Žderić

- [x] **Proširiti `search_boats` i rutu `GET /api/boats` s četiri nova neobavezna filtra.** Svaki se dodaje samo ako je zadan.
  - `max_price`: `b.cijena_dan <= %s`
  - `min_cabins`: `m.broj_kabina >= %s`
  - `equipment` (popis id-jeva opreme): model mora imati svu odabranu opremu
    ```sql
    b.id_model in (select id_model from model_oprema
                   where id_opreme = any(%s)
                   group by id_model
                   having count(*) = %s)   -- broj odabranih stavki
    ```
  - `services` (popis id-jeva usluga): isto, s tablicom `model_usluge` i stupcem `id_dodatne_usluge`
  - U ruti su `equipment` i `services` popisi: `equipment: list[int] | None = Query(None)`, pa ih adresa šalje kao `?equipment=2&equipment=5`.

### Frontend: potrebno napraviti — Luka Martinić

- [ ] **Tražilica kao komponenta `components/SearchBar.jsx`.** *(Ana Bartulović; napraviti prije nove stranice)* Sada je tražilica napisana izravno u `HomePage.jsx` i od polja radi samo „Kategorija”; „Datum”, „Trajanje”, „Gosti” i „Luka” su fiksni tekst (`readOnly`). Tražilicu izdvojiti u `SearchBar.jsx` i u njoj napraviti prava polja; „Pretraži” u adresu stavlja sve ispunjene filtre (prazne ne šalje).
  - **Napomena: `SearchBar` se koristi na dva različita mjesta,** na početnoj (`HomePage.jsx`) i na novoj stranici s pregledom plovila. Na početnoj je prazna; na pregledu plovila polja popunjava vrijednostima iz adrese (`useSearchParams`), pa korisnik vidi i mijenja ono što je tražio. U oba slučaja „Pretraži” vodi na `/plovila?…`; na pregledu plovila ostaje se na istoj stranici, mijenja se adresa i iscrtavaju se novi rezultati.
  - „Pretraži” mijenja samo svoja polja u adresi, a dodatne filtre s pregleda plovila (oprema, usluge, cijena, kabine) zadržava:
    ```jsx
    const params = new URLSearchParams(searchParams);   // kreni od trenutne adrese
    for (const [key, value] of Object.entries({ date_from, date_to, num_of_people, port, category })) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    navigate(`/plovila?${params}`);
    ```
  - Kategorije i luke za izbornike `SearchBar` dohvaća sam (`getCategories()`, `getPorts()`), da ne ovisi o stranici na kojoj se nalazi.
  - Nijedno polje nije obavezno. Ako su sva prazna, „Pretraži” vodi na `/plovila` bez filtara i prikazuju se sva aktivna plovila (plovila je malo, pa straničenje nije potrebno).
  - Kategorija: izborniku dodati opciju „Sve kategorije” (vrijednost `''`) kao početnu; kad je odabrana, `category` se ne šalje. Uvjet `if (selectedCategory)` u `handleSearch` obavezno maknuti: prazan tekst `''` u JavaScriptu znači „netočno”, pa bi uz „Sve kategorije” uvjet blokirao pretragu i gumb „Pretraži” ne bi radio ništa.
  - Luka: padajući izbornik iz već dohvaćenih luka, s opcijom „Sve luke”.
  - Gosti (broj osoba): polje `<input type="number" min="1">`, u adresi `num_of_people`; backend vraća plovila čiji je kapacitet barem toliki. Prazno polje znači „bilo koji broj osoba” i ne šalje se.
  - Datumi: polja „Datum” i „Trajanje” zamijeniti s dva polja `<input type="date">`, „Datum od” i „Datum do”, koja se šalju kao `date_from` i `date_to` (datumi su uključivi).
  - Prije slanja provjeriti da su zadana oba datuma ili nijedan, da „Datum od” nije u prošlosti i da nije nakon „Datum do” (inače backend vraća `400`).
  - Maknuti napomenu „💡 Vizija napredne pretrage…”.
- [ ] **Funkcija u `fleetServices.js` koja šalje filtre** na `/api/boats` (postojeći `getFleet()` ne prima parametre). Način izvedbe odlučuje osoba koja to radi; napomena za popise:
  - Backend `equipment` i `services` čita iz ponovljenog parametra: `?equipment=2&equipment=5` → `[2, 5]`. Ako se popis upiše jednom naredbom (`params.set("equipment", [2, 5])`), u adresi nastaje `equipment=2,5`, backend to ne razumije i vraća `422`.
  - Ispravno je svaku stavku dodati zasebno (`params.append("equipment", id)`), a pri čitanju iz adrese koristiti `searchParams.getAll("equipment")` (`get` vraća samo prvu vrijednost).
  - Jedna mogućnost: budući da adresa stranice i backend koriste ista imena parametara, funkcija može samo proslijediti dio adrese iza `?` (``fetch(`${API_URL}/boats?${searchParams}`)``), pa ponovljeni parametri stignu do backenda nepromijenjeni.
- [x] **Zajedničko javno zaglavlje `components/PublicHeader.jsx`** *(Ian Vrbaslija; napraviti prije nove stranice, dogovoriti redoslijed s Anom Bartulović jer oboje mijenjaju `HomePage.jsx`)*. Zaglavlje javnih stranica sada je kopirano u `HomePage.jsx` i `ShipDetailsPage.jsx`. Raspored ostaje kakav jest:
  - prijavljenom korisniku gore se prikazuje `NavBar` s `brand={false}` (linkovi ovisno o ulozi, ime, odjava)
  - ispod je javno zaglavlje: „Natalia Charter”, „Kategorije plovila”, „Luke polaska”, „Kako rezervirati?” te „Prijava” samo za neprijavljene
  - „Natalia Charter” piše samo jednom

  Oba dijela premjestiti u `PublicHeader.jsx` i na početnoj, detaljima plovila i novoj stranici koristiti `<PublicHeader />`. (Na početnoj klik na „Natalia Charter” pomiče stranicu na vrh; to zadržati.)
- [ ] **Nova stranica `pages/BoatList.jsx`**: na vrhu `<SearchBar />`, uz rezultate dodatni filtri; čita filtre iz adrese (`useSearchParams`), poziva backend, prikazuje rezultate kao mrežu `ShipCard` kartica (`key={ship.basics.id_brod}`) te poruke za učitavanje, grešku i „nema rezultata”.
- [ ] **Ukupna cijena na kartici kad su zadani datumi** (UC-007, korak 3). Nova stranica izračuna broj dana iz `date_from` i `date_to` u adresi (datumi su uključivi: `do − od + 1`, npr. od 1. do 7. lipnja je 7 dana) i preda ga `ShipCard`-u. Kartica ispod „… po danu” tada iscrta i „… za N dana” (`cijena_dan × N`); bez datuma se taj redak ne iscrtava (`{days && …}`), pa istaknuta plovila na početnoj ostaju kakva jesu. Ukupna cijena obuhvaća samo najam plovila, bez dodatnih usluga. Na stranici s detaljima plovila ukupna cijena se ne prikazuje.
- [ ] **Dodatni filtri na novoj stranici.**
  - Oprema: kućice, popis dohvatiti s `/api/equipment`; svaka označena stavka ide u adresu kao `equipment=<id_opreme>`.
  - Dodatne usluge: kućice, popis dohvatiti s `/api/services`; svaka označena stavka ide u adresu kao `services=<id_dodatne_usluge>`.
  - Najveća cijena po danu: polje `<input type="number" min="0">` (u eurima), u adresi `max_price`.
  - Najmanji broj kabina: polje `<input type="number" min="0">`, u adresi `min_cabins` (0 je dopušteno, npr. gumenjak nema kabina).
  - Prazno polje ili neoznačene kućice znače da se filtar ne primjenjuje i ne šalje u adresu.
  - Za upis i čitanje označenih kućica u adresi vidi napomenu o popisima uz funkciju u `fleetServices.js` (`append` / `getAll`).
  - Promjena filtra ažurira adresu (`setSearchParams`), a stranica ponovno poziva `/api/boats` sa svim filtrima (iz tražilice i dodatnima). Filtre čitati iz adrese, da ostanu nakon osvježavanja i povratka s detalja plovila.
- [ ] **U `App.jsx` zamijeniti `PretragaStranica` novom stranicom.**

---

## Responzivnost (NF-02) — Luka Martinić

NF-02 traži da sučelje radi na računalu, tabletu i mobitelu. Za prvu predaju ne radi se posebna prilagodba, nego samo provjera i popravak onoga što je očito pokvareno. Većina stranica već koristi Bootstrapovu mrežu (`col-md`, `col-lg`, `row-cols-…`), pa se na uskom ekranu sama slaže u jedan stupac.

- [ ] **Provjeriti glavne stranice na uskom ekranu.** U pregledniku F12 → prikaz za uređaje (Ctrl+Shift+M), širine npr. 375 px (mobitel) i 768 px (tablet). Stranice: početna, detalji plovila, pregled plovila (nova stranica), profil, korisnici. Tražiti: vodoravno pomicanje stranice, sadržaj koji izlazi iz ekrana, preklapanje teksta.
- [x] **Javno zaglavlje se ne sklapa na mobitelu.** *(Ian Vrbaslija, uz `PublicHeader.jsx`)* Linkovi „Kategorije plovila”, „Luke polaska”, „Kako rezervirati?” i gumb „Prijava” uvijek su u jednom retku, pa se na uskom ekranu stisnu. Napraviti uz `PublicHeader.jsx` (vidi *Pregled plovila*): dodati gumb ☰ (`navbar-toggler`) i `collapse`, kao što već ima `NavBar.jsx`.
- [ ] **Nova stranica s popisom plovila** neka za kartice koristi istu mrežu kao istaknuta plovila na početnoj (`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`).

---

## Ispitivanje — Tonko Buncuga

Tjedan 7 traži osnovna ispitivanja. Za prvu predaju testovi samo čitaju podatke (`GET`), jer se koristi ista baza kao za demonstraciju; testove koji mijenjaju podatke (npr. `PATCH /api/users/{uuid}`) ostaviti za kasnije ili za zasebnu bazu. Većina ruta još nije na `main`: odmah se može postaviti `pytest`, testirati `/api/health` i pisati ručne scenarije, a testovi za plovila i korisnike pišu se kad te rute dođu na `main`.

- [ ] **Postaviti automatske testove backenda:** `pytest` i FastAPI `TestClient` u mapi `backend/tests/`; `pytest` dodati u `backend/requirements.txt`; u `docs/upute.md` dopisati kako se testovi pokreću.
- [ ] **Testovi backenda** (prijedlog, prema testnim podacima iz `db/migrations/002_test_data.sql`):
  - `/api/health` i `/api/health/db` vraćaju `200`
  - `/api/boats` bez filtara vraća samo aktivna plovila (neaktivni Neptun nije u rezultatima)
  - `/api/boats` s datumima unutar nedostupnosti ne vraća to plovilo (Galeb je nedostupan od 1. 11. 2026. do 31. 3. 2027.)
  - filtri `category`, `port`, `num_of_people`, a kad budu napravljeni i `equipment`, `services`, `max_price`, `min_cabins`
  - samo jedan datum, ili „datum od” nakon „datum do”, vraća `400`
  - `/api/boats/{id}` za postojeće plovilo vraća `basics`, `model`, `port`, `equipment`, `services`, `photos`; za nepostojeće i neaktivno (Neptun) vraća `404`
  - `/api/users` bez prijave vraća `401` (kad Antonija napravi rute)
- [ ] **Ručni scenariji za frontend:** za prijavu, profil (uređivanje imena, prezimena i telefona), upravljanje korisnicima, istaknuta plovila, detalje plovila i pregled plovila zapisati korake i očekivani rezultat, proći ih u pregledniku (i na uskom ekranu, vidi *Responzivnost*) i zapisati stvarni rezultat.
- [ ] **Obavezno uz testiranje ispuniti dokumentaciju:**
  - napisati `docs/5-Ispitivanje.md` (već predviđen u `docs/Home.md`: pristup ispitivanju, stvarni rezultati i poznati nedostaci); upisivati samo testove koji stvarno postoje i rezultate koji su stvarno dobiveni
  - u `docs/2-Analiza-zahtjeva.md`, u tablici sljedivosti, popuniti stupac „Ispitivanje ili provjera” za zahtjeve koji su ispitani (naziv testa ili ručnog scenarija)
  - poznate nedostatke koji se ne poprave do predaje (npr. neispunjene stavke iz ovog dokumenta) navesti u `5-Ispitivanje.md`

---

## Podjela zadataka (prije pretrage)

| Odjeljak u `TODO.md` | Stavke | Tko |
| :--- | :--- | :--- |
| Upravljanje korisnicima: backend | rute `/users`, `alter_user`, pravila, uloge malim slovima | **Antonija Gudelj** (Google prijava) |
| Upravljanje korisnicima: frontend | rušenje `UsersTable` bez telefona | **Ian Vrbaslija** (izrada tog dijela) |
| | krivi link `/login`, ikona Googlea | **Ian Vrbaslija** (prijava, frontend) |
| | adrese API-ja (`/api` svugdje) | **Tonko Buncuga** (setup/devops: Vercel i proxy) |
| Vlastiti profil: frontend | rušenje `ProfileInfo`, natpisi u prozoru | **Ian Vrbaslija** (izrada tog dijela) |
| Istaknuta plovila: backend | spajanje grane, ugniježđeni oblik | **Nikolina Žderić** (plovila, backend) | [x]
| Istaknuta plovila: frontend | ključ `key`, pozadinska slika | **Ana Bartulović** (izrada početne) |
| Detalji plovila | poruka za 404, galerija, gumb „Natrag”, mrtvi kod, rečenica u prozoru | **Ana Bartulović** (izrada stranice) |
| | gumb „Rezerviraj” | kasnije, uz rezervaciju |
| Brisanje izmišljenih podataka | `api/plovila.js`, `privremeno/` | **Ana Bartulović** (izrada tih datoteka) |
| *(izvan dokumenta)* | fotografije u bucket | **Ana Uzelac** (baza) |

## Podjela zadataka (pretraga i pregled plovila)

| Odjeljak u `TODO.md` | Stavke | Tko |
| :--- | :--- | :--- |
| Pregled plovila: backend | proširenje `search_boats` i `/api/boats` (oprema, usluge, cijena, kabine) | **Nikolina Žderić** (plovila, backend) | [x]
| Pregled plovila: frontend | tražilica `SearchBar.jsx` (radi se prije nove stranice) | **Ana Bartulović** (izrada početne) |
| | funkcija u `fleetServices.js`, nova stranica `BoatList.jsx`, dodatni filtri, ukupna cijena, zamjena u `App.jsx` | **Luka Martinić** (pretraga, frontend) |
| | zajedničko zaglavlje `PublicHeader.jsx` (radi se prije nove stranice), uključujući sklapanje na mobitelu | **Ian Vrbaslija** (izrada `NavBar.jsx`, `Layout.jsx`) |
| Responzivnost | provjera stranica, mreža kartica na novoj stranici (sklapanje zaglavlja ide uz `PublicHeader.jsx`) | **Luka Martinić** (pretraga, frontend; prilagodba za mobitel) |
| Ispitivanje | testovi backenda (`pytest`), ručni scenariji za frontend, `5-Ispitivanje.md`, stupac „Ispitivanje ili provjera” u tablici sljedivosti | **Tonko Buncuga** (setup/devops) |

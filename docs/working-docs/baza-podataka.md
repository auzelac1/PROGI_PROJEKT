# Model baze podataka

Tipovi su logički, kao u ER dijagramu. `ID` označava identifikator, `text` niz znakova, a `enum` vrijednost s fiksnog popisa.

## 1. KORISNIK

**Ključ:** `UID`  
**Alternativni ključ:** nema  
**Ograničenje:** `CHECK (uloga IN ('klijent', 'admin', 'djelatnik', 'voditelj'))`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `UID` | `text` | da | Identifikator korisnika koji dolazi od Googlea |
| `uloga` | `enum` | da | klijent, admin, djelatnik ili voditelj; novi korisnik dobiva ulogu klijenta, a prvi administrator određuje se konfiguracijom |
| `ime` | `text` | ne | Ime korisnika; upisuje se pri prijavi ako ga Google pošalje |
| `prezime` | `text` | ne | Prezime korisnika; upisuje se pri prijavi ako ga Google pošalje |
| `email` | `text` | da | Adresa e-pošte |
| `telefon` | `text` | ne | Broj telefona; prazan dok ga korisnik ne unese |

- `ime`, `prezime` i `telefon` obavezni su za potvrdu rezervacije, iako u bazi smiju biti prazni.
- Pri potvrdi rezervacije polja za unos nude se samo za podatke koji nedostaju. Spremljeni podaci prikazuju se uz gumb „Uredi“.
- Ispravak podataka vidi se na svim rezervacijama tog korisnika, jer su podaci spremljeni samo u ovoj tablici.

## 2. MODEL

**Ključ:** `id_model`  
**Alternativni ključ:** `proizvodjac`, `model`  
**Ograničenje:** `CHECK (kategorija IN ('jedrilica', 'motorni brod', 'katamaran', 'ostalo'))`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_model` | `ID` | da | Identifikator modela |
| `tip` | `text` | da | Tip plovila |
| `kategorija` | `enum` | da | Fiksan popis: jedrilica, motorni brod, katamaran ili ostalo |
| `proizvodjac` | `text` | da | Proizvođač plovila |
| `model` | `text` | da | Oznaka modela kod proizvođača |
| `kapacitet` | `integer` | da | Najveći broj osoba |
| `broj_kabina` | `integer` | da | Broj kabina |
| `broj_lezajeva` | `integer` | da | Broj ležajeva |

Brod je instanca modela. Pretpostavljamo da brodovi istog modela imaju jednake tehničke podatke, opremu i dodatne usluge, a razlikuju se po nazivu, godini proizvodnje, luci, cijeni po danu, vremenu preuzimanja i povratka te fotografijama.

## 3. DODATNE_USLUGE

**Ključ:** `id_dodatne_usluge`  
**Alternativni ključ:** `naziv`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_dodatne_usluge` | `ID` | da | Identifikator usluge |
| `naziv` | `text` | da | Naziv usluge, npr. skiper ili završno čišćenje |

Dodatne usluge klijent bira uz rezervaciju i naplaćuju se. Ako se dodatna oprema naplaćuje, npr. SUP daska, vodi se kao dodatna usluga.

## 4. MODEL_USLUGE

**Ključ:** `id_model`, `id_dodatne_usluge`  
**Alternativni ključ:** nema

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_model` | `ID` | da | Model plovila |
| `id_dodatne_usluge` | `ID` | da | Usluga dostupna za taj model |
| `cijena` | `decimal` | da | Cijena usluge za taj model |

## 5. REZERVACIJA_USLUGA

**Ključ:** `id_rezervacije`, `id_dodatne_usluge`  
**Alternativni ključ:** nema

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_rezervacije` | `ID` | da | Rezervacija |
| `id_dodatne_usluge` | `ID` | da | Usluga odabrana uz tu rezervaciju |

Model plovila dobiva se preko rezervacije i broda.

## 6. BROD

**Ključ:** `id_brod`  
**Alternativni ključ:** nema  
**Ograničenje:** `CHECK (vrijeme_preuzimanja < vrijeme_povratka)`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_brod` | `ID` | da | Identifikator broda |
| `id_model` | `ID` | da | Model kojem brod pripada |
| `naziv` | `text` | da | Naziv broda |
| `godina_proizvodnje` | `integer` | da | Godina proizvodnje |
| `id_luka` | `ID` | da | Matična luka |
| `cijena_dan` | `decimal` | da | Cijena najma po danu |
| `vrijeme_preuzimanja` | `time` | da | Fiksno vrijeme preuzimanja tog broda |
| `vrijeme_povratka` | `time` | da | Fiksno vrijeme povratka tog broda |
| `aktivan` | `boolean` | da | Označava je li brod u floti; neaktivan brod nije u pretrazi, a povijest rezervacija ostaje; pri deaktivaciji sustav prikazuje buduće potvrđene rezervacije tog broda, a nakon potvrde administratora otkazuju se odjednom i klijenti dobivaju e-poštu |

Brodovi istog modela međusobno se razlikuju:

| Veza | Tablice | Značenje |
| --- | --- | --- |
| Uz brod (`id_brod`) | `BROD` | Svaki brod ima svoj naziv, godinu proizvodnje, luku, cijenu po danu te vrijeme preuzimanja i povratka. |
| Uz brod (`id_brod`) | `REZERVACIJA` | Rezervira se konkretan brod. |
| Uz brod (`id_brod`) | `NEDOSTUPNOST` | Jedan brod može biti nedostupan dok su ostali brodovi istog modela slobodni. |
| Uz brod (`id_brod`) | `FOTOGRAFIJA` | Svaki brod ima svoje fotografije. |
| Uz model (`id_model`) | `MODEL_USLUGE` | Dodatne usluge i njihove cijene iste su za sve brodove modela. |
| Uz model (`id_model`) | `MODEL_OPREMA` | Oprema je ista za sve brodove modela. |

Tablica `REZERVACIJA_USLUGA` vezana je uz rezervaciju, a time i uz konkretan brod.

## 7. REZERVACIJA

**Ključ:** `id_rezervacije`  
**Alternativni ključ:** nema  
**Ograničenja:**

- `CHECK (datum_preuzimanja <= datum_povratka)`
- `CHECK (status IN ('u tijeku', 'potvrdena', 'otkazana'))`; završena namjerno nije među statusima, jer se računa pri upitu i ne zapisuje u bazu
- jedinstveni indeks na `UID` za retke sa statusom „u tijeku“: korisnik s istim `UID` ne može imati dvije rezervacije u tijeku

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_rezervacije` | `ID` | da | Identifikator rezervacije |
| `UID` | `text` | da | Korisnik koji je napravio rezervaciju |
| `status` | `enum` | da | U bazi: u tijeku, potvrdena ili otkazana |
| `id_brod` | `ID` | da | Rezervirani brod |
| `broj_osoba` | `integer` | da | Broj osoba |
| `datum_preuzimanja` | `date` | da | Datum preuzimanja |
| `datum_povratka` | `date` | da | Datum povratka |
| `vrijeme_nastanak` | `datetime` | da | Vrijeme nastanka rezervacije |
| `id_luka` | `ID` | da | Luka preuzimanja i povrata; kopija matične luke broda u trenutku rezervacije |
| `cijena_uk` | `decimal` | ne | Ukupan iznos; prazan dok je rezervacija u tijeku |

- Jedna rezervacija odnosi se na točno jedan brod.
- Klijent smije imati samo jednu rezervaciju u tijeku. Dok je ima, ne može započeti novu.
- Datumi su uključivi: broj dana = `datum_povratka` − `datum_preuzimanja` + 1.
- Isti brod može krenuti na novi najam najranije dan nakon povratka.
- Završene i otkazane rezervacije ostaju u bazi radi statistike.
- Potvrđena rezervacija prikazuje se kao završena čim prođe vrijeme povrata. To se računa pri svakom upitu i ne zapisuje se u bazu.
- Blokada termina traje 10 minuta. Istek se računa programski kao `vrijeme_nastanak + 10 minuta`.
- Istekle blokade brišu se iz tablice. Isto vrijedi i kad klijent odabere „Odustani“ na rezervaciji u tijeku.
- Ako se rezervacija naknadno ne mijenja, ostaje kakva jest: promjena cjenika ili povlačenje usluge iz ponude ne mijenjaju njezin ukupan iznos ni odabrane dodatne usluge.
- Administrator smije mijenjati datume, dodatne usluge i broj osoba na rezervaciji te je otkazati. Novi datumi ne smiju se preklapati s postojećim rezervacijama ni razdobljima nedostupnosti, a broj osoba ne smije prelaziti kapacitet modela. Mijenjati i otkazati može se samo potvrđena rezervacija koja još nije završena.
- Ako se naknadno promijene datumi ili dodatne usluge, ukupan iznos i dodatne usluge ponovno se određuju po trenutačnom cjeniku i ponudi. Usluga koja više nije u ponudi za taj model uklanja se s rezervacije.
- Promjena broja osoba i otkazivanje ne mijenjaju ukupan iznos (iznos se ponovno računa samo kad se promijeni nešto o čemu cijena ovisi).

## 8. NEDOSTUPNOST

**Ključ:** `id_brod`, `datum_pocetak`  
**Alternativni ključ:** nema  
**Ograničenje:** `CHECK (datum_pocetak <= datum_kraj)`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_brod` | `ID` | da | Nedostupni brod |
| `datum_pocetak` | `date` | da | Početak razdoblja, uključivo |
| `datum_kraj` | `date` | da | Kraj razdoblja, uključivo; brod se može preuzeti najranije sljedeći dan |
| `razlog` | `text` | da | Razlog, npr. servis ili održavanje |

Zauzetost broda provjerava se u tablicama `REZERVACIJA` i `NEDOSTUPNOST`. Termin je zauzet ako za njega postoji potvrđena rezervacija, rezervacija „u tijeku“ mlađa od 10 minuta ili razdoblje nedostupnosti. Način zaštite od istodobnih upisa određuje se u implementaciji.

Kad administrator unese nedostupnost, sustav prikazuje potvrđene rezervacije koje se s njom preklapaju. Nakon njegove potvrde nedostupnost se sprema, a te se rezervacije otkazuju odjednom i klijenti dobivaju e-poštu.

Rezervacija u tijeku koja se preklapa s nedostupnošću, ili je na brodu koji se deaktivira, briše se. Klijent pri potvrdi dobiva poruku da termin više nije dostupan.

## 9. FOTOGRAFIJA

**Ključ:** `id_brod`, `URL_foto`  
**Alternativni ključ:** `id_brod`, `redoslijed`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_brod` | `ID` | da | Brod na fotografiji |
| `URL_foto` | `text` | da | Adresa fotografije |
| `redoslijed` | `integer` | da | Redni broj fotografije unutar jednog broda |

Fotografije se vežu uz brod, pa brodovi istog modela mogu imati različite fotografije.

## 10. LUKA

**Ključ:** `id_luka`  
**Alternativni ključ:** `ime_luka`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_luka` | `ID` | da | Identifikator luke |
| `ime_luka` | `text` | da | Naziv luke |
| `lat` | `decimal` | da | Zemljopisna širina mjesta sastanka s djelatnikom |
| `lng` | `decimal` | da | Zemljopisna dužina mjesta sastanka s djelatnikom |

Koordinate su fiksne za svaku luku i prikazuju se na OpenStreetMap karti.

## 11. OPREMA

**Ključ:** `id_opreme`  
**Alternativni ključ:** `naziv`

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_opreme` | `ID` | da | Identifikator opreme |
| `naziv` | `text` | da | Naziv opreme, npr. klima ili GPS |

Oprema je ono što brod već ima. Nema cijenu i klijent je ne bira.

## 12. MODEL_OPREMA

**Ključ:** `id_model`, `id_opreme`  
**Alternativni ključ:** nema

| Atribut | Tip | Obavezan | Opis |
| --- | --- | --- | --- |
| `id_model` | `ID` | da | Model plovila |
| `id_opreme` | `ID` | da | Oprema koju taj model ima |

## ID-jevi

ID-jevi se dodjeljuju slijedno (+1) i samo rastu. ID se nikad ne koristi ponovno, ni nakon brisanja retka. Iznimka je `UID`, koji dolazi od Googlea.

## Strani ključevi

| Tablica | Strani ključ | Pokazuje na |
| --- | --- | --- |
| `MODEL_USLUGE` | `id_model` | `MODEL` |
| `MODEL_USLUGE` | `id_dodatne_usluge` | `DODATNE_USLUGE` |
| `REZERVACIJA_USLUGA` | `id_rezervacije` | `REZERVACIJA` |
| `REZERVACIJA_USLUGA` | `id_dodatne_usluge` | `DODATNE_USLUGE` |
| `BROD` | `id_model` | `MODEL` |
| `BROD` | `id_luka` | `LUKA` |
| `REZERVACIJA` | `UID` | `KORISNIK` |
| `REZERVACIJA` | `id_brod` | `BROD` |
| `REZERVACIJA` | `id_luka` | `LUKA` |
| `NEDOSTUPNOST` | `id_brod` | `BROD` |
| `FOTOGRAFIJA` | `id_brod` | `BROD` |
| `MODEL_OPREMA` | `id_model` | `MODEL` |
| `MODEL_OPREMA` | `id_opreme` | `OPREMA` |

Kad se rezervacija u tijeku obriše, brišu se i njezini retci u tablici `REZERVACIJA_USLUGA`.

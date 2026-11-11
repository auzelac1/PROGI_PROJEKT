# 2. Analiza zahtjeva

**Cilj:** Iz odobrenog opsega projekta izvesti prepoznatljive, prioritetizirane i provjerljive zahtjeve. Zahtjevi se mogu mijenjati; pri završnoj predaji moraju odražavati dogovorenu aplikaciju. Značajne promjene zabilježite u odjeljku 2.5.

## 2.1 Funkcijski zahtjevi

**Cilj:** Navesti što aplikacija mora omogućiti korisnicima, odakle pojedina mogućnost proizlazi i koji se opažljivi rezultat smatra prihvaćanjem.

Zahtjevi su grupirani prema područjima sustava, a svaki opisuje jedno opažljivo ponašanje. ID zahtjeva ima oblik F-(grupa).(redni broj).

### 2.1.1 Prijava i ovlasti

| ID    | Opis                                                          | Prioritet | Izvor            | Kriteriji prihvaćanja                                               |
| ----- | ------------------------------------------------------------- | --------- | ---------------- | ------------------------------------------------------------------- |
| F-1.1 | Korisnik se prijavljuje putem vanjskog pružatelja identiteta. | Visok     | Pravila kolegija | Uspješna prijava omogućuje radnje dostupne prijavljenim korisnicima |

### 2.1.2 Pretraga i pregled plovila

| ID    | Opis                                                                                                            | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------- | --------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| F-2.1 | Svaki korisnik, neovisno o tome je li prijavljen, može pretraživati plovila prema kriterijima.                  | Visok     | Projektni zadatak | Prikaz plovila koja odgovaraju odabranim kriterijima i slobodna su u cijelom odabranom razdoblju. |
| F-2.2 | Svaki korisnik, neovisno o tome je li prijavljen, može pregledati podatke o plovilu i njegove slobodne termine. | Visok     | Projektni zadatak | Za odabrano plovilo prikazani svi evidentirani podaci i slobodni termini.                         |

### 2.1.3 Izrada rezervacije

| ID    | Opis                                                                                                                                | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                                                                                        |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F-3.1 | Prijavljeni klijent može rezervirati slobodno plovilo za odabrano razdoblje i za određeni broj osoba te uz rezervaciju odabrati dodatne usluge, ali ne smije već imati jednu rezervaciju u tijeku. | Visok     | Projektni zadatak | Rezervacija dobiva status „potvrđena“ i prikazan je ukupni iznos; preklapanje termina, broj osoba veći od kapaciteta i razdoblje u prošlosti nisu dopušteni. |
| F-3.2 | Sustav privremeno zadržava odabrani termin dok klijent dovršava rezervaciju.                                                        | Srednji   | Odluka tima       | Zadržani termin 10 minuta nije dostupan drugim klijentima; nakon isteka roka bez potvrde ponovno je slobodan.                                                |

### 2.1.4 Potvrda i pregled rezervacija (klijent)

| ID    | Opis                                                          | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                       |
| ----- | ------------------------------------------------------------- | --------- | ----------------- | ------------------------------------------------------------------------------------------- |
| F-4.1 | Prijavljeni klijent može pregledati sve vlastite rezervacije. | Visok     | Projektni zadatak | Prikaz samo vlastitih rezervacija klijenta, sa statusom, podacima i ukupnim iznosom.        |
| F-4.2 | Klijent dobiva potvrdu e-poštom da je rezervacija potvrđena.  | Srednji   | Projektni zadatak | Nakon potvrde rezervacije na adresu e-pošte klijenta stiže poruka s podacima o rezervaciji. |

### 2.1.5 Raspored preuzimanja i povrata (djelatnik)

| ID    | Opis                                                                              | Prioritet | Izvor             | Kriteriji prihvaćanja                                                            |
| ----- | --------------------------------------------------------------------------------- | --------- | ----------------- | -------------------------------------------------------------------------------- |
| F-5.1 | Djelatnik i administrator mogu pregledati raspored preuzimanja i povrata plovila. | Visok     | Projektni zadatak | Prikaz svih potvrđenih rezervacija s njihovim detaljima, bez mogućnosti izmjene. |

### 2.1.6 Upravljanje rezervacijama (administrator)

| ID    | Opis                                                                         | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                                                                                          |
| ----- | ---------------------------------------------------------------------------- | --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-6.1 | Administrator može pregledati sve rezervacije te ih izmijeniti ili otkazati. | Visok     | Projektni zadatak | Moguće otkazati i izmjeniti samo potvrđene rezervacije, a izmijena podliježe pravilima izrade rezervacije; korisnik koji nije administrator nema tu mogućnost. |

### 2.1.7 Upravljanje flotom (administrator)

| ID    | Opis                                                                                         | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                    |
| ----- | -------------------------------------------------------------------------------------------- | --------- | ----------------- | ---------------------------------------------------------------------------------------- |
| F-7.1 | Administrator može upravljati flotom: plovilima, opremom, dodatnim uslugama s cijenama i razdobljima nedostupnosti. | Visok | Projektni zadatak | Promjene su odmah vidljive u pretrazi i pregledu plovila; deaktivirano plovilo ne pojavljuje se u pretrazi; pri unosu nedostupnosti ili deaktivaciji prikazuju se pogođene rezervacije, koje se nakon potvrde otkazuju i klijenti dobivaju e-poštu. |

### 2.1.8 Upravljanje korisnicima (administrator)

| ID    | Opis                                                           | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                                             |
| ----- | -------------------------------------------------------------- | --------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| F-8.1 | Administrator može pregledati korisnike i dodijeliti im ulogu. | Visok     | Projektni zadatak | Nova uloga vrijedi od sljedeće prijave korisnika; korisnik kojem uloga (još) nije dodijeljena ima ulogu klijenta. |

### 2.1.9 Statistika i izvoz (voditelj)

| ID    | Opis                                                        | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                                                                  |
| ----- | ----------------------------------------------------------- | --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| F-9.1 | Voditelj može pregledati statistiku poslovanja.             | Srednji   | Projektni zadatak | Prikaz zauzetosti plovila, broja rezervacija po razdobljima, ostvarenog prihoda te najtraženijih kategorija plovila i dodatnih usluga. |
| F-9.2 | Voditelj može izvesti odabrane podatke u standardni format. | Srednji   | Projektni zadatak | Izvezena datoteka otvara se u uobičajenom alatu i sadrži odabrane podatke.                                                             |

### 2.1.10 Vanjske usluge

| ID     | Opis                                                                                      | Prioritet | Izvor             | Kriteriji prihvaćanja                                                                           |
| ------ | ----------------------------------------------------------------------------------------- | --------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| F-10.1 | Sustav putem meteorološkog servisa prikazuje vremensku prognozu za mjesto i termin najma. | Srednji   | Projektni zadatak | Prikaz vremenskih uvjeta. Ako servis nije dostupan, ostatak stranice radi i prikazuje napomenu. |
| F-10.2 | Sustav putem kartografskog servisa prikazuje matičnu luku plovila na karti.               | Visok     | Projektni zadatak | Prikaz matične luke na karti. Ako servis nije dostupan, prikazuje se naziv luke bez karte.      |

## 2.2 Nefunkcijski zahtjevi

**Cilj:** Odrediti važna svojstva kvalitete i uvjete rada odobrene aplikacije na način koji tim može razumno provjeriti.

| ID    | Opis                                                                                                                                 | Prioritet | Izvor             | Način provjere                                                                        |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------------- | ------------------------------------------------------------------------------------- |
| NF-01 | Sustav omogućuje istodobni rad više korisnika, pri čemu istodobne rezervacije istog plovila ne smiju dovesti do preklapanja termina. | Visok     | Projektni zadatak | Test s više istodobnih zahtjeva za isti termin; spremljena je samo jedna rezervacija. |
| NF-02 | Korisničko sučelje je responzivno i prilagođeno radu na računalu, tabletu i mobilnom uređaju.                                        | Visok     | Projektni zadatak | Pregled glavnih stranica na širinama zaslona računala, tableta i mobitela.            |
| NF-03 | Prijava korisnika delegirana je vanjskom pružatelju identiteta.                                                                      | Visok     | Pravila kolegija  | Pregled: aplikacija nema vlastiti obrazac za lozinku i ne pohranjuje lozinke.         |
| NF-04 | Aplikacija je postavljena na javno dostupan poslužitelj, a komunikacija s web preglednikom odvija se putem HTTPS-a.                  | Visok     | Pravila kolegija  | Otvaranje javne adrese; preglednik prikazuje valjanu HTTPS vezu.                      |

## 2.3 Dionici i akteri

**Cilj:** Utvrditi uloge koje utječu na zahtjeve i razlikovati dionike od aktera koji komuniciraju s aplikacijom.

| ID uloge ili aktera               | Odnos prema sustavu                                                                 | Relevantni zahtjevi                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| A-01 Neprijavljeni korisnik       | Pregledava osnovne podatke o plovilima na početnoj stranici.                        | F-2.1 – F-2.2                                                       |
| A-02 Klijent                      | Pretražuje plovila, izrađuje rezervacije i pregledava vlastite rezervacije.         | F-1.1, F-2.1 – F-2.2, F-3.1 – F-3.2, F-4.1 – F-4.2, F-10.1 – F-10.2 |
| A-03 Djelatnik                    | Pregledava raspored preuzimanja i povrata te podatke potrebne za realizaciju najma. | F-1.1, F-2.1 – F-2.2, F-5.1                                         |
| A-04 Voditelj                     | Pregledava statistiku i izvozi odabrane podatke.                                    | F-1.1, F-2.1 – F-2.2, F-9.1 – F-9.2                                 |
| A-05 Administrator                | Upravlja flotom, rezervacijama i korisnicima.                                       | F-1.1, F-2.1 – F-2.2, F-5.1, F-6.1, F-7.1, F-8.1            |
| A-06 Vanjski pružatelj identiteta | Provodi prijavu korisnika (OpenID Connect / OAuth 2.0).                             | F-1.1, NF-03                                                        |
| A-07 Meteorološki servis          | Daje podatke o vremenskoj prognozi.                                                 | F-10.1                                                              |
| A-08 Kartografski servis          | Daje prikaz karte.                                                                  | F-10.2                                                              |

## 2.4 Ograničenja i pretpostavke

**Cilj:** Zabilježiti projektno specifične granice i pretpostavke koje utječu na zahtjeve ili oblikovanje, zajedno s njihovim izvorom i praktičnom posljedicom. Ovo je njihovo mjerodavno mjesto u dokumentaciji.

| ID   | Tip          | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
| ---- | ------------ | --------------------------------- | ----- | --------------------------------- |
| O-01 | Ograničenje  | Sustav podržava rad s jednom charter tvrtkom. | Odluka tima | Model baze nema entitet tvrtke. |
| O-02 | Ograničenje  | Najkraće trajanje najma je jedan dan; iznajmljivanje po satu nije podržano. | Odluka tima | Termini se pohranjuju kao datumi bez sata; provjera zauzetosti i cijena računaju se po danima. |
| O-03 | Ograničenje  | Vrijeme preuzimanja i povrata fiksno je za svako plovilo, a ne za cijelu flotu; preuzimanje je prije povrata. | Odluka tima | Vremena preuzimanja i atributi su plovila |
| O-04 | Ograničenje  | Cijena najma obračunava se po danu, a svaka dodatna usluga naplaćuje se jednokratno po rezervaciji. Ukupan iznos ne mijenja se promjenom cjenika, nego se ponovno računa samo kad se promijene datumi ili dodatne usluge. | Odluka tima | Ukupan iznos sprema se u rezervaciju u trenutku izrade; test: promjena cjenika ne mijenja postojeće rezervacije. |
| O-05 | Ograničenje  | Prvog administratora postavlja developer ručno, pri postavljanju aplikacije. | Odluka tima | Osoba se prijavi preko vanjskog pružatelja identiteta i dobije ulogu klijenta, a developer joj zatim ručno u bazi promijeni ulogu u administratora; ostale uloge dodjeljuje administrator kroz aplikaciju. |
| O-06 | Ograničenje  | Plaćanje nije podržano u sklopu projektnog zadatka. | Projektni zadatak | Nema integracije s platnim servisom; rezervacija je potvrđena bez plaćanja. |
| O-07 | Ograničenje  | Djelatnik, voditelj ili administrator koji želi rezervirati plovilo prijavljuje se klijentskim računom. | Odluka tima | Jedan korisnik ima jednu ulogu; rezervaciju može izraditi samo uloga klijenta. |
| O-08 | Ograničenje  | Jedna rezervacija odnosi se na jedno plovilo. | Odluka tima | Rezervacija ima jednu poveznicu na plovilo. |
| O-09 | Ograničenje  | Klijent smije imati samo jednu rezervaciju u tijeku. | Odluka tima | Provjera pri izradi rezervacije; pokušaj druge rezervacije odbija se s porukom. |
| O-10 | Ograničenje  | Datumi su uključivi, a isto plovilo može krenuti na novi najam najranije dan nakon povratka. | Odluka tima | Provjera preklapanja koristi uključive datume; test rubnog slučaja (povratak i novi najam isti dan). |
| O-11 | Ograničenje  | Kategorije plovila su fiksan popis. | Odluka tima | Kategorije su unaprijed upisane u bazu; administrator ih ne uređuje. |
| O-12 | Ograničenje  | Rezervaciju može otkazati samo administrator. | Odluka tima | Klijent nema opciju otkazivanja. |
| P-01 | Pretpostavka | Plovila istog modela imaju jednake tehničke podatke, opremu i dodatne usluge s istim cijenama. | Odluka tima | Tehnički podaci, oprema i usluge vezani su uz model, a ne uz pojedino plovilo. |
| P-02 | Pretpostavka | Lokacija preuzimanja i povrata je matična luka plovila, s jednom fiksnom točkom sastanka po luci. | Odluka tima | Luka ima fiksne koordinate koje se prikazuju na karti (F-10.2); nema zasebne lokacije preuzimanja. |
| P-03 | Pretpostavka | Plovilo se vraća na vrijeme, pa se najam smatra završenim čim prođe vrijeme povrata. | Odluka tima | Status najma računa se iz datuma i vremena povrata; nema ručnog potvrđivanja povrata. |

## 2.5 Značajne promjene zahtjeva

**Cilj:** Sačuvati razlog promjena koje mijenjaju dogovoreni opseg, prioritet ili kriterije prihvaćanja, uz istodobno održavanje prethodnih zahtjeva ažurnima.

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| ----- | ----------- | ----------------- | -------------------- |

## 2.6 Sljedivost zahtjeva

**Cilj:** Osigurati dvosmjernu sljedivost — povezati zahtjeve s opisanim ponašanjem, dijelovima sustava koji ih ostvaruju te ispitivanjem ili drugom provjerom.

| ID zahtjeva | Obrazac uporabe / modul        | Arhitekturna realizacija | Ispitivanje ili provjera |
| ----------- | ------------------------------ | ------------------------ | ------------------------ |
| F-1.1       | Prijava i ovlasti              |                          |                          |
| F-2.1       | Pretraga i pregled plovila     |                          |                          |
| F-2.2       | Pretraga i pregled plovila     |                          |                          |
| F-3.1       | Izrada rezervacije             |                          |                          |
| F-3.2       | Izrada rezervacije             |                          |                          |
| F-4.1       | Potvrda i pregled rezervacija  |                          |                          |
| F-4.2       | Potvrda i pregled rezervacija  |                          |                          |
| F-5.1       | Raspored preuzimanja i povrata |                          |                          |
| F-6.1       | Upravljanje rezervacijama      |                          |                          |
| F-7.1       | Upravljanje flotom             |                          |                          |
| F-7.2       | Upravljanje flotom             |                          |                          |
| F-8.1       | Upravljanje korisnicima        |                          |                          |
| F-9.1       | Statistika i izvoz             |                          |                          |
| F-9.2       | Statistika i izvoz             |                          |                          |
| F-10.1      | Vanjske usluge                 |                          |                          |
| F-10.2      | Vanjske usluge                 |                          |                          |
| NF-01       |                                |                          |                          |
| NF-02       |                                |                          |                          |
| NF-03       |                                |                          |                          |
| NF-04       |                                |                          |                          |

## 2.7 Pregled zahtjeva

**Cilj:** Zabilježiti važne povratne informacije o zahtjevima i odluke koje iz njih proizlaze na dvije formalne kontrolne točke projekta, u 7. i 14. tjednu.

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --------------- | ------------------------------ | ---------------------------- |
| Iteracija 1     |                                |                              |
| Demo 2          |                                |                              |
| Završni pregled |                                |                              |

---

> **Završna provjera:** Zahtjevi su aktualni, provjerljivi i povezani. Svaki važan zahtjev moguće je pratiti od njegova opisa i ponašanja preko mjesta realizacije u sustavu do odgovarajućeg ispitivanja ili druge provjere. Poveznice koriste stvarne identifikatore i nazive iz projektne dokumentacije.

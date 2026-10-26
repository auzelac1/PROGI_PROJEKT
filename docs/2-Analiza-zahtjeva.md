# 2. Analiza zahtjeva

**Cilj:** Iz odobrenog opsega projekta izvesti prepoznatljive, prioritetizirane i provjerljive zahtjeve. Zahtjevi se mogu mijenjati; pri završnoj predaji moraju odražavati dogovorenu aplikaciju. Značajne promjene zabilježite u odjeljku 2.5.

## 2.1 Funkcijski zahtjevi

**Cilj:** Navesti što aplikacija mora omogućiti korisnicima, odakle pojedina mogućnost proizlazi i koji se opažljivi rezultat smatra prihvaćanjem.

Zahtjevi su grupirani prema područjima sustava, a svaki opisuje jedno opažljivo ponašanje. ID zahtjeva ima oblik F-(grupa).(redni broj).

### 2.1.1 Prijava i ovlasti

| ID    | Opis                                                                                         | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | -------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-1.1 | Korisnik se prijavljuje putem vanjskog pružatelja identiteta (OpenID Connect ili OAuth 2.0). |           |       |                       |
| F-1.2 | Svaki novoregistrirani korisnik automatski dobiva ulogu klijenta.                            |           |       |                       |

### 2.1.2 Pretraga plovila

| ID    | Opis                                                                                                                                                         | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----- | --------------------- |
| F-2.1 | Prijavljeni korisnik može pretražiti plovila prema terminu; prikazuju se samo plovila slobodna u cijelom odabranom razdoblju.                                |           |       |                       |
| F-2.2 | Prijavljeni korisnik može pretražiti plovila prema lokaciji polaska.                                                                                         |           |       |                       |
| F-2.3 | Prijavljeni korisnik može pretražiti plovila prema vrsti plovila.                                                                                            |           |       |                       |
| F-2.4 | Prijavljeni korisnik može pretražiti plovila prema broju osoba; prikazuju se plovila kapaciteta jednakog ili većeg od broja osoba.                           |           |       |                       |
| F-2.5 | Prijavljeni korisnik može pretražiti plovila prema cijeni najma u rasponu od–do.                                                                             |           |       |                       |
| F-2.6 | Prijavljeni korisnik može pretražiti plovila prema broju kabina.                                                                                             |           |       |                       |
| F-2.7 | Prijavljeni korisnik može pretražiti plovila prema opremi.                                                                                                   |           |       |                       |
| F-2.8 | Prijavljeni korisnik može pretražiti plovila prema dodatnim uslugama; svako plovilo ima vlastiti popis usluga, a filtrirati je moguće po najčešćim uslugama. |           |       |                       |

### 2.1.3 Pregled plovila

| ID    | Opis                                                                                                                          | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-3.1 | Korisnik može na početnoj stranici pregledati osnovne podatke o plovilima neovisno o tome je li prijavljen.                   |           |       |                       |
| F-3.2 | Prijavljeni korisnik može pregledati fotografije plovila.                                                                     |           |       |                       |
| F-3.3 | Prijavljeni korisnik može pregledati cijenu najma plovila.                                                                    |           |       |                       |
| F-3.4 | Prijavljeni korisnik može pregledati popis dodatnih usluga plovila s cijenama (cijene usluga razlikuju se po modelu plovila). |           |       |                       |
| F-3.5 | Prijavljeni korisnik može pregledati slobodne termine plovila.                                                                |           |       |                       |

### 2.1.4 Izrada rezervacije

| ID     | Opis                                                                                                                                                                                        | Prioritet | Izvor | Kriteriji prihvaćanja |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-4.1  | Prijavljeni klijent može izraditi rezervaciju odabirom plovila, razdoblja najma (datum preuzimanja i povrata) i broja osoba.                                                                |           |       |                       |
| F-4.2  | Klijent pri rezerviranju može odabrati dodatne usluge iz popisa odabranog plovila, uz prikaz njihovih cijena.                                                                               |           |       |                       |
| F-4.3  | Plovila može rezervirati samo klijent.                                                                                                                                                      |           |       |                       |
| F-4.4  | Pokušaj rezerviranja bez ovlasti nije moguć (sustav prikazuje poruku ili sučelje tu mogućnost ne nudi).                                                                                     |           |       |                       |
| F-4.5  | Nakon klika na „Nastavi“ sustav izrađuje rezervaciju sa statusom „u tijeku“ i privremeno blokira termin na 10 minuta.                                                                       |           |       |                       |
| F-4.6  | Tijekom blokade termin se drugim klijentima ne prikazuje kao slobodan i ne mogu ga rezervirati; ako ga pokušaju odabrati, sustav ih obavještava da termin nije dostupan.                    |           |       |                       |
| F-4.7  | Ako rok blokade istekne bez potvrde, sustav briše rezervaciju i oslobađa termin.                                                                                                            |           |       |                       |
| F-4.8  | Ako više klijenata istodobno pokuša rezervirati isti termin, prednost ima klijent koji je prvi kliknuo „Nastavi“.                                                                           |           |       |                       |
| F-4.9  | Ako klijent potvrdi rezervaciju unutar 10 minuta, a pravila rezervacije su zadovoljena, sustav je automatski potvrđuje (status „potvrđena“).                                                |           |       |                       |
| F-4.10 | Ukupna cijena rezervacije jednaka je cijeni najma plovila po danu × broj dana najma + zbroj cijena odabranih dodatnih usluga; svaka dodatna usluga naplaćuje se jednokratno po rezervaciji. |           |       |                       |

### 2.1.5 Pravila i podaci rezervacije

| ID    | Opis                                                                                                                 | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | -------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-5.1 | Sustav ne dopušta rezervaciju plovila u terminu koji se preklapa s drugom rezervacijom ili razdobljem nedostupnosti. |           |       |                       |
| F-5.2 | Sustav jednoznačno vodi zauzetost plovila (potvrđene rezervacije, blokade u tijeku i razdoblja nedostupnosti).       |           |       |                       |
| F-5.3 | Broj osoba u rezervaciji ne smije premašiti kapacitet plovila.                                                       |           |       |                       |
| F-5.4 | Početak razdoblja najma mora biti prije kraja i ne smije biti u prošlosti.                                           |           |       |                       |
| F-5.5 | Sustav vodi status svake rezervacije: u tijeku, potvrđena, otkazana, završen najam.                                  |           |       |                       |
| F-5.6 | Podatke o klijentu (ime i prezime, adresa e-pošte, broj telefona) sustav preuzima iz korisničkog računa.             |           |       |                       |

### 2.1.6 Potvrda i pregled rezervacija (klijent)

| ID    | Opis                                                                                                      | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | --------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-6.1 | Nakon potvrde rezervacije klijent može pregledati podatke o rezervaciji i ukupni iznos.                   |           |       |                       |
| F-6.2 | Sustav klijentu automatski šalje potvrdu rezervacije e-poštom.                                            |           |       |                       |
| F-6.3 | Klijent može pregledati popis vlastitih rezervacija (potvrđene, otkazane i završene).                     |           |       |                       |
| F-6.4 | Klijent može za svaku vlastitu rezervaciju pregledati podatke i ukupni iznos.                             |           |       |                       |
| F-6.5 | Klijent automatski dobiva e-poštu od sustava ako se njegova rezervacija otkaže, s povratnom informacijom. |           |       |                       |

### 2.1.7 Raspored preuzimanja i povrata (djelatnik)

| ID    | Opis                                                                                                                                                                                     | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-7.1 | Djelatnik i administrator mogu pregledati raspored preuzimanja i povrata plovila (samo za čitanje).                                                                                      |           |       |                       |
| F-7.2 | Za svaku potvrđenu rezervaciju raspored prikazuje jedinstveni identifikator, plovilo, matičnu luku, datum i vrijeme preuzimanja i povrata, odabrane dodatne usluge, cijenu i broj osoba. |           |       |                       |
| F-7.3 | Za svaku potvrđenu rezervaciju raspored prikazuje osnovne podatke o klijentu (ime i prezime, broj telefona, adresa e-pošte).                                                             |           |       |                       |

### 2.1.8 Upravljanje rezervacijama (administrator)

| ID    | Opis                                                                                       | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | ------------------------------------------------------------------------------------------ | --------- | ----- | --------------------- |
| F-8.1 | Administrator može pregledati sve rezervacije.                                             |           |       |                       |
| F-8.2 | Administrator može ručno otkazati rezervaciju na upit klijenta ili uslijed hitnog slučaja. |           |       |                       |
| F-8.3 | Rezervaciju može otkazati isključivo administrator.                                        |           |       |                       |
| F-8.4 | Administrator može urediti rezervaciju (promjena datuma preuzimanja i završetka).          |           |       |                       |
| F-8.5 | Uređivanje rezervacije podliježe istim pravilima kao izrada rezervacije.                   |           |       |                       |

### 2.1.9 Upravljanje flotom (administrator)

| ID    | Opis                                                                                                                            | Prioritet | Izvor | Kriteriji prihvaćanja |
| ----- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-9.1 | Administrator može pregledati flotu.                                                                                            |           |       |                       |
| F-9.2 | Administrator može dodati plovilo.                                                                                              |           |       |                       |
| F-9.3 | Administrator može izmijeniti plovilo.                                                                                          |           |       |                       |
| F-9.4 | Administrator može dodati opremu plovila.                                                                                       |           |       |                       |
| F-9.5 | Administrator može izmijeniti opremu plovila.                                                                                   |           |       |                       |
| F-9.6 | Administrator može definirati dodatne usluge za pojedinačno plovilo, s cijenama (cijene usluga razlikuju se po modelu plovila). |           |       |                       |
| F-9.7 | Administrator može evidentirati razdoblje kada plovilo nije raspoloživo zbog servisa, održavanja i sl.                          |           |       |                       |

### 2.1.10 Upravljanje korisnicima (administrator)

| ID     | Opis                                                                                                                                        | Prioritet | Izvor | Kriteriji prihvaćanja |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-10.1 | Administrator može pregledati popis svih registriranih korisnika (klijenti, djelatnici, voditelji i administratori).                        |           |       |                       |
| F-10.2 | Administrator može dodijeliti ulogu korisniku (djelatnik, voditelj, administrator).                                                         |           |       |                       |
| F-10.3 | Administrator može promijeniti ulogu korisnika.                                                                                             |           |       |                       |
| F-10.4 | Promjena uloge mijenja funkcionalnosti dostupne korisniku; osvježenje izgleda i funkcionalnosti aplikacije događa se pri sljedećoj prijavi. |           |       |                       |

### 2.1.11 Statistika i izvoz (voditelj)

| ID     | Opis                                                                                                          | Prioritet | Izvor | Kriteriji prihvaćanja |
| ------ | ------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-11.1 | Voditelj može pregledati zauzetost pojedinih plovila.                                                         |           |       |                       |
| F-11.2 | Voditelj može pregledati broj rezervacija po razdobljima.                                                     |           |       |                       |
| F-11.3 | Voditelj može pregledati ostvareni prihod.                                                                    |           |       |                       |
| F-11.4 | Voditelj može pregledati najtraženije kategorije plovila.                                                     |           |       |                       |
| F-11.5 | Voditelj može pregledati najtraženije dodatne usluge.                                                         |           |       |                       |
| F-11.6 | Voditelj može odabrane podatke iz baze izvesti u standardni format za daljnju analizu (npr. xlsx, json, csv). |           |       |                       |

### 2.1.12 Vanjske usluge

| ID     | Opis                                                                                                                                                      | Prioritet | Izvor | Kriteriji prihvaćanja |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----- | --------------------- |
| F-12.1 | Sustav putem meteorološkog servisa prikazuje podatke o vremenskoj prognozi (temperatura, vjetar, ostali vremenski uvjeti) za mjesto i termin rezervacije. |           |       |                       |
| F-12.2 | Sustav putem kartografskog servisa prikazuje položaj matične luke i lokacije preuzimanja plovila.                                                         |           |       |                       |

## 2.2 Nefunkcijski zahtjevi

**Cilj:** Odrediti važna svojstva kvalitete i uvjete rada odobrene aplikacije na način koji tim može razumno provjeriti.

| ID    | Opis                                                                                                                                 | Prioritet | Izvor | Način provjere |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----- | -------------- |
| NF-01 | Sustav omogućuje istodobni rad više korisnika, pri čemu istodobne rezervacije istog plovila ne smiju dovesti do preklapanja termina. |           |       |                |
| NF-02 | Korisničko sučelje je responzivno i prilagođeno radu na računalu, tabletu i mobilnom uređaju.                                        |           |       |                |
| NF-03 | Prijava korisnika delegirana je vanjskom pružatelju identiteta.                                                                      |           |       |                |
| NF-04 | Aplikacija je postavljena na javno dostupan poslužitelj, a komunikacija s web preglednikom odvija se putem HTTPS-a.                  |           |       |                |
| NF-05 | Podaci se trajno pohranjuju u bazi podataka.                                                                                         |           |       |                |
| NF-06 | Pohranjuju se isključivo osobni podaci nužni za rad sustava.                                                                         |           |       |                |
| NF-07 | Klijent vidi samo vlastite podatke, a djelatnici samo podatke potrebne za realizaciju najma.                                         |           |       |                |
| NF-08 | Ograničenja prema ulozi provjeravaju se na poslužitelju.                                                                             |           |       |                |

## 2.3 Dionici i akteri

**Cilj:** Utvrditi uloge koje utječu na zahtjeve i razlikovati dionike od aktera koji komuniciraju s aplikacijom.

| ID uloge ili aktera               | Odnos prema sustavu                                                                 | Relevantni zahtjevi                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| A-01 Neprijavljeni korisnik       | Pregledava osnovne podatke o plovilima na početnoj stranici.                        | F-3.1                                                                                                      |
| A-02 Klijent                      | Pretražuje plovila, izrađuje rezervacije i pregledava vlastite rezervacije.         | F-1.1 – F-1.2, F-2.1 – F-2.8, F-3.2 – F-3.5, F-4.1 – F-4.10, F-5.1 – F-5.6, F-6.1 – F-6.5, F-12.1 – F-12.2 |
| A-03 Djelatnik                    | Pregledava raspored preuzimanja i povrata te podatke potrebne za realizaciju najma. | F-1.1, F-2.1 – F-2.8, F-3.2 – F-3.5, F-7.1 – F-7.3                                                         |
| A-04 Voditelj                     | Pregledava statistiku i izvozi odabrane podatke.                                    | F-1.1, F-2.1 – F-2.8, F-3.2 – F-3.5, F-11.1 – F-11.6                                                       |
| A-05 Administrator                | Upravlja flotom, rezervacijama i korisnicima.                                       | F-1.1, F-2.1 – F-2.8, F-3.2 – F-3.5, F-7.1 – F-7.3, F-8.1 – F-8.5, F-9.1 – F-9.7, F-10.1 – F-10.4          |
| A-06 Vanjski pružatelj identiteta | Provodi prijavu korisnika (OpenID Connect / OAuth 2.0).                             | F-1.1, NF-03                                                                                               |
| A-07 Meteorološki servis          | Daje podatke o vremenskoj prognozi.                                                 | F-12.1                                                                                                     |
| A-08 Kartografski servis          | Daje prikaz karte.                                                                  | F-12.2                                                                                                     |

## 2.4 Ograničenja i pretpostavke

**Cilj:** Zabilježiti projektno specifične granice i pretpostavke koje utječu na zahtjeve ili oblikovanje, zajedno s njihovim izvorom i praktičnom posljedicom. Ovo je njihovo mjerodavno mjesto u dokumentaciji.

| ID  | Tip | Opis ograničenja ili pretpostavke                                                                       | Izvor | Inženjerska posljedica / Provjera |
| --- | --- | ------------------------------------------------------------------------------------------------------- | ----- | --------------------------------- |
|     |     | Sustav podrazumijeva rad s isključivo jednom charter tvrtkom.                                           |       |                                   |
|     |     | Najkraće trajanje najma je jedan dan; iznajmljivanje po satu nije podržano.                             |       |                                   |
|     |     | Rezervacija se preuzima u fiksnom jutarnjem terminu, a povrat je u fiksnom popodnevnom terminu.         |       |                                   |
|     |     | Cijena najma obračunava se po danu, a svaka dodatna usluga naplaćuje se jednokratno po rezervaciji.     |       |                                   |
|     |     | Prvi administrator određuje se konfiguracijom sustava (pri postavljanju aplikacije).                    |       |                                   |
|     |     | Plaćanje nije podržano u sklopu projektnog zadatka.                                                     |       |                                   |
|     |     | Djelatnik, voditelj ili administrator koji želi rezervirati plovilo prijavljuje se klijentskim računom. |       |                                   |

## 2.5 Značajne promjene zahtjeva

**Cilj:** Sačuvati razlog promjena koje mijenjaju dogovoreni opseg, prioritet ili kriterije prihvaćanja, uz istodobno održavanje prethodnih zahtjeva ažurnima.

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| ----- | ----------- | ----------------- | -------------------- |

## 2.6 Sljedivost zahtjeva

**Cilj:** Osigurati dvosmjernu sljedivost — povezati zahtjeve s opisanim ponašanjem, dijelovima sustava koji ih ostvaruju te ispitivanjem ili drugom provjerom.

| ID zahtjeva | Obrazac uporabe / modul        | Arhitekturna realizacija | Ispitivanje ili provjera |
| ----------- | ------------------------------ | ------------------------ | ------------------------ |
| F-1.1       | Prijava i ovlasti              |                          |                          |
| F-1.2       | Prijava i ovlasti              |                          |                          |
| F-2.1       | Pretraga plovila               |                          |                          |
| F-2.2       | Pretraga plovila               |                          |                          |
| F-2.3       | Pretraga plovila               |                          |                          |
| F-2.4       | Pretraga plovila               |                          |                          |
| F-2.5       | Pretraga plovila               |                          |                          |
| F-2.6       | Pretraga plovila               |                          |                          |
| F-2.7       | Pretraga plovila               |                          |                          |
| F-2.8       | Pretraga plovila               |                          |                          |
| F-3.1       | Pregled plovila                |                          |                          |
| F-3.2       | Pregled plovila                |                          |                          |
| F-3.3       | Pregled plovila                |                          |                          |
| F-3.4       | Pregled plovila                |                          |                          |
| F-3.5       | Pregled plovila                |                          |                          |
| F-4.1       | Izrada rezervacije             |                          |                          |
| F-4.2       | Izrada rezervacije             |                          |                          |
| F-4.3       | Izrada rezervacije             |                          |                          |
| F-4.4       | Izrada rezervacije             |                          |                          |
| F-4.5       | Izrada rezervacije             |                          |                          |
| F-4.6       | Izrada rezervacije             |                          |                          |
| F-4.7       | Izrada rezervacije             |                          |                          |
| F-4.8       | Izrada rezervacije             |                          |                          |
| F-4.9       | Izrada rezervacije             |                          |                          |
| F-4.10      | Izrada rezervacije             |                          |                          |
| F-5.1       | Pravila i podaci rezervacije   |                          |                          |
| F-5.2       | Pravila i podaci rezervacije   |                          |                          |
| F-5.3       | Pravila i podaci rezervacije   |                          |                          |
| F-5.4       | Pravila i podaci rezervacije   |                          |                          |
| F-5.5       | Pravila i podaci rezervacije   |                          |                          |
| F-5.6       | Pravila i podaci rezervacije   |                          |                          |
| F-6.1       | Potvrda i pregled rezervacija  |                          |                          |
| F-6.2       | Potvrda i pregled rezervacija  |                          |                          |
| F-6.3       | Potvrda i pregled rezervacija  |                          |                          |
| F-6.4       | Potvrda i pregled rezervacija  |                          |                          |
| F-6.5       | Potvrda i pregled rezervacija  |                          |                          |
| F-7.1       | Raspored preuzimanja i povrata |                          |                          |
| F-7.2       | Raspored preuzimanja i povrata |                          |                          |
| F-7.3       | Raspored preuzimanja i povrata |                          |                          |
| F-8.1       | Upravljanje rezervacijama      |                          |                          |
| F-8.2       | Upravljanje rezervacijama      |                          |                          |
| F-8.3       | Upravljanje rezervacijama      |                          |                          |
| F-8.4       | Upravljanje rezervacijama      |                          |                          |
| F-8.5       | Upravljanje rezervacijama      |                          |                          |
| F-9.1       | Upravljanje flotom             |                          |                          |
| F-9.2       | Upravljanje flotom             |                          |                          |
| F-9.3       | Upravljanje flotom             |                          |                          |
| F-9.4       | Upravljanje flotom             |                          |                          |
| F-9.5       | Upravljanje flotom             |                          |                          |
| F-9.6       | Upravljanje flotom             |                          |                          |
| F-9.7       | Upravljanje flotom             |                          |                          |
| F-10.1      | Upravljanje korisnicima        |                          |                          |
| F-10.2      | Upravljanje korisnicima        |                          |                          |
| F-10.3      | Upravljanje korisnicima        |                          |                          |
| F-10.4      | Upravljanje korisnicima        |                          |                          |
| F-11.1      | Statistika i izvoz             |                          |                          |
| F-11.2      | Statistika i izvoz             |                          |                          |
| F-11.3      | Statistika i izvoz             |                          |                          |
| F-11.4      | Statistika i izvoz             |                          |                          |
| F-11.5      | Statistika i izvoz             |                          |                          |
| F-11.6      | Statistika i izvoz             |                          |                          |
| F-12.1      | Vanjske usluge                 |                          |                          |
| F-12.2      | Vanjske usluge                 |                          |                          |
| NF-01       |                                |                          |                          |
| NF-02       |                                |                          |                          |
| NF-03       |                                |                          |                          |
| NF-04       |                                |                          |                          |
| NF-05       |                                |                          |                          |
| NF-06       |                                |                          |                          |
| NF-07       |                                |                          |                          |
| NF-08       |                                |                          |                          |

## 2.7 Pregled zahtjeva

**Cilj:** Zabilježiti važne povratne informacije o zahtjevima i odluke koje iz njih proizlaze na dvije formalne kontrolne točke projekta, u 7. i 14. tjednu.

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --------------- | ------------------------------ | ---------------------------- |
| Iteracija 1     |                                |                              |
| Demo 2          |                                |                              |
| Završni pregled |                                |                              |

---

> **Završna provjera:** Zahtjevi su aktualni, provjerljivi i povezani. Svaki važan zahtjev moguće je pratiti od njegova opisa i ponašanja preko mjesta realizacije u sustavu do odgovarajućeg ispitivanja ili druge provjere. Poveznice koriste stvarne identifikatore i nazive iz projektne dokumentacije.

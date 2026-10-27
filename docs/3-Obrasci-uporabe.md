# 3. Obrasci uporabe

**Cilj:** Prikazati glavne interakcije između aktera aplikacije i sustava. Opišite kako akter ostvaruje cilj i što se događa kada važan korak ne uspije. Interakcije temeljite na odobrenim zahtjevima i ažurirajte ih kako se aplikacija razvija.

## 3.1 Dijagram obrazaca uporabe

**Cilj:** Prikazati granicu sustava, relevantne aktere i njihove glavne ciljeve u **preglednom UML dijagramu obrazaca uporabe**. Ako je za razumijevanje pojedinog dijela sustava potrebno prikazati više detalja, taj dio izdvojite u dodatni usmjereni dijagram. Dodatni dijagrami trebaju produbiti dio preglednog modela, a ne stvarati nepovezane ili duplicirane prikaze istog sustava.

[Ovdje umetnuti sliku dijagrama]

**Slika 3.1.** [naziv slike]

**PlantUML izvor:** [poveznica na .puml datoteku]

**Provjera dijagrama:** Prikažite prepoznate uloge koje **komuniciraju s aplikacijom**, a ne dionike koji s njom nemaju interakciju. Svaki glavni korisnički cilj mora imati pridruženog aktera; uključeni obrazac uporabe može se dosegnuti preko drugog obrasca uporabe bez vlastite izravne veze s akterom. `<<include>>` i `<<extend>>` koristite samo kada odnos odgovara stvarnom ponašanju.

## 3.2 Specifikacije obrazaca uporabe

**Cilj:** Za svaki obrazac uporabe iz dijagrama objasniti cilj aktera, uobičajenu interakciju s aplikacijom i važne alternative. Jednostavne obrasce uporabe opišite kratko; proširite one kod kojih alternative, vanjske ovisnosti ili posljedice zahtijevaju dodatno objašnjenje.

**Za svaki obrazac uporabe koristite jednu okomitu tablicu.** Navedite samo onoliko pojedinosti koliko interakcija zahtijeva; neprimjenjivu alternativu izostavite umjesto da je popunjavate samo radi forme.

### UC-001: Izrada rezervacije

| Element specifikacije             | Opis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primarni akter**                | Klijent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Povezani zahtjevi**             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Preduvjeti**                    | Klijent je prijavljen. Korisnik ima ulogu klijenta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Glavni uspješni tok**           | 1. Klijent odabire plovilo i slobodan termin te upisuje broj osoba.<br>2. Odabire „Nastavi“, čime dobiva privremenu blokadu termina – u bazi podataka radi se privremena rezervacija sa statusom „u tijeku“.<br>3. Odabir dodatnih usluga.<br>4. Potvrda rezervacije odabirom „Rezerviraj“.<br>5. Privremena rezervacija mijenja status u „potvrđena“.<br>6. Klijent dobiva obavijest o potvrdi rezervacije e-poštom.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Alternativni tokovi / Iznimke** | **2a — Broj osoba:** Klijent upisuje broj osoba veći od kapaciteta plovila, stoga odabirom „Nastavi“ dobiva obavijest u aplikaciji da broj osoba nadmašuje kapacitet plovila. Ne dobiva privremenu blokadu termina (privremenu rezervaciju) – termin se nastavlja prikazivati kao slobodan ostalim klijentima. Isti klijent ima mogućnost ispraviti broj osoba i pokušati ponovno kliknuti „Nastavi“.<br>**2b — Termin u međuvremenu blokiran:** Drugi klijent je prije kliknuo „Nastavi“ za isto plovilo i isti termin. Klijentu se javlja da je termin zauzet (jer je započela privremena blokada za drugog klijenta) te ne dobiva privremenu blokadu. Klijent može i dalje odabrati drugi termin ili drugo plovilo.<br>**4a — Potvrda rezervacije nakon isteka blokade:** Prošlo je više od 10 min od klika „Nastavi“ bez potvrde rezervacije. Sustav briše privremenu rezervaciju i oslobađa termin. Javlja klijentu da je privremena blokada istekla. Klijent mora ponovno započeti rezervaciju – termin može u međuvremenu postati zauzet. |
| **Posljedice (ishod)**            | • U bazi podataka postoji nova rezervacija sa statusom „potvrđena“.<br>• Termin je zauzet za ostale klijente.<br>• Klijent je dobio potvrdu e-poštom i može rezervaciju vidjeti među svojim rezervacijama.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### UC-002: Pregled svih rezervacija

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                | Administator |
| **Povezani zahtjevi**             | F-8.1 |
| **Preduvjeti**                    | Korisnik mora biti prijavljen u sustav i dodijeljena mu je uloga administratora. |
| **Glavni uspješni tok**           | 1. Administrator otvara stranicu s popisom svih rezervacija.<br>2. Aplikacija dohvaća i prikazuje sve rezervacije osim onih označenih kao u tijeku.<br>3. Administrator odabire rezervaciju za koju želi vidjeti pojedinosti.<br>4. Aplikacija prikazuje pojedinosti o odabranoj rezervaciji i dostupne radnje za upravljanje istom. |
| **Alternativni tokovi / Iznimke** | **2a — Nema zabilježenih rezervacija:** Aplikacija prikazuje poruku kako trenutačno nema zabilježenih rezervacija. |
| **Posljedice (ishod)**            | Administrator može pregledati rezervacije i njihove pojedinosti. |

### UC-003: Otkazivanje rezervacije

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                | Administator     |
| **Povezani zahtjevi**             | F-6.5, F-8.2, F-8.3     |
| **Preduvjeti**                    | Korisnik mora biti prijavljen u sustav, dodijeljena mu je uloga administratora i postoji rezervacija koju je moguće otkazati.     |
| **Glavni uspješni tok**           | 1. Administrator otvara stranicu s popisom svih rezervacija.<br>2. Aplikacija dohvaća i prikazuje sve rezervacije osim onih označenih kao u tijeku.<br>3. Administrator odabire rezervaciju koju želi otkazati.<br>4. Aplikacija prikazuje pojedinosti o odabranoj rezervaciji i dostupne radnje za upravljanje istom.<br>5. Administrator odabire radnju otkazivanja rezervacije.<br>6. Aplikacija traži potvrdu radnje otkazivanja.<br>7. Administrator potvrđuje otkazivanje.<br>8. Aplikacija provjerava ovlasti, mijenja status rezervacije, obavještava korisnika o novom statusu i prikazuje novi status.     |
| **Alternativni tokovi / Iznimke** | **2a — Nema zabilježenih rezervacija:** Aplikacija prikazuje poruku kako trenutačno nema zabilježenih rezervacija.<br>**4a — Odabranu rezervaciju nije moguće otkazati:** Odabrana rezervacija već je otkazana ili završena te za nju nije ponuđena radnja otkazivanja.<br>**7a — Administrator nije potvrdio otkazivanje:** Rezervacija zadržava svoj početni status.<br>**8a — Nedovoljne ovlasti:** Aplikacija ne otkazuje rezervaciju i prikazuje poruku o grešci.     |
| **Posljedice (ishod)**            | Aplikacija mijenja status rezervacije u otkazana i obavještava korisnika o otkazivanju njegove rezervacije.     |

### UC-004: Uređivanje rezervacije

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                | Administator     |
| **Povezani zahtjevi**             | F-8.4, F-8.5     |
| **Preduvjeti**                    | Korisnik mora biti prijavljen u sustav, dodijeljena mu je uloga administratora i postoji rezervacija koju je moguće urediti.     |
| **Glavni uspješni tok**           | 1. Administrator otvara stranicu s popisom svih rezervacija.<br>2. Aplikacija dohvaća i prikazuje sve rezervacije osim onih označenih kao u tijeku.<br>3. Administrator odabire rezervaciju koju želi urediti.<br>4. Aplikacija prikazuje pojedinosti o odabranoj rezervaciji i dostupne radnje za upravljanje istom.<br>5. Administrator odabire radnju uređivanja.<br>6. Aplikacija prikazuje formu s podatcima o rezervaciji.<br>7. Administrator mijenja podatke o rezervaciji (datum preuzimanja, završetka najma, broj osoba...) i potvrđuje izmjene.<br>8. Aplikacija provjerava ovlasti, jesu li podatci u skladu s pravilima izrade rezervacije, mijenja podatke o rezervaciji i prikazuje poruku o potvrdi izmjena.     |
| **Alternativni tokovi / Iznimke** | **2a — Nema zabilježenih rezervacija:** Aplikacija prikazuje poruku kako trenutačno nema zabilježenih rezervacija.<br>**4a — Rezervaciju nije moguće urediti:** Odabrana rezervacija već je otkazana ili završena te za nju nije ponuđena radnja uređivanja.<br>**7a — Administrator nije potvrdio izmjene:** Podatci o rezervaciji ostaju nepromijenjeni.<br>**8a — Nedovoljne ovlasti:** Aplikacija ne mijenja podatke o rezervaciji i prikazuje poruku o grešci.<br>**8b — Plovilo iz rezervacije nije dostupno u odabranom razdoblju:** Aplikacija prikazuje poruku o nedostupnosti plovila.<br>**8c — Uneseni podatci ne slijede pravila izrade rezervacije:** Aplikacija prikazuje poruku o grešci.     |
| **Posljedice (ishod)**            | Aplikacija mijenja podatke o rezervaciji i prikazuje poruku o potvrdi izmjena.     |

### UC-005: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

### UC-006: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

### UC-007: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

---

## 3.3 Provjera dosljednosti obrazaca uporabe

**Cilj:** Provjeriti međusobnu usklađenost obrazaca uporabe, aktera, zahtjeva i ispitnih slučajeva. Cjelovito mapiranje održava se isključivo u **[matrici sljedivosti zahtjeva](2-Analiza-zahtjeva.md#26-sljedivost-zahtjeva)**.

| Provjera   | Pitanje za tim                                                                                                              | Zaključak |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | --------- |
| Zahtjev    | Je li svaki važan obrazac uporabe povezan s postojećim zahtjevom?                                                           |           |
| Akter      | Odgovara li akter naveden ovdje prethodno utvrđenoj ulozi i dopuštenoj interakciji?                                         |           |
| Aplikacija | Može li tim demonstrirati opisani glavni rezultat i važnu alternativu ili je opis jasno označen kao trenutačno oblikovanje? |           |

---

Povezivanje zahtjev → obrazac uporabe → ispitivanje održavajte **samo jednom, u [tablici sljedivosti zahtjeva](./2-Analiza-zahtjeva.md)**. Ovdje nemojte održavati drugu projektnu tablicu mapiranja ni stupac sa statusom implementacije. Ako važan zahtjev nema interakciju s ljudskim akterom, objasnite gdje se obrađuje umjesto izmišljanja aktera.

**Završna provjera:** Dijagram, specifikacije obrazaca uporabe i matrica sljedivosti međusobno su usklađeni. Svaki važan obrazac uporabe povezan je s postojećim zahtjevom, akteri odgovaraju stvarnim ulogama u aplikaciji, a opisani glavni i alternativni tokovi odgovaraju ponašanju koje sustav stvarno podržava.

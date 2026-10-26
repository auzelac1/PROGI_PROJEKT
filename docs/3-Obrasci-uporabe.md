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

### UC-002: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

### UC-003: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

### UC-004: [naziv usmjeren na cilj]

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |      |
| **Povezani zahtjevi**             |      |
| **Preduvjeti**                    |      |
| **Glavni uspješni tok**           |      |
| **Alternativni tokovi / Iznimke** |      |
| **Posljedice (ishod)**            |      |

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

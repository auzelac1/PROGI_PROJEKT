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

### UC-005: Evidentiranje razdoblja nedostupnosti plovila

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                |  Administrator    |
| **Povezani zahtjevi**             |  F-9.7, F-5.1, F-5.2, NF-01, NF-08   |
| **Preduvjeti**                    |  Administrator je prijavljen i ima ovlast upravljanja flotom (P5). Plovilo postoji u floti.    |
| **Glavni uspješni tok**           |  1. Administrator na stranici „Upravljanje flotom“ odabire plovilo i „Evidentiraj nedostupnost“.<br>2. Aplikacija prikazuje obrazac (datum od, datum do, razlog).<br>3. Administrator unosi podatke i potvrđuje.<br>4. Aplikacija na poslužitelju provjerava ovlasti i valjanost datuma (početak prije kraja, ne u prošlosti).<br>5. Aplikacija provjerava zauzetost plovila u razdoblju (potvrđene rezervacije, blokade u tijeku, druga razdoblja nedostupnosti).<br>6. Aplikacija trajno sprema razdoblje i prikazuje potvrdu. |
| **Alternativni tokovi / Iznimke** | **4a — Nedovoljne ovlasti:** aplikacija odbija zahtjev i ništa ne sprema.<br>**4b — Nevaljani datumi:** aplikacija objašnjava problem i zadržava unos; administrator ispravlja i ponavlja korak 3.<br>**5a — Preklapanje s potvrđenom rezervacijom:** aplikacija odbija unos i prikazuje koja rezervacija smeta; administrator odustaje ili prvo otkaže rezervaciju (UC-07) pa ponavlja unos.<br>**5b — Preklapanje s blokadom u tijeku ili drugim razdobljem:** aplikacija odbija unos i navodi razlog; administrator mijenja razdoblje ili pokušava kasnije.<br>**6a — Spremanje nije uspjelo:** aplikacija javlja pogrešku i ne prikazuje lažnu potvrdu. |
| **Posljedice (ishod)** | Razdoblje nedostupnosti je pohranjeno. U tom razdoblju plovilo se ne prikazuje kao slobodno (F-2.1, F-3.5) i ne može se rezervirati (F-5.1). |

### UC-006: Pregled rasporeda preuzimanja i povrata

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                | Djelatnik     |
| **Povezani zahtjevi**             | F-7.1, F-7.2, F-7.3     |
| **Preduvjeti**                    | Korisnik mora biti prijavljen u sustav i dodijeljena mu je uloga djelatnika ili administratora.     |
| **Glavni uspješni tok**           | 1. Djelatnik otvara stranicu namijenjenu za pregled rasporeda preuzimanja i povrata plovila. <br>2. Aplikacija dohvaća sve potvrđene rezervacije i prikazuje njihov raspored.<br>3. Djelatnik odabire pojedinu rezervaciju koju želi detaljnije pregledati.<br>4. Aplikacija prikazuje jedinstveni identifikator, plovilo, matičnu luku, datum i vrijeme preuzimanja i povrata, odabrane dodatne usluge, cijenu i broj osoba, te osnovne podatke o klijentu (ime i prezime, broj telefona, adresa e-pošte).|
| **Alternativni tokovi / Iznimke** | **2a - Nema potvrđenih rezervacija:** Aplikacija prikazuje poruku da trenutačno nema što prikazati.   |
| **Posljedice (ishod)**            | Djelatnik pregledava raspored preuzimanja i povrata s odgovarajućim podacima svakog najma, te pri tome podaci u sustavu ostaju nepromijenjeni.     |

### UC-007: Pretraga i pregled plovila

| Element specifikacije             | Opis |
| :-------------------------------- | :--- |
| **Primarni akter**                | Klijent     |
| **Povezani zahtjevi**             | F-2.1 – F-2.8, F-3.1 – F-3.5, F-4.6, F-5.1, F-5.2, F-5.4, F-12.1, F-12.2, NF-01, NF-02, NF-08     |
| **Preduvjeti**                    | Klijent mora biti prijavljen u sustav.     |
| **Glavni uspješni tok**           | 1. Klijent otvara stranicu za pretragu. Aplikacija prikazuje tražilicu i popis plovila s osnovnim podacima.<br>2. Klijent unosi datum preuzimanja, datum povrata i broj osoba. Po želji odabire lokaciju polaska i vrstu plovila.<br>3. Klijent po želji dodaje filtre: raspon cijene najma, broj kabina, opremu i dodatne usluge.<br>4. Klijent pokreće pretragu. Poslužitelj provjerava ovlasti i ispravnost unesenog razdoblja.<br>5. Aplikacija prikazuje plovila koja su slobodna u cijelom razdoblju i čiji je kapacitet jednak ili veći od broja osoba. Pri provjeri uzima u obzir potvrđene rezervacije, blokade u tijeku i razdoblja nedostupnosti. Uz svako plovilo prikazuje ukupnu cijenu najma za razdoblje. <br>6. Klijent odabire plovilo iz rezultata. <br>7. Aplikacija prikazuje sve podatke o plovilu: naziv, tip i kategoriju, proizvođača i model, godinu proizvodnje, kapacitet, broj kabina i ležajeva, opremu i matičnu luku. Prikazuje i fotografije, cijenu najma te popis dodatnih usluga s cijenama. <br>8. Aplikacija na karti prikazuje matičnu luku, koja je ujedno lokacija preuzimanja. <br>9. Aplikacija prikazuje vremensku prognozu za matičnu luku i odabrani termin: temperaturu, vjetar i vremenske uvjete. <br>10. Klijent prelazi na izradu rezervacije ili se vraća na rezultate pretrage.     |
| **Alternativni tokovi / Iznimke** | 1a — Korisnik nije prijavljen: aplikacija na početnoj stranici prikazuje samo osnovne podatke o plovilima. Pretraga po kriterijima i detalji plovila nisu dostupni, a aplikacija nudi prijavu. Poslužitelj odbija takve zahtjeve neprijavljenog korisnika. <br>2a — Termin nije unesen: aplikacija prikazuje plovila prema ostalim kriterijima, bez provjere raspoloživosti. Uz to napominje da je za rezervaciju potrebno odabrati termin. <br>4a — Neispravno razdoblje: povratak je prije preuzimanja ili je datum u prošlosti. Aplikacija objašnjava grešku i zadržava unesene podatke. Klijent ispravlja unos i ponavlja korak 4. <br>4b — Neispravan broj osoba: aplikacija traži unos pozitivnog cijelog broja. <br>5a — Nema rezultata: aplikacija javlja da nema slobodnih plovila za odabrane kriterije. Predlaže promjenu termina ili uklanjanje filtara. <br>6a — Termin je u međuvremenu zauzet: drugi klijent je za isti termin kliknuo „Nastavi”. Aplikacija obavještava klijenta da termin nije dostupan i vraća ga na rezultate. <br>7a — Plovilo nema fotografija: aplikacija prikazuje zamjensku sliku. <br>8a — Kartografski servis nije dostupan: aplikacija prikazuje naziv i adresu luke bez karte, a ostatak stranice radi normalno. <br>9a — Termin nije odabran ili je izvan razdoblja prognoze (više od 16 dana unaprijed): aplikacija prikazuje napomenu da prognoza za taj termin nije dostupna. <br>9b — Meteorološki servis nije dostupan: aplikacija javlja da prognoza trenutačno nije dostupna, a ostatak stranice radi normalno.     |
| **Posljedice (ishod)**            | Klijent je pregledao slobodna plovila i podatke o odabranom plovilu: cijene, dodatne usluge, slobodne termine, lokaciju i vremensku prognozu. Stanje sustava se ne mijenja: ne izrađuje se rezervacija ni blokada termina.     |

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

# Natalia Charter — Projektna dokumentacija

**Kolegij:** [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz), Fakultet elektrotehnike i računarstva Sveučilišta u Zagrebu  
**Akademska godina:** 2026./2027.
**Tim:** Natalia
**Nastavnik:** Vlado Sruk
**Asistent / demonstrator:** Miljenko Krhen, Ivo Gabud

## Pregled projekta

**Cilj:** Omogućiti čitatelju koji prvi put vidi projekt da u dvije ili tri rečenice prepozna aplikaciju, njezine ciljane korisnike i glavnu svrhu.

Natalia Charter je web aplikacija za charter tvrtku koja iznajmljuje plovila na Jadranu. Klijenti u njoj pretražuju plovila prema datumu, luci, kategoriji i cijeni, pregledavaju njihove podatke i rezerviraju slobodno plovilo s dodatnim uslugama. Djelatnici, voditelj i administrator na jednom mjestu vode raspored preuzimanja i povrata, flotu, rezervacije, korisnike i statistiku poslovanja, umjesto ručno i u odvojenim tablicama.

**Aplikacija i osnovno postavljanje:** [upute za lokalno pokretanje](upute.md)  
**Javno dostupna aplikacija:** <https://progiprojekt.vercel.app>

## Članovi tima i uloge

| Član | Uloga |
| --- | --- |
| Ana Uzelac | Voditeljica tima, baza podataka i dokumentacija |
| Nikolina Žderić | Backend i dokumentacija |
| Tonko Bunčuga | DevOps |
| Antonija Gudelj | Backend |
| Ian-Karol Vrbaslija | Frontend |
| Ana Bartulović | Frontend |
| Luka Martinić | Frontend |

## Kazalo dokumentacije

| Stranica | Svrha |
| --- | --- |
| [1. Opseg projekta](1-Projekt.md) | Problem, cilj i granice projekta |
| [2. Analiza zahtjeva](2-Analiza-zahtjeva.md) | Zahtjevi, ograničenja i sljedivost |
| [3. Obrasci uporabe](3-Obrasci-uporabe.md) | Akteri i reprezentativne interakcije korisnika |
| [4. Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md) | Glavne odluke oblikovanja, struktura, podaci i ponašanje |
| [5. Ispitivanje](5-Ispitivanje.md) | Pristup ispitivanju, stvarni rezultati i poznati nedostaci |
| 6. Postavljanje, instalacija i konfiguracija *(u izradi)* | Lokalna instalacija, konfiguracija, javno postavljanje i administracija |
| 7. Zaključak i budući rad *(u izradi)* | Zaključak i moguća daljnja poboljšanja |
| A. Pregled aktivnosti grupe *(u izradi)* | Aktivnosti tima, doprinosi i izazovi |

## Ključne točke projekta

| Kontrolna točka | Demonstracija | Video |
| --- | --- | --- |
| Iteracija 1 | <https://progiprojekt.vercel.app> | [Poveznica na video Demo 1, ako je snimljen] |
| Završni pregled | [Poveznica na završnu inačicu projekta] | [Poveznica na video završne demonstracije, ako je snimljen] |

Dokumentacija se kontinuirano ažurira kako se aplikacija razvija.

## Organizacija projekta i razvojni proces

**Način rada:** Tim se sastaje jednom do dvaput tjedno, uživo ili na Teamsu. Zadaci se dijele po članovima i područjima (frontend, backend, baza, dokumentacija), a svaka funkcionalnost razvija se u zasebnoj grani i spaja u main.  
**Praćenje trenutačnih zadataka i nedostataka:** [GitHub Issues](https://github.com/auzelac1/PROGI_PROJEKT/issues) i [TODO.md](../TODO.md)

<details>
<summary><strong>Opis načina rada tima</strong></summary>


Tim se sastaje jednom do dvaput tjedno, uživo ili na Teams sastanku. Na sastanku svaki član ukratko kaže što je napravio od prošlog sastanka i gdje je zapeo. Voditeljica tima zatim dodjeljuje nove zadatke. Zadaci se zapisuju u TODO.md s imenom zaduženog člana ili u GitHub Issues, a riješeni se označavaju kvačicom. Bilješke sa sastanaka nalaze se u mapi meeting-notes. Svaka veća funkcionalnost razvija se u zasebnoj grani. Kad je gotova i lokalno provjerena, spaja se u main, a odande se aplikacija postavlja na Vercel.

</details>

## Pravila dokumentacije

Dokumentacija se sastoji od međusobno povezanih Markdown stranica. Obavezni UML dijagrami izrađuju se u PlantUML-u, uz PlantUML izvor u dokumentaciji sačuvajte i čitljivu sliku. Primjeri u ovom predlošku kolegija pokazuju kako nešto dokumentirati; nisu dio rezultata studentskog projekta.

<details>
<summary><strong>Izvori dijagrama i nastavni primjeri</strong></summary>

Nastavni primjeri pretpostavljaju React/Vite klijentski dio, Node.js poslužiteljski dio, PostgreSQL, smještaj aplikacije na Renderu i Selenium WebDriver (JavaScript). Vaš tehnološki skup može biti drukčiji; u dokumentaciji opišite ono što stvarno koristite.

Za obrazac uporabe podnošenja prijave kriznog događaja u CrisisMapu tim može čuvati UML izvor u `.puml` datoteci, prikazati odgovarajuću sliku na relevantnoj stranici dokumentacije te ažurirati oboje kada se interakcija promijeni. Koristite stvarni dijagram i stvarno postavljanje vlastitog projekta. Domena ili tehnologija prikazana u primjeru ne postaje zahtjev osim ako je dio odobrenog zadatka.

>Napomena o primjerima: Blokovi „Primjer — CrisisMap" nastavni su scenarij, a ne rezultat ičijeg projekta; ne prepisujte ih. U primjerima se koriste React, Node.js, PostgreSQL, Render i Selenium samo radi dosljednosti. Vaš stog može biti drukčiji (npr. Java/Spring); dokumentirajte ono što stvarno koristite.</details>

## Akademski integritet, ponašanje i licenciranje

Izjava o uporabi umjetne inteligencije nalazi se u [odjeljku ispod](#izjava-o-uporabi-umjetne-inteligencije). Pristupni podaci i druge tajne nikada se ne objavljuju u dokumentaciji niti dijele u običnim porukama.

## Izjava o uporabi umjetne inteligencije

<!-- UPUTA: Ovo je detaljan zapis uporabe umjetne inteligencije; README sadrži kratak sažetak i poveznicu na ovaj odjeljak. Unesite samo ono što se stvarno dogodilo i uklonite neupotrijebljene retke. Ako nije korišten nijedan alat generativne umjetne inteligencije, zamijenite cijeli odjeljak jednom rečenicom koja to jasno navodi. Svaki redak mora upućivati na stranicu, datoteku, zahtjev za uključivanje promjena (PR) ili zadatak. Nikada ne unosite pristupne podatke, osobne podatke ni tuđi zaštićeni sadržaj u alate umjetne inteligencije. -->

Ovaj odjeljak bilježi koji su alati korišteni, za koju dokumentaciju ili kod te kako je tim provjerio rezultat. Slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

### Korišteni alati

| Alat | Inačica ili model | Koristio/la | Glavna svrha |
| --- | --- | --- | --- |
| Claude (Anthropic) | Claude Opus 5.5 | Ana Uzelac | Provjera pravopisa i dosljednosti među dokumentima; generiranje testnih podataka za bazu |
| Claude (Anthropic) | Claude Opus 5.5 | Nikolina Žderić | Uređivanje dokumentacije |
| Nije zabilježeno | Nije zabilježeno | Tonko Bunčuga, Antonija Gudelj, Ian-Karol Vrbaslija, Ana Bartulović, Luka Martinić | Izrada PlantUML dijagrama ([izvori dijagrama](puml/)) |

### Opseg doprinosa umjetne inteligencije

| Stranica, datoteka ili artefakt | Vrsta pomoći | Što je alat proizveo | Što je tim zadao i promijenio | Lokacija |
| --- | --- | --- | --- | --- |
| Cijela dokumentacija (poglavlja 1–5 i Home) | Provjera pravopisa | Popis pravopisnih i gramatičkih pogrešaka s prijedlozima ispravaka | Provjeru pravopisa. | [`docs/`](./) |
| Cijela dokumentacija (poglavlja 1–5 i Home) | Provjera dosljednosti | Popis nesklada među dokumentima (nazivi, ID-ovi zahtjeva i obrazaca uporabe, dijagrami) | Provjeru dosljednosti među dokumentima. | [`docs/`](./) |
| Testni podaci za bazu | Generiranje podataka | SQL skripta s testnim podacima (luke, modeli, plovila, oprema, usluge, fotografije, nedostupnosti) | Ana Uzelac zadala je shemu baze te je skriptu ručno provjerila  i izmijenila neke stavke. | [`002_test_data.sql`](../db/migrations/002_test_data.sql) |
| [1. Opseg projekta](1-Projekt.md) (1.1, 1.2) | Uređivanje | Formatiranje teksta. | Nikolina Žderić zadala je točan popis izmjena i pregledala  | [`1-Projekt.md`](1-Projekt.md) |
| [2. Analiza zahtjeva](2-Analiza-zahtjeva.md) (2.5, 2.6) | Uređivanje | UC ID-ovi u tablici slijedivosti | Nikolina Žderić zadala je dodavanje  UC ID-ova i promijenila netražene izmjene | [`2-Analiza-zahtjeva.md`](2-Analiza-zahtjeva.md) |
| Home | Uređivanje | Popravak mrtvih poveznica, umetanje poveznica na GitHub Issues i ostalu dokumentaciju | Nikolina Žderić zadala je sadržaj (članove i uloge, alate i njihovu svrhu) i odobrila svaku izmjenu | [`Home.md`](Home.md) |
| [3.1 Dijagram obrazaca uporabe](3-Obrasci-uporabe.md#31-dijagram-obrazaca-uporabe) | Izvor dijagrama | Nacrt PlantUML koda dijagrama obrazaca uporabe | Ulaz: akteri i obrasci uporabe iz poglavlja 3.  | [`3-1-UC.puml`](puml/3-1-UC.puml) |
| [4.2 Dijagram komponenata](4-Arhitektura-i-oblikovanje.md#42-gradivni-blokovi-i-uml-dijagram-komponenata) | Izvor dijagrama | Nacrt PlantUML koda dijagrama komponenata | Ulaz: struktura frontenda, backenda i vanjskih servisa. | [`4-2-dijagram-komponenata.puml`](puml/4-2-dijagram-komponenata.puml) |
| [4.3.1 ER dijagram](4-Arhitektura-i-oblikovanje.md#431-er-dijagram-i-model-podataka) | Izvor dijagrama | Nacrt PlantUML koda ER dijagrama | Ulaz: tablice baze podataka.  | [`4-2-charter-data-ERD.puml`](puml/4-2-charter-data-ERD.puml) |
| [4.3.2 Dijagram razreda](4-Arhitektura-i-oblikovanje.md#432-reprezentativni-uml-dijagram-razreda) | Izvor dijagrama | Nacrt PlantUML koda dijagrama razreda | Ulaz: razredi i moduli backenda.  | [`4.3.2-UMLrazreda.puml`](puml/4.3.2-UMLrazreda.puml) |
| [4.4.1 Sekvencijski dijagram](4-Arhitektura-i-oblikovanje.md#441-reprezentativni-uml-sekvencijski-dijagram) | Izvor dijagrama | Nacrt PlantUML koda sekvencijskog dijagrama izrade rezervacije | Ulaz: tijek UC-001 Izrada rezervacije.  | [`4-4-1-izrada-rezervacije.puml`](puml/4-4-1-izrada-rezervacije.puml) |
| [4.4.2 Dijagram stanja](4-Arhitektura-i-oblikovanje.md#442-reprezentativni-uml-dijagram-stanja) | Izvor dijagrama | Nacrt PlantUML koda dijagrama stanja rezervacije | Ulaz: stanja rezervacije.  | [`4-4-2-stanja-rezervacije.puml`](puml/4-4-2-stanja-rezervacije.puml) |

Stranice i artefakti koji nisu navedeni iznad izrađeni su bez pomoći generativne umjetne inteligencije. [Po želji: kao dodatne retke navedite kod ili ispitivanja izrađena uz pomoć umjetne inteligencije.]

### Provjera generiranog sadržaja

| Provjera | Kako je provedena | Dokaz |
| --- | --- | --- |
| Činjenična točnost | Prilikom  provjere dosljednosti dokumentacije radila se ručna nasumična provjera te svaka bitna stavka je grupno diskutirana. | Sastanci tima; bilješke u [meeting-notes](meeting-notes/) |
| Nema tvrdnji o neostvarenim funkcionalnostima | Neimplementirano je označeno kao planirano, a neizvedeni testovi kao „Nije pokrenuto”. | 4.3.2, 4.4, 4.5; tablice 5.2 i 5.4 |
| Dosljednost s drugim stranicama | Ana Uzelac uz pomoć Claudea provjerila je nazive, ID-ove i dijagrame u svim poglavljima. | Tablica sljedivosti 2.6 |
| Izvori dijagrama | Generirani PlantUML iscrtan je i uspoređen s poglavljima 3 i 4; dijagram komponenata je ispravljen. | [`puml/`](puml/); commit `5ca76dd` |
| Povjerljivi sadržaj | U upite nisu uneseni pristupni podaci ni sadržaj `.env`; u dokumentaciji su samo nazivi varijabli. | `.env.example`; 4.6 |

### Pogreške pronađene u izlazu umjetne inteligencije

Nisu utvrđene.

<!-- UPUTA: Zabilježite stvarne ispravke ili napišite „Nisu utvrđene”. Općenita tvrdnja poput „sav tekst je pregledan” nije dokaz; dokaz su prethodne tablice. Tim mora moći objasniti svaku rečenicu koju objavi. -->

<details>
<summary><strong>Primjer zapisa uporabe umjetne inteligencije</strong></summary>

**Primjer — CrisisMap:**

| Stranica ili artefakt | Vrsta pomoći | Što je alat proizveo | Što je tim zadao i promijenio | Lokacija |
| --- | --- | --- | --- | --- |
| 3. Obrasci uporabe, UC-002 | Izrada nacrta | Prvu inačicu glavnog i alternativnih tijekova | Tim je zadao stvarna polja obrasca i uklonio granu prijave u sustav koja u aplikaciji ne postoji | Primjer PR #31 |
| Sekvencijski dijagram, podnošenje prijave | Izvor dijagrama | Nacrt PlantUML-a | Tim je uskladio nazive sudionika s komponentama i uklonio korak slanja obavijesti koji nije implementiran | `diagrams/report-submission.puml` (primjer) |

| Problem | Kako je pronađen | Rješenje |
| --- | --- | --- |
| U tekstu je stajalo da se obavijesti dostavljaju unutar jedne minute | Usporedba s Ispitivanjem (5.4): dostava nikada nije ispitana | Tvrdnja je uklonjena; obavijesti su navedene pod Budućim radom |
| Nacrt je kopirao primjer zahtjeva F-005 iz predloška kao projektni zahtjev | Usporedba s vlastitim popisom zahtjeva tima | Zamijenjeno stvarnim zahtjevom tima |

**Analiza primjera:** Svaki redak navodi stranicu ili datoteku, ono što je alat generirao i ono što je tim promijenio. Pogreške su tipične za generiranu dokumentaciju: funkcionalnost koja ne postoji i tekst predloška prikazan kao činjenica o projektu. Tvrdnje poput „AI je korišten svugdje” ili „sav tekst je pregledan” nije moguće provjeriti. Ovo je nastavni scenarij, a ne opis objavljenog projekta.

</details>

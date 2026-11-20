# 5. Ispitivanje

**Cilj:** Prikazati kako tim provjerava važno ponašanje aplikacije, što je stvarno ispitano, što rezultati pokazuju i koji poznati nedostaci ostaju. Planirano ispitivanje nije dokaz uspješnog izvođenja.


## 5.1 Pristup ispitivanju

**Cilj:** Odabrati provjere koje obuhvaćaju glavne korisničke ciljeve, važne uvjete neuspjeha i projektno specifične nefunkcijske zahtjeve.

**Pristup ispitivanju:** Ručno su provjerene Google prijava, pretraga, datumi u kalendaru, nepostojeće plovilo, odbijanje zahtjeva bez prijave i responzivnost. Izvedene su i provjere izgradnje i koda naredbama `npm run build` i `npm run lint`. CT-01 i CT-02 provjeravaju se Python skriptom backend/tests/test_boats.py. Rezultati su navedeni u tablici 5.2. Nisu izvedeni rezervacijski testovi pošto implementacija nije trenutno napravljena.

Odaberite normalne slučajeve, granične vrijednosti i neuspjehe koji otkrivaju različita ponašanja. Selenium IDE može snimiti i ponovno izvesti osnovnu interakciju u pregledniku; Selenium WebDriver omogućuje zapis provjere preglednika u kodu. Selenium ili drugi prikladan alat koristite kada pomaže da sustavska provjera bude ponovljiva. Navedite alat koji tim stvarno koristi. Ispitivanje razreda ili pravila pripada razini komponente; otvaranje obrasca u pregledniku provjerava pokrenuti sustav. Tijek kontinuirane integracije (engl. *continuous integration*, CI) i njegova izvođenja navedite samo ako ga tim stvarno koristi. Kontinuirana integracija podrazumijeva da se promjene redovito integriraju u zajednički repozitorij te automatizirano izgrađuju i provjeravaju. Sama uporaba GitHub Actionsa ili drugog alata ne znači da projekt primjenjuje CI ako se takve provjere stvarno ne izvode nad promjenama.



## 5.2 Ispitni slučajevi

**Cilj:** Važne provjere učiniti ponovljivima bilježenjem scenarija, ulaza, koraka, očekivanog rezultata i rezultata izvođenja. Svakoj provjeri dodijelite stabilan ID koji se može koristiti u tablici sljedivosti zahtjeva.

| ID ispitnog slučaja | Scenarij ispitivanja | Ulazni podaci | Očekivani rezultat | Stvarni rezultat | Ishod | Koraci ispitivanja |
| --- | --- | --- | --- | --- | --- | --- |
| CT-01 | Komponenta: nevaljani datumi (F-2.1) | Početak sutra; završetak danas. | Iznimka HTTP 400 prije dohvata plovila. | Podignuta je iznimka HTTP 400; `fleet.search_boats` nije pozvan. | Prošlo | /backend/tests/test_boats.py, pokretanje u 5.3. |
| CT-02 | Komponenta: granica cijene (F-2.1) | `max_price=0`, zatim `max_price=-1`. | Nula se prihvaća; negativna cijena daje HTTP 400. | Nula je proslijeđena pretrazi; za -1 podignuta je iznimka HTTP 400 bez pozivanja pretrage. | Prošlo | /backend/tests/test_boats.py, pokretanje u 5.3. |
| ST-01 | Sustav: Google prijava (F-1.1; UC-010) | Ispitni Google račun. | Prijava uspijeva i profil prikazuje prijavljenog korisnika. | Pokrenuto, Google računi se mogu prijaviti, te se stvore u sustavu kao korisnici, ime i prezime s računa je preuzeto i registrirano točno. | Prošlo | Otvoriti prijavu; dovršiti Google prijavu; otvoriti profil. |
| ST-02 | Sustav: pretraga po luci i cijeni (F-2.1; UC-007) | ACI marina Split (`port=1`); cijena do 400 €; bez datuma i drugih filtara. | Redom po cijeni: Strijela (ID 15; 220 €), Maestral (ID 5; 300 €), Adriana (ID 1; 320 €). | Prikazana su navedena tri plovila očekivanim redoslijedom. | Prošlo | Otvoriti `/plovila?port=1&max_price=400`; provjeriti točno navedena tri plovila prema snimci baze u 5.3. |
| ST-03 | Sustav: datumi u kalendaru (F-2.1; UC-007) | Jučer; sutra; prekosutra. | Jučer nije dostupan; početak nije nakon završetka; jednodnevni raspon je dopušten. | Prošli datumi i obrnuti raspon nisu dostupni; jednodnevna pretraga je dopuštena. | Prošlo | Provjeriti jučerašnji datum; odabrati sutra kao početak; provjeriti ograničenje završetka; odabrati prekosutra kao završetak i provjeriti ograničenje početka; pretražiti s oba datuma sutra. |
| ST-04 | Sustav: nepostojeće plovilo (F-2.2; UC-007) | ID 19; u trenutku upita ne postoji u bazi. | Prikazuje se poruka da plovilo nije pronađeno. | Rezultat stranice: "Plovilo nije pronađeno Možda je uklonjeno iz ponude. Pogledajte cijeli katalog." | Prošlo | Ponovno provjeriti da ID 19 nije dodan; otvoriti `/plovila/19`; zabilježiti prikazanu poruku. |
| ST-05 | Sustav: izrada rezervacije (F-3.1; UC-001) | Klijent radi rezervaciju s izabranim brodom, lukom i uslugama. | Rezervacija je potvrđena; prikazan je ukupni iznos i rezervacija se može ponovno dohvatiti. | Nije pokrenuto; rezervacijski postupak je u izradi. | Nije pokrenuto | Nakon implementacije provjeriti raspoloživost i cijenu; prijaviti klijenta; rezervirati navedeno plovilo; provjeriti iznos i spremljenu rezervaciju. |
| ST-06 | Sustav: pristup bez prijave (F-8.1, djelomično) | `GET /api/users` bez tokena prijave. | Zahtjev je odbijen porukom `Not authenticated`. | Zahtjev poslan preko Swagger UI-ja bez tokena vratio je `{"detail":"Not authenticated"}`. | Prošlo | Bez zaglavlja `Authorization` poslati `GET https://progiprojekt.vercel.app/api/users`; provjeriti poruku odbijanja. |
| ST-07 | Sustav: ovlasti prijavljenog klijenta (F-8.1, djelomično) | Valjan token klijenta bez administratorske uloge. | `GET /api/users` vraća HTTP 403. | GET /api/me s tokenom korisnika vraća HTTP 200 i ulogu klijent, GET/api/users vraća "Korisnici: 403 {detail: 'Pristup odbijen'}". | Prošlo | Poslati zahtjev s `Authorization: Bearer <token klijenta>`; provjeriti status 403 i da popis korisnika nije vraćen. |
| NF-T-01 | Responzivnost (NF-02) | Širine 375, 768 i 1440 px. | Navigacija, pretraga i filtri dostupni su bez vodoravnog prelijevanja stranice. | Pokrenuto, pregled s manjih uređaja radi. | Prošlo | Otvoriti početnu i katalog na svakoj širini; provjeriti raspored i kontrole. |
| NF-T-02 | Istodobne rezervacije (NF-01; UC-001) | Dva klijenta bez rezervacija odabiru isto plovilo i isti slobodan termin. | Samo jedan klijent dobiva termin; nema dviju potvrđenih rezervacija koje se preklapaju. | Nije pokrenuto; rezervacijski postupak je u izradi. | Nije pokrenuto | Nakon implementacije provjeriti da termin nije zauzet testom ST-05; istodobno poslati dva zahtjeva; dovršiti prihvaćeni postupak; provjeriti odgovore i stanje baze. |
| QA-01 | Izgradnja frontenda | Trenutačni izvorni kod i instalirane ovisnosti. | `npm run build` završava kodom 0. | Kod 0; izgrađen frontend; upozorenje za JS paket veći od 500 kB. | Prošlo | U folderu `frontend` pokrenuti `npm run build`. |
| QA-02 | Statička provjera koda | Trenutačni izvorni kod. | `npm run lint` završava kodom 0; upozorenja se bilježe. | Kod 0; ostaju upozorenja za neiskorištene varijable, React ključeve i učinke. | Prošlo | U folderu `frontend` pokrenuti `npm run lint`; pregledati izlaz. |



Scenarij određuje funkcionalnost koja se ispituje. Opaženi rezultat i **Prošlo**, **Nije prošlo** ili **Blokirano** unesite tek nakon izvođenja; do tada koristite **Nije pokrenuto**. Koraci ispitivanja moraju omogućiti drugom članu tima da ponovi provjeru. Izvorni kod automatiziranog ispitivanja čuvajte u Git repozitoriju projekta i iz relevantnog slučaja postavite poveznicu na njega; za ručnu provjeru ovdje dokumentirajte korake. Odaberite normalne slučajeve, smislene nevaljane ulaze ili granice, neuspjehe i relevantna svojstva kvalitete. Funkcionalnost koja nije implementirana predstavlja nedovršen opseg; provjera kako aplikacija obrađuje nevaljani ID valjano je negativno ispitivanje.



## 5.3 Provedena ispitivanja i rezultati

**Cilj:** Navesti reviziju aplikacije, okruženje i dokaze potrebne za tumačenje stvarnih rezultata u tablici ispitnih slučajeva. Dodajte kratak zapis izvođenja kada te podatke nije moguće jasno prenijeti poveznicom na kod ispitivanja ili CI izvođenje.

**Najnovije izvođenje ili dokaz:** QA-01 i QA-02 izvedeni su 19. 11. 2026. lokalno na Windowsu kroz PowerShell, uz Node.js `v26.13.0` i npm `11.21.2`. Obje naredbe završile su kodom 0, uz upozorenja navedena u tablici. Za CT-01 i CT-02 pokretanje skripte u /backend/tests/test_boats.py

**Referentni podaci baze:** Dohvaćeni su 19. 11. 2026 iz baze konfigurirane za backend. Baza sadrži 18 plovila (17 aktivnih), 5 luka, 0 rezervacija i 3 razdoblja nedostupnosti.

Za ST-02 SQL upit vraća ID-ove **15, 5 i 1**, tim redom:

```sql
SELECT b.id_brod, b.naziv, b.cijena_dan
FROM brod b
WHERE b.aktivan AND b.id_luka = 1 AND b.cijena_dan <= 400
ORDER BY b.cijena_dan, b.id_brod;
```

Potvrđeno je da ID 19 ne postoji. Treba ponovno provjeriti kada se naprave rezervacije.

Stupci **Stvarni rezultat** i **Ishod** iznad mjerodavni su rezultati za pojedinačni slučaj. Nemojte kopirati sve rezultate u drugu obaveznu tablicu. Neuspješna i blokirana izvođenja zabilježite iskreno; pri ponovnom izvođenju zadržite relevantnu povijest umjesto prikazivanja starog uspješnog rezultata kao trenutačnog.


## 5.4 Poznati nedostaci i ograničenja ispitivanja

**Cilj:** Omogućiti čitatelju da vidi nedostatke koji utječu na uporabu trenutačne aplikacije i važno ponašanje koje tim nije mogao provjeriti.

| Problem ili ograničenje | Korisniku vidljiv učinak ili neprovjereno ponašanje | Dokaz ili poveznica na zadatak |
| --- | --- | --- |
| Dio provjera još nije izveden. | Rezervacijski postupci još nisu potvrđeni. | ST-05 i NF-T-02 u 5.2. |
| Automatizirani sustavski testovi nisu napravljeni, napravljeni su ručni. | CT-01 i CT-02 provjeravaju komponentu; izgradnja i lint ne zamjenjuju provjeru korisničkih postupaka. | /backend/tests/test_boats.py, sustavske provjere u 5.2. izvedene su ručno. |
| Statička provjera i izgradnja prijavljuju upozorenja. | Posljedice upozorenja na vidljivo ponašanje i brzinu učitavanja nisu posebno ispitane. | QA-01 i QA-02. |

**Nedovršen opseg:** Rezervacije, blokada termina i istodobno rezerviranje još nisu implementirani ni ispitani.

Detaljnu reprodukciju nedostatka i napredak čuvajte u alatu za praćenje zadataka, uz kratku poveznicu ovdje za nedostatke koji bitno utječu na aplikaciju ili demonstraciju. Ako je obavezna funkcionalnost nedovršena, jasno to navedite u završnim rezultatima; nemojte je nazivati poznatim nedostatkom niti uspješnim ispitivanjem. Iskreno zabilježite i nedostajuću mogućnost ispitivanja, primjerice vanjskog pružatelja koji tijekom izvođenja nije bio dostupan. Ovaj odjeljak ne zahtijeva drugi potpuni dnevnik problema.


**Završna provjera:** ID-ovi ispitivanja i očekivani ishodi odgovaraju primjenjivim zahtjevima i obrascima uporabe. Izvedeni rezultati upućuju na stvarnu reviziju aplikacije i pregledljivo izvođenje ili ponovljivo opažanje. Važni neuspjesi i otvoreni nedostaci ostaju vidljivi, dok završni opis isporučenih funkcionalnosti odražava ono što podržavaju ispitivanja i pokrenuta aplikacija.

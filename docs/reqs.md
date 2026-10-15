# Charter poslovanje

## 1. UVOD

- Sustav podržava charter poslovanje za plovila: klijenti pretražuju i rezerviraju plovila, a tvrtka upravlja flotom, rezervacijama i korisnicima, svatko u skladu sa svojom ulogom.
- Uloge unutar aplikacije su:
  - klijent
  - administrator
  - djelatnik
  - voditelj

## 2. PRETPOSTAVKE I OPSEG

- sustav podrazumijeva rad s isključivo jednom charter tvrtkom
- najkraće trajanje najma je jedan dan (nije podržano iznajmljivanje po satu) – rezervacija se preuzima u fiksnom jutarnjem terminu, dok je povratak u fiksnom popodnevnom
- vrijeme povrata i preuzimanja isto je za sva plovila
- ukupna cijena rezervacije = cijena najma plovila po danu × broj dana najma + zbroj cijena odabranih dodatnih usluga. Svaka dodatna usluga naplaćuje se jednokratno po rezervaciji.
- prvi administrator određuje se konfiguracijom sustava (pri postavljanju aplikacije)
- plaćanje nije podržano u sklopu projektnog zadatka

## 3. FUNKCIJSKI ZAHTJEVI

### 3.1 PODACI O PLOVILIMA

- naziv
- tip (tip jedrilice)
- kategorija (jedrilice, motorni brodovi, katamarani i dr. plovila)
- proizvođač + model
- godina proizvodnje
- kapacitet
- broj kabina
- broj ležajeva
- oprema (npr. klima uređaj, GPS, prsluci za spašavanje…)
- matična luka
- fotografije
- cijena najma
- dodatne usluge (čišćenje, skipper i sl.)

### 3.2 KLIJENT

#### 3.2.1 PRETRAGA

- po terminu (prikazuju se samo plovila slobodna u cijelom odabranom razdoblju)
- po lokaciji polaska
- po vrsti plovila
- po broju osoba (prikazuju se plovila kapaciteta jednakog ili većeg od broja osoba)
- po cijeni najma (u rasponu od–do)
- po broju kabina
- po opremi (npr. klima uređaj, GPS)
- po dodatnim uslugama (npr. skipper, čišćenje) – svako plovilo ima vlastiti popis usluga, a moguće je filtrirati po najčešćim uslugama

#### 3.2.2 PREGLED

- pregled svih podataka o plovilu: naziv, tip i kategorija, proizvođač i model, godina proizvodnje, kapacitet, broj kabina i ležajeva, oprema i matična luka
- pregled fotografija plovila
- pregled cijene najma
- pregled popisa dodatnih usluga plovila s cijenama
- pregled slobodnih termina plovila
- pregled vlastitih rezervacija (potvrđene, otkazane i završene) s pristupom podacima i ukupnom iznosu svake rezervacije

#### 3.2.3 ODABIR I REZERVACIJA

- izrada rezervacije prema podacima i pravilima navedenima u dijelu REZERVACIJE:PODACI REZERVACIJE
- odabir dodatnih usluga iz popisa odabranog plovila, uz prikaz njihovih cijena

#### 3.2.4 NAKON POTVRDE REZERVACIJE

- omogućen pregled podataka o rezervaciji
- pregled ukupnog iznosa rezervacije
- primitak potvrde rezervacije automatski putem e-pošte

### 3.3 TVRTKA

#### 3.3.1 ADMINISTRATOR

- dodavanje + izmjena plovila
- dodavanje + izmjena opreme plovila
- definiranje cijena najma plovila
- definiranje dodatnih usluga za pojedinačno plovilo
- evidentiranje razdoblja kada plovilo nije raspoloživo zbog servisa/održavanja i sl.
- UPRAVLJANJE REZERVACIJOM:
  - pregled nad svim rezervacijama
  - ručno otkazivanje rezervacije na upit klijenta
  - uređivanje rezervacije (promjena datuma preuzimanja/završetka…, ali uz ista pravila kao i pri izradi)
  - ručni unos završetka najma
  - naknadno otkazivanje potvrđene rezervacije uslijed hitnog slučaja (npr. hitni popravak i sl.)
  - \*Sustav automatski potvrđuje rezervaciju ako je plovilo slobodno u traženom terminu. Administrator naknadno upravlja rezervacijama: pregled, otkazivanje, uređivanje i evidencija završetka najma.
  - \*Klijent automatski dobije mail od sustava u slučaju otkazivanja rezervacije s povratnom informacijom
- UPRAVLJANJE KORISNICIMA
  - svaki novoregistrirani korisnik automatski dobiva ulogu klijenta
  - pregled liste svih registriranih korisnika (klijenti, djelatnici, voditelji i administratori)
  - dodjeljivanje i promjena uloga korisnicima (djelatnik, voditelj, administrator)
  - promjena uloge mijenja funkcionalnosti dostupne korisniku – refresh izgleda i funkcionalnosti aplikacije događa se pri sljedećem logiranju

#### 3.3.2 DJELATNICI

Djelatnici imaju pregled rasporeda preuzimanja i povrata plovila (samo za čitanje) i za svaku potvrđenu rezervaciju vide:

- jedinstveni identifikator rezervacije
- plovilo koje se iznajmljuje
- matičnu luku plovila
- datum i vrijeme preuzimanja
- datum i vrijeme povrata
- osnovne podatke o klijentu koji je napravio rezervaciju (ime i prezime, broj telefona, e-mail)
- odabrane dodatne usluge
- cijenu rezervacije
- broj osoba

#### 3.3.3 VODITELJ CHARTER KOMPANIJE

- pregled statističkih podataka (zauzetost pojedinih plovila, broj rezervacija po razdobljima, prihod, najtraženije kategorije plovila i dodatne usluge)
- odabrani/navedeni podaci (iz baze) trebaju se moći izvesti u neki standardni format za daljnju analizu (npr. xlsx, json, csv)

### 3.4 REZERVACIJE

#### 3.4.1 PODACI REZERVACIJE

**_Unosi klijent_**

- plovilo
- razdoblje najma: datum preuzimanja i povrata
- broj osoba
- odabrane dodatne usluge (iz popisa odabranog plovila)

**_Preuzima se iz korisničkog računa_**

- ime i prezime, e-mail, broj telefona klijenta

**_Postavlja sustav_**

- jedinstveni identifikator rezervacije (id)
- status rezervacije
- ukupna cijena (cijena najma za razdoblje + cijene odabranih dodatnih usluga)
- vrijeme nastanka
- vrijeme isteka (samo dok je status "u tijeku")
- lokacija preuzimanja (matična luka plovila)

#### 3.4.2 PRAVILA

- plovilo je slobodno u cijelom razdoblju (nema preklapanja s drugom rezervacijom ni razdobljem nedostupnosti)
- broj osoba ne premašuje kapacitet plovila
- početak je prije kraja i nije u prošlosti
- zauzetost plovila vodi se jednoznačno na jednom mjestu i obuhvaća potvrđene rezervacije, blokade u tijeku i razdoblja nedostupnosti

#### 3.4.3 STATUSI

- zahtjev za rezervaciju (u tijeku) – vidi: Problem istodobnog pristupa
- potvrđena rezervacija
- otkazana rezervacija
- završen najam

#### 3.4.4 PROBLEM ISTODOBNOG PRISTUPA

- Kad klijent odabere plovilo i datum te klikne "nastavi", sustav izrađuje rezervaciju sa statusom "u tijeku" i termin se privremeno blokira na 10 minuta.
- Tijekom blokade termin se smatra zauzetim: drugi klijenti ga ne vide kao slobodan i ne mogu ga rezervirati. Ako ga pokušaju odabrati, sustav ih obavještava da termin nije dostupan.
- Ako klijent potvrdi rezervaciju unutar 10 minuta, sustav je automatski potvrđuje (status "potvrđena") uz uvjet da su zadovoljena pravila prije potvrde.
- Ako rok istekne bez potvrde, rezervacija se briše i termin se oslobađa. Klijent mora ponovno započeti rezervaciju.
- Ako više klijenata istodobno pokuša rezervirati isti termin, prednost ima onaj koji je prvi kliknuo "nastavi".

### 3.5 OSTALI FUNKCIJSKI ZAHTJEVI

- logiranje s autentikacijom (OpenID Connect ili OAuth 2.0)
- komunikacija s meteorološkim servisom – dostupni podaci o vremenskoj prognozi (temperature, vjetar, ostali vremenski uvjeti) za mjesto i termin rezervacije
- integracija s kartografskim servisom – prikazan položaj matične luke i lokacije preuzimanja plovila
- podržane različite vrste korisnika s različitim ovlastima (admin, djelatnik, voditelj, klijent)

## 4. NEFUNKCIJSKI ZAHTJEVI

- istovremeni rad s više korisnika, pri čemu istodobne rezervacije istog plovila ne smiju dovesti do preklapanja termina.
- responzivno korisničko sučelje – računalo, tablet, mobilni uređaj
- lozinke korisnika ne pohranjuju se u sustavu, već je prijava delegirana vanjskom pružatelju identiteta
- aplikacija postavljena na javno dostupan poslužitelj (HTTPS za komunikaciju s web preglednikom)
- podaci trajno pohranjeni u bazi podataka
- pohranjuju se isključivo osobni podaci nužni za rad
- klijent vidi samo vlastite podatke, dok djelatnici imaju samo pregled nad podacima potrebnima za realizaciju najma
- ograničenja za pojedinu ulogu provjeraju se na poslužitelju

**OTVORENO PITANJE: kako strukturirati podatke za daljnju obradu i što mora biti u izlaznom dokumentu (funkcionalnost za voditelja)**

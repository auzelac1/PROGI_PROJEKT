# 1. Opseg projekta

**Cilj:** Objasniti odobreni projektni zadatak vlastitim riječima tima. Čitatelj treba razumjeti problem, ciljane korisnike, cilj projekta i njegove granice bez prethodnog čitanja detaljnih zahtjeva.

## 1.1 Problem i cilj projekta

**Cilj:** Jasno razgraničiti problem koji se rješava od predloženog rješenja i stvarne koristi za korisnika.

**Problem:** Poslovanje charter kompanija i dalje se često oslanja na ručne procese, telefonske pozive i neusklađene tablice, što troši znatno vrijeme i povećava rizik od pogrešaka poput dvostrukih rezervacija. Klijentima istovremeno nedostaje brz i jednostavan uvid u raspoloživost, specifikacije i cijene plovila u realnom vremenu, što usporava cjelokupni proces prodaje.

**Cilj projekta:** Razviti web sustav koji modernizira i digitalizira charter poslovanje pružajući klijentima jednostavan uvid u ponudu, pretraživanje i rezervaciju plovila u realnom vremenu. Sustav istovremeno omogućuje zaposlenicima tvrtke centralizirano upravljanje flotom, rezervacijama i korisničkim ulogama, čime se automatiziraju poslovni procesi i smanjuje administrativno opterećenje.
**Očekivana korist:** Klijenti mogu u bilo kojem trenutku sami provjeriti raspoloživost, cijene i dodatne usluge te odmah rezervirati plovilo i dobiti potvrdu e-poštom, bez čekanja na odgovor tvrtke. Automatsko ažuriranje zauzetosti sprječava dvostruke rezervacije. Djelatnici imaju jasan raspored preuzimanja i povrata plovila, administratori upravljaju flotom i rezervacijama na jednom mjestu, a voditelj dobiva statističke podatke o poslovanju bez ručnog prikupljanja iz više izvora

## 1.2 Ciljani korisnici i dionici

**Cilj:** Utvrditi osobe, uloge i organizacije čije potrebe i interesi određuju projektni zadatak.

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
| --- | --- |
| Neprijavljeni korisnik | Pregledati i pretražiti plovila prema svojim kriterijima. |
| Klijent | Rezervirati plovilo s dodatnim uslugama i pregledati vlastite rezervacije. |
| Djelatnik | Pregledati raspored preuzimanja i povrata plovila te podatke potrebne za realizaciju najma. |
| Voditelj | Pregledati statističke podatke o poslovanju i izvesti odabrane podatke za daljnju analizu. |
| Administrator | Upravljati flotom (plovila, oprema, cijene, dodatne usluge, nedostupnost), rezervacijama i korisnicima (dodjela uloga). |
|  |  |

## 1.3 Granice projekta

**Cilj:** Jasno definirati granice sustava — što je obuhvaćeno odobrenim zadatkom, što je svjesno izostavljeno ili odgođeno te o kojim vanjskim uslugama sustav izravno ovisi.

**Uključeno:**

- pretraga i pregled plovila
- rezerviranje plovila s dodatnim uslugama i potvrdom rezervacije e-poštom
- pregled vlastitih rezervacija (klijent)
- pregled rasporeda preuzimanja i povrata plovila (djelatnik)
- upravljanje flotom, rezervacijama i korisnicima (administrator)
- statistika i izvoz odabranih podataka (voditelj)
- prijava putem vanjskog pružatelja identiteta
- prikaz vremenske prognoze i položaja matične luke na karti

**Izvan opsega ili odgođeno:**

- plaćanje – obrazloženje: nije dio projektnog zadatka
- iznajmljivanje po satu (najkraće trajanje najma je jedan dan) – obrazloženje: charter se tradicionalno rezervira na nekoliko dana
- rad s više charter tvrtki (sustav služi isključivo jednoj tvrtki) – obrazloženje: odgođeno, planira se razvoj za više tvrtki ako ostane vremena
- povrat plovila u drugu luku (one-way charter) – obrazloženje: zahtijeva praćenje trenutne lokacije plovila, logistiku vraćanja u matičnu luku, što bitno komplicira provjeru raspoloživosti i raspored djelatnika.

**Vanjske ovisnosti:**

- vanjski pružatelj identiteta (OpenID Connect / OAuth 2.0) – pružatelj: Google
- meteorološki servis – servis: Open-Meteo API
- kartografski servis – servis: OpenStreetMap


## 1.4 Postojeći pristupi i opravdanost projekta

**Cilj:** Objasniti kako korisnici trenutačno rješavaju problem i koja preostala potreba opravdava odobreni projekt.

Manje i srednje charter tvrtke većinom sve rade ručno. Klijent pošalje upit e-poštom ili nazove, pa čeka odgovor satima, nekad i danima. Termini se vode u tablicama ili na papiru, pa se lako dogodi dvostruka rezervacija. Prognozu i lokaciju klijenti trebaju tražiti sami.

Svi podaci u tvrtki su raspršeni. Rasporedi radnika se rade ručno te se trebaju uskladiti s rezervacijama, a vlasnik gubi vrijeme skupljajući podatke o prihodima i popunjenosti iz nekoliko različitih izvora.

Rješenje je jedinstven sustav za upravljanje charterom. Klijent sam pretražuje slobodne termine, vidi točne cijene i dodatne usluge te odmah dobiva potvrdu rezervacije. Zauzetost se promijeni automatski te dvostruke rezervacije postaju nemoguće, a integrirane karte i vremenska prognoza omogućuju klijentu sve informacije na jednom mjestu. Zaposlenici lakše vode flotu, dok vlasnik ima jasne izvještaje i statistiku.

---

>**Završna provjera:** Opis problema, cilj projekta, korisnici i dionici, granice opsega te postojeći pristupi međusobno su usklađeni. Navedene koristi ne predstavljaju neprovjerene tvrdnje, a uključene i izostavljene funkcionalnosti odgovaraju odobrenom projektnom zadatku.

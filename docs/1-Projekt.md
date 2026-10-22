# 1. Opseg projekta

**Cilj:** Objasniti odobreni projektni zadatak vlastitim riječima tima. Čitatelj treba razumjeti problem, ciljane korisnike, cilj projekta i njegove granice bez prethodnog čitanja detaljnih zahtjeva.

## 1.1 Problem i cilj projekta

**Cilj:** Jasno razgraničiti problem koji se rješava od predloženog rješenja i stvarne koristi za korisnika.

**Problem:** [nadopuniti]

**Cilj projekta:** Sustav podržava charter poslovanje za plovila: klijenti pretražuju i rezerviraju plovila, a tvrtka upravlja flotom, rezervacijama i korisnicima, svatko u skladu sa svojom ulogom.

**Očekivana korist:** [nadopuniti]

## 1.2 Ciljani korisnici i dionici

**Cilj:** Utvrditi osobe, uloge i organizacije čije potrebe i interesi određuju projektni zadatak.

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
| --- | --- |
| Neprijavljeni korisnik | Pregledati osnovne podatke o plovilima na početnoj stranici bez prijave. |
| Klijent | Pretražiti plovila prema svojim kriterijima, rezervirati plovilo s dodatnim uslugama i pregledati vlastite rezervacije. |
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
- prikaz vremenske prognoze i položaja matične luke i lokacije preuzimanja na karti

**Izvan opsega ili odgođeno:**

- plaćanje – obrazloženje: nije podržano u sklopu projektnog zadatka
- iznajmljivanje po satu (najkraće trajanje najma je jedan dan) – obrazloženje: [nadopuniti]
- rad s više charter tvrtki (sustav služi isključivo jednoj tvrtki) – obrazloženje: [nadopuniti]

**Vanjske ovisnosti:**

- vanjski pružatelj identiteta (OpenID Connect / OAuth 2.0) – pružatelj: [nadopuniti]
- meteorološki servis – servis: [nadopuniti]
- kartografski servis – servis: [nadopuniti]

## 1.4 Postojeći pristupi i opravdanost projekta

**Cilj:** Objasniti kako korisnici trenutačno rješavaju problem i koja preostala potreba opravdava odobreni projekt.

[nadopuniti]

---

>**Završna provjera:** Opis problema, cilj projekta, korisnici i dionici, granice opsega te postojeći pristupi međusobno su usklađeni. Navedene koristi ne predstavljaju neprovjerene tvrdnje, a uključene i izostavljene funkcionalnosti odgovaraju odobrenom projektnom zadatku.

# Uspostava Google OAuth 2.0 prijave

Upute za React/Vite frontend i FastAPI backend projekta CharterKompanija.
Za prijavu koristimo Google OpenID Connect (OIDC) nad OAuth 2.0 protokolom.
Google provjerava identitet, a naša aplikacija vodi korisnike, uloge i sesije.

## 1. Trenutačno stanje projekta

- Gumb u `frontend/src/pages/Login.jsx` otvara `/api/auth/google` ako nije postavljen drugi `VITE_API_URL`.
- Frontend dohvaća prijavljenog korisnika preko `GET /api/me`, a odjavljuje ga preko `GET /api/logout`.
- Lokalni Vite proxy prosljeđuje `/api` zahtjeve na `http://127.0.0.1:8000`.
- Vercel također usmjerava `/api` zahtjeve na backend.
- Backend trenutačno nema rute za Google prijavu, povratak s Googlea, profil i odjavu. Samo postavljanje Google konzole zato još neće omogućiti prijavu.

U nastavku koristimo predloženu callback rutu `/api/auth/google/callback`. Tu istu putanju treba implementirati na backendu.

## 2. Odabrati Google Cloud projekt

1. Otvoriti [Google Cloud Console](https://console.cloud.google.com/).
2. Odabrati projekt `charterkompanija` ili projekt koji tim koristi za aplikaciju.
3. Otvoriti **Google Auth Platform**. Ako se prikaže početno postavljanje, odabrati **Get started**.
4. Upisati naziv aplikacije `CharterKompanija`, e-mail za korisničku podršku i kontaktni e-mail razvojnog tima.

Za osnovnu prijavu nisu potrebni Gmail API ni pristup Google Driveu.

## 3. Branding i domene

U **Google Auth Platform → Branding** postaviti:

| Polje | Vrijednost |
| --- | --- |
| App name | `CharterKompanija` |
| User support email | E-mail člana tima koji održava prijavu |
| Application home page | `https://progiprojekt.vercel.app/` |
| Authorized domains → Add domain | `progiprojekt.vercel.app` |
| Developer contact information | Kontaktni e-mail tima |

**Application home page** prima cijeli URL. **Authorized domains** prima samo domenu, bez `https://`, putanje i završnog `/`. Ne unositi samo `vercel.app` jer to nije domena našeg projekta.

Za početno testiranje bez logotipa mogu se ostaviti prazna polja za pravila privatnosti i uvjete korištenja. Kada te stranice postoje, upisati njihove stvarne javne HTTPS adrese. Za javno objavljivanje i eventualnu verifikaciju provjeriti Googleove zahtjeve za te stranice i dokazivanje vlasništva domene. Ako zatraži dokaz vlasništva koji nije moguće provesti na Vercel poddomeni, koristiti vlastitu domenu koju tim može verificirati.

`localhost` se ne dodaje u **Authorized domains**. Lokalne adrese dodaju se u postavke OAuth klijenta iz koraka 6.

## 4. Audience i testni korisnici

1. Otvoriti **Audience**.
2. Odabrati **External** ako se trebaju prijavljivati obični Gmail računi ili članovi tima iz različitih organizacija. **Internal** je namijenjen korisnicima iste Google Workspace organizacije.
3. Tijekom razvoja ostaviti status **Testing**.
4. U **Test users → Add users** dodati Google e-mail adrese članova tima i spremiti.

Za pouzdano testiranje koristiti dodane račune. Prije otvaranja aplikacije svim korisnicima pregledati uvjete za **Publish app / In production**; objavljivanje i Googleova verifikacija zasebni su postupci.

## 5. Data Access: tražene dozvole

U **Data Access → Add or remove scopes** odabrati samo:

```text
openid
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
```

Backend iste dozvole može zatražiti skraćenim zapisom `openid email profile`. One omogućuju identifikator računa, e-mail i osnovne podatke profila. Ne tražiti pristup pošti ili datotekama za samu prijavu.

## 6. Izraditi OAuth klijent

Otvoriti **Clients → Create client**:

1. **Application type:** `Web application`.
2. **Name:** npr. `CharterKompanija Web`.
3. U **Authorized redirect URIs** dodati točno ove dvije adrese:

   ```text
   http://localhost:5173/api/auth/google/callback
   https://progiprojekt.vercel.app/api/auth/google/callback
   ```

4. Spremiti te preuzeti ili kopirati **Client ID** i **Client secret** na sigurno mjesto.

Lokalni callback prolazi kroz Vite proxy do FastAPI-ja. Aplikaciju zato otvarati na `http://localhost:5173`; ne miješati `localhost` i `127.0.0.1` u pregledniku jer kolačići pripadaju različitim hostovima. Ako Vite odabere drugi port, vratiti ga na 5173 ili uskladiti sve adrese.

**Authorized JavaScript origins** nisu potrebni za ovdje opisani tijek u kojem backend preusmjerava na Google i razmjenjuje autorizacijski kod. Ako se naknadno uvede Googleov JavaScript gumb, njegove origins postaviti zasebno na `http://localhost:5173` i `https://progiprojekt.vercel.app`, bez putanja.

Za odvojena razvojna i produkcijska okruženja preporučuje se napraviti zasebne OAuth klijente, svaki sa svojom povratnom adresom i vjerodajnicama.

## 7. Konfigurirati aplikaciju

Sljedeće varijable predstavljaju dogovor za buduću implementaciju backenda; postojeći backend ih još ne čita.

U lokalni `backend/.env` uz postojeći `DATABASE_URL` dodati:

```dotenv
GOOGLE_CLIENT_ID=ovdje_client_id
GOOGLE_CLIENT_SECRET=ovdje_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5173/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=ovdje_dugacak_nasumican_tajni_kljuc
SESSION_COOKIE_SECURE=false
```

Nasumični ključ može se generirati iz backend virtualnog okruženja:

```powershell
.\backend\.venv\Scripts\python.exe -c "import secrets; print(secrets.token_urlsafe(48))"
```

U **Vercel → Project → Settings → Environment Variables**, za produkcijsko okruženje postaviti odgovarajući `DATABASE_URL` i:

```dotenv
GOOGLE_CLIENT_ID=produkcijski_client_id
GOOGLE_CLIENT_SECRET=produkcijski_client_secret
GOOGLE_REDIRECT_URI=https://progiprojekt.vercel.app/api/auth/google/callback
FRONTEND_URL=https://progiprojekt.vercel.app
SESSION_SECRET=drugi_dugacak_nasumican_tajni_kljuc
SESSION_COOKIE_SECURE=true
```

Vercel varijable moraju biti dostupne backend servisu. Nakon izmjena napraviti novi deployment. Preview deploymenti imaju druge adrese i nisu pokriveni navedenim produkcijskim callbackom.

Frontend može koristiti zadani `/api`. Ako se `VITE_API_URL` postavlja, vrijednost je `/api` i pripada frontend okruženju pri izgradnji. Sam unos u `backend/.env` ne konfigurira Vite frontend.

Client secret, ključ sesije i bazu ne stavljati u `VITE_*` varijable, frontend kod ili Git. Backend mora izričito parsirati `SESSION_COOKIE_SECURE` kao boolean; tekst `false` ne smije se pretvoriti običnim `bool(...)` jer bi rezultat bio `True`.

## 8. Što implementirati na backendu

Za FastAPI može se koristiti **Authlib** za OAuth/OIDC, **httpx** za HTTP pozive i **itsdangerous** ako se koristi Starlette `SessionMiddleware`. Dodati odabrane pakete u `backend/requirements.txt` i instalirati ovisnosti u backend virtualno okruženje.

Googleov discovery URL je:

```text
https://accounts.google.com/.well-known/openid-configuration
```

Implementirati i registrirati ove rute:

| Ruta | Ponašanje |
| --- | --- |
| `GET /api/auth/google` | Generira OAuth `state` i OIDC `nonce`, čuva ih za povratak i preusmjerava na Google uz `openid email profile` i konfigurirani `GOOGLE_REDIRECT_URI`. |
| `GET /api/auth/google/callback` | Provjerava `state`, razmjenjuje kod za tokene i pomoću OIDC biblioteke provjerava potpis, izdavatelja, audience, rok valjanosti i `nonce` ID tokena. Zatim pronalazi ili stvara korisnika, uspostavlja sesiju i preusmjerava na `FRONTEND_URL`. |
| `GET /api/me` | Iz sesije pronalazi korisnika u bazi i vraća profil; bez valjane prijave vraća `401`. |
| `GET /api/logout` | Radi kompatibilnosti s postojećim frontend pozivom briše aplikacijsku sesiju/kolačić i vraća JSON. Za odjavu preko `POST` treba uskladiti i frontend te dodati CSRF zaštitu. |

Koristiti provjere koje pruža OIDC biblioteka. Samo dekodiranje JWT sadržaja nije provjera tokena. Obraditi i korisnikovo odustajanje od prijave bez stvaranja sesije.

U tablicu `korisnik` kao `uuid` spremati Googleov `sub`, a ne e-mail. Pri prvoj prijavi spremiti ime, prezime i e-mail ako su dostupni; postojeća baza novom korisniku dodjeljuje ulogu `klijent`. Postojećem korisniku ne mijenjati ulogu pri ponovnoj prijavi. Ako se aplikacija oslanja na potvrđeni e-mail, provjeriti i `email_verified`.

Sesijski kolačić treba imati `HttpOnly`, `SameSite=Lax`, rok trajanja i `Secure` u produkciji. OIDC transakcijsko stanje mora preživjeti odlazak na Google. Ako se koristi Starlette potpisana sesija u kolačiću, njezin sadržaj nije šifriran: spremati samo minimalni identifikator/stanje, bez Googleovih tokena. Poslužiteljske sesije trebaju zajedničku pohranu poput baze ili Redisa; memorija jednog Vercel procesa nije pouzdana između zahtjeva. Backend provjerava ulogu iz baze na zaštićenim rutama.

## 9. Provjera rada i tipične greške

1. Nakon implementacije pokrenuti `pokreni-lokalno.bat` i otvoriti `http://localhost:5173`.
2. Kliknuti **Prijavi se s Googleom** i odabrati testni račun.
3. Nakon pristanka treba se vratiti na aplikaciju, a `GET /api/me` treba vratiti profil.
4. Ponoviti prijavu i provjeriti da nije nastao drugi korisnik u bazi.
5. Provjeriti da odjava uklanja prijavu i da `/api/me` nakon nje vraća `401`.
6. Ponoviti na produkcijskoj domeni nakon deploymenta.

| Problem | Provjera |
| --- | --- |
| Google odbija domenu | U **Authorized domains** ide `progiprojekt.vercel.app`; u **Application home page** cijeli `https://progiprojekt.vercel.app/`. Ako i dalje odbija, zabilježiti točnu poruku validacije. |
| `redirect_uri_mismatch` | Usporediti stvarni `redirect_uri` iz zahtjeva s **Authorized redirect URIs** istog Client ID-ja. Protokol, host, port, putanja i završni `/` moraju se podudarati. |
| `invalid_client` | Client ID i secret moraju pripadati istom OAuth klijentu i biti dostupni backendu. |
| Pristup odbijen tijekom testiranja | Provjeriti odabrani projekt, Audience i testni račun. Ako je audience Internal, vanjski računi se ne mogu prijaviti. |
| `404` na `/api/auth/google` ili callbacku | Implementirati i registrirati backend rute s prefiksom `/api`; Google postavke same ne stvaraju te rute. |
| `state`/`nonce` greška ili prijava nestaje | Provjeriti kolačiće, isti host za početak i povratak, stabilni ključ sesije i dostupnost sesijskog stanja između zahtjeva. |

Referenca: [Google OpenID Connect dokumentacija](https://developers.google.com/identity/openid-connect/openid-connect).

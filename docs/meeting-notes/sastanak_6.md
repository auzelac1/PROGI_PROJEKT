| # | Osoba | Zadatak |
|---|---|---|
| 1 | **Setup / devops** (BE) | Struktura repozitorija (`frontend/`, `backend/`), kostur React + Vite + Bootstrap i FastAPI, dva Supabase projekta (razvoj i demonstracija), `.env.example`, CORS, deploy na Vercel, upute za pokretanje u README. Poslije pomaže onome tko zapne. |
| 2 | **Baza** (BE) | SQL skripta za svih 12 tablica iz `baza-podataka.md`, testni podaci (luke s koordinatama, modeli, brodovi, oprema, usluge, fotografije u Storageu, nekoliko nedostupnosti), sloj za pristup podacima. |
| 3 | **Prijava, backend** | Google OAuth / OIDC, provjera tokena, sesija ili JWT, kreiranje `KORISNIK` s ulogom klijent pri prvoj prijavi, prvi admin iz konfiguracije, endpoint `/me`, provjera uloge na zaštićenim rutama. |
| 4 | **Prijava, frontend** | Gumb za prijavu, obrada povratka s Googlea, spremanje stanja prijave, odjava, navigacija ovisno o ulozi, zaštićene stranice. |
| 5 | **Plovila, backend** | Popis plovila, detalji jednog plovila (model, oprema, usluge, fotografije, luka) i pretraga po filtrima: datumi, broj osoba, kategorija, luka. Kod datuma se dostupnost računa iz `REZERVACIJA` i `NEDOSTUPNOST`. |
| 6 | **Pregled, frontend** | Početna stranica za neprijavljene (kartice plovila) i stranica s detaljima plovila. |
| 7 | **Pretraga, frontend** | Obrazac za pretragu, rezultati, prilagodba za mobitel. |

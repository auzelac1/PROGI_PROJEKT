# Lokalno pokretanje projekta

Instalirani Python 3 i Node.js 22.12+.

## Prvo postavljanje

1. Klonirat repo ako vec nije, ili git pull.

   ```cmd
   git clone https://github.com/auzelac1/PROGI_PROJEKT.git
   cd PROGI_PROJEKT
   ```

2. Instalirati pakete za frontend i backend.

   ```cmd
   cd frontend
   npm ci
   cd ..\backend
   py -m venv .venv
   .venv\Scripts\python.exe -m pip install -r requirements.txt
   if not exist .env copy .env.example .env
   ```

3. U `backend/.env` postavite `DATABASE_URL` na Supabase vezu (kljuc poslan privatno vec).

## Pokretanje

U korijenu projekta pokrenite  `pokreni-lokalno.bat` i ostavite oba prozora otvorena.

- Vite je na adresi  <http://localhost:5173>.
- Swagger za backend je na <http://127.0.0.1:8000/api/docs>.
- Vezu s bazom provjerite na <http://127.0.0.1:8000/api/health/db>.

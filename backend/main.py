import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

# 1. Prvo učitavamo .env prije svega ostalog
load_dotenv(Path(__file__).resolve().parent / ".env")

# 2. Tek onda uvozimo routere
from routers import auth, boats

# 3. Stvaramo FastAPI aplikaciju
app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
)

# 4. Dopuštamo frontendu (localhost:5173) komunikaciju s backendom
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. Dodajemo SessionMiddleware za Google OAuth prijavu
# Koristimo SESSION_SECRET iz .env datoteke koju smo maloprije definirali
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "tajnaa"),
)

# 6. Registracija routera
app.include_router(boats.router)
app.include_router(auth.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/health/db")
def database_health():
    database_url = os.getenv("DATABASE_URL")

    if not database_url:
        raise HTTPException(
            status_code=503,
            detail="Veza s bazom nije konfigurirana.",
        )

    try:
        with psycopg.connect(
            database_url,
            sslmode="require",
            connect_timeout=5,
            prepare_threshold=None,
        ) as connection:
            connection.execute("SELECT 1").fetchone()
    except psycopg.Error:
        raise HTTPException(
            status_code=503,
            detail="Baza trenutačno nije dostupna.",
        ) from None

    return {"status": "ok", "database": "connected"}
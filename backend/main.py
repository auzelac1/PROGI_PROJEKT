import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException

load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url=None,
)


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
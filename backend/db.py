import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv
from psycopg.rows import dict_row

#za lokalni rad - tako da putanja radi na svakom računalu

#__file__: putanja do db.py (backend/db.py)
#Path(__file__): objekt tipa Path
#Path(__file__).resolve(): aps. putanja C:\PROGI\PROGI_PROJEKT\backend\db.py
# Path(__file__).resolve().parent: C:\PROGI\PROGI_PROJEKT\backend
#/ ".env": operator "/" (iz pathlib) dodaje zadani dio putanji ovisno o OS
#load_dotenv() -> os.environ["DATABASE_URL"] = "postgresql://..."
load_dotenv(Path(__file__).resolve().parent / ".env")

#na Vercelu load_dotenv ništa ne učita, a DATABASE_URL je već postavljen u postavkama projekta

def get_connection() -> psycopg.Connection:
    db_url = os.getenv("DATABASE_URL") #umjesto os.environ["DATABASE_URL"] (jer vraća None umjesto KeyError)

    if not db_url:
        raise RuntimeError("DATABASE_URL not set")

    return psycopg.connect( #otvaranje veze s bazom
        db_url,
        sslmode="require", #šifrirana veza
        connect_timeout=5, #max čekanje za uspostavu veze, ako je > 5s -> GREŠKA
        prepare_threshold=None, #koristi se transaction pooler
        row_factory=dict_row, #rezultat oblika {'id_brod': 1, 'naziv': 'Adriana', 'godina_proizvodnje': 2019}
    )
    #vraća objekt Connection preko kojeg se šalju upiti
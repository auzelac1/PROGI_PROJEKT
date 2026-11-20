import sys
from datetime import date, timedelta
from pathlib import Path

from fastapi import HTTPException

scriptPath = Path(__file__).resolve()
testsDir = scriptPath.parent
backendDir = testsDir.parent
sys.path.insert(0, str(backendDir))
from routers.boats import fleet, search_boats_endpoint as searchBoats

# pokretanje iz root dir
# .\backend\.venv\Scripts\python.exe -B .\backend\tests\test_boats.py

def main():
    searchCalls = []
    def fakeSearch(**params):
        searchCalls.append(params)
        return []

    originalSearch = fleet.search_boats
    fleet.search_boats = fakeSearch

    try:
        #CT-01: završetak je prije početka
        today = date.today()
        statusCode = None
        try:
            searchBoats(date_from=today + timedelta(days=1), date_to=today)
        except HTTPException as error:
            statusCode = error.status_code

        if statusCode != 400 or len(searchCalls) != 0:
            raise SystemExit("CT-01: Nije prošlo")
        print("CT-01: Prošlo")

        #CT-02: cijena 0 mora biti prihvaćena i poslana pretrazi
        result = searchBoats(max_price=0, equipment=None, services=None)
        if result != [] or len(searchCalls) != 1:
            raise SystemExit("CT-02: Nije prošlo za cijenu 0")
        if searchCalls[0]["max_price"] != 0:
            raise SystemExit("CT-02: Pretraga nije dobila cijenu 0")

        #CT-02: negativna cijena mora biti odbijena prije pretrage
        searchCalls.clear()
        statusCode = None
        try:
            searchBoats(max_price=-1)
        except HTTPException as error:
            statusCode = error.status_code

        if statusCode != 400 or len(searchCalls) != 0:
            raise SystemExit("CT-02: Nije prošlo za cijenu -1")
        print("CT-02: Prošlo")

    finally:
        fleet.search_boats = originalSearch


if __name__ == "__main__":
    main()
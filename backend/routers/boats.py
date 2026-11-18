from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, Query

from repositories import fleet

router = APIRouter(prefix="/api")

@router.get("/boats")
def search_boats_endpoint(
    date_from: date | None = None,
    date_to: date | None = None,
    num_of_people: int | None = None,
    port: int | None = None,
    category: str | None = None,
    max_price: float | None = None,
    min_cabins: int | None = None,
    equipment: list[int] | None = Query(None), 
    services: list[int] | None = Query(None),):
    if (date_from is None) != (date_to is None):
        raise HTTPException(status_code=400, detail="Potrebna su oba datuma.")
    if date_from is not None and (date_from > date_to or date_from < date.today()):
        raise HTTPException(status_code=400, detail="Početni datum ne smije biti u prošlosti ni nakon završnog.")
    if category is not None and category not in fleet.get_categories():
        raise HTTPException(status_code=400, detail="Nepoznata kategorija.")
    if num_of_people is not None and num_of_people < 1:
        raise HTTPException(status_code=400, detail="Broj osoba mora biti barem 1.")
    if max_price is not None and max_price < 0:
        raise HTTPException(status_code=400, detail="Cijena ne smije biti negativna.")
    if min_cabins is not None and min_cabins < 0:
        raise HTTPException(status_code=400, detail="Broj kabina ne smije biti negativan.")

    return fleet.search_boats(
        date_from=date_from,
        date_to=date_to,
        num_of_people=num_of_people,
        port=port,
        category=category,
        max_price=max_price,
        min_cabins=min_cabins,
        equipment=equipment,
        services=services,
    )

    

@router.get("/boats/{id_brod}")
def boat_detail(id_brod: int):
    boat = fleet.get_boat_info(id_brod)
    if boat is None or not boat["basics"]["aktivan"]:
        raise HTTPException(status_code=404, detail="Plovilo ne postoji.")
    return boat


@router.get("/boats/{id_brod}/busy")
def boat_busy_dates(id_brod: int, date_from: date | None = None, date_to: date | None = None):
    if date_from is None:
        date_from = date.today()
    if date_to is None:
        date_to = date_from + timedelta(days=365)
    if date_from > date_to:
        raise HTTPException(status_code=400, detail="Početni datum mora biti prije završnog.")
    return fleet.get_boat_busy_dates(id_brod, date_from, date_to)


@router.get("/categories")
def categories():
    return fleet.get_categories()


@router.get("/ports")
def ports():
    return fleet.get_ports()


@router.get("/equipment")
def equipment():
    return fleet.get_equipment()


@router.get("/services")
def services():
    return fleet.get_services()

from datetime import date, timedelta

from fastapi import APIRouter, HTTPException

from repositories import fleet

router = APIRouter(prefix="/api")


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

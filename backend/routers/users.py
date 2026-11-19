from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional

from repositories.users import (
    dohvati_sve_korisnike,
    alter_user,
    dohvati_trenutnog_korisnika,
)

router = APIRouter(prefix="/api/users", tags=["Korisnici"])

class korisnikIzmjena(BaseModel):
    telefon: Optional[str] = None
    ime: Optional[str] = None
    prezime: Optional[str] = None
    uloga: Optional[str] = None


@router.get("")
def get_users(trenutni_korisnik = Depends(dohvati_trenutnog_korisnika)):
    if not trenutni_korisnik or trenutni_korisnik["uloga"] != "admin":
        raise HTTPException(status_code=403, detail="Pristup odbijen")
    return dohvati_sve_korisnike()


@router.patch("/{uuid}")
def update_user(
    uuid: str, 
    podaci: korisnikIzmjena, 
    trenutni_korisnik = Depends(dohvati_trenutnog_korisnika)
):
    if not trenutni_korisnik:
        raise HTTPException(status_code=401, detail="Niste prijavljeni")
        
    je_admin = trenutni_korisnik["uloga"] == "admin"
    je_vlasnik = trenutni_korisnik["uuid"] == uuid
    
    if not je_admin and not je_vlasnik:
        raise HTTPException(status_code=403, detail="Nemate ovlasti")
        
    if je_admin and je_vlasnik and podaci.uloga is not None:
        raise HTTPException(status_code=403, detail="Admin ne može mijenjati svoju ulogu")
        
    if je_admin and not je_vlasnik:
        telefon, uloga, ime, prezime = podaci.telefon, podaci.uloga, None, None
    else:
        telefon, ime, prezime, uloga = podaci.telefon, podaci.ime, podaci.prezime, None
        
    azurirani = alter_user(uuid=uuid, telefon=telefon, ime=ime, prezime=prezime, uloga=uloga)
    if not azurirani:
        raise HTTPException(status_code=404, detail="Korisnik nije pronađen")
        
    return azurirani
from fastapi import APIRouter, Depends, HTTPException

from models import Korisnik, korisnikIzmjena
from repositories.users import (
    dohvati_sve_korisnike,
    alter_user,
    dohvati_trenutnog_korisnika,
)

router = APIRouter(prefix="/api/users", tags=["Korisnici"])


@router.get("", response_model=list[Korisnik])
def get_users(trenutni_korisnik = Depends(dohvati_trenutnog_korisnika)):
    if not trenutni_korisnik or trenutni_korisnik["uloga"] != "admin":
        raise HTTPException(status_code=403, detail="Pristup odbijen")
    return dohvati_sve_korisnike()


@router.patch("/{uuid}", response_model=Korisnik)
def update_user(
    uuid: str, 
    podaci: korisnikIzmjena, 
    trenutni_korisnik = Depends(dohvati_trenutnog_korisnika)
):
    if not trenutni_korisnik:
        raise HTTPException(status_code=401, detail="Niste prijavljeni")
        
    je_admin = trenutni_korisnik["uloga"] == "admin"
    #Tonko: zbunio s vlasnikom firme, stavio duze ime
    je_vlasnik_racuna = trenutni_korisnik["uuid"] == uuid
    
    if not je_admin and not je_vlasnik_racuna:
        raise HTTPException(status_code=403, detail="Nemate ovlasti")
        
    if je_admin and je_vlasnik_racuna and podaci.uloga is not None:
        raise HTTPException(status_code=403, detail="Admin ne može mijenjati svoju ulogu")

    #Tonko: jasniji pregled sto se dodijeljuje, mrzim python sintaksu
    if je_admin and not je_vlasnik_racuna:
        telefon = podaci.telefon
        ime = None
        prezime = None
        uloga = podaci.uloga
    else:
        telefon = podaci.telefon
        ime = podaci.ime
        prezime = podaci.prezime
        uloga = None
        
    azurirani = alter_user(uuid=uuid, telefon=telefon, ime=ime, prezime=prezime, uloga=uloga)
    if not azurirani:
        raise HTTPException(status_code=404, detail="Korisnik nije pronađen")
        
    return azurirani
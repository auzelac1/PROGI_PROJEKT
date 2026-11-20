from enum import Enum
from typing import Optional

from pydantic import BaseModel


class Uloga(str, Enum):
    klijent = "klijent"
    admin = "admin"
    djelatnik = "djelatnik"
    voditelj = "voditelj"


class Korisnik(BaseModel):
    uuid: str
    ime: Optional[str] = None
    prezime: Optional[str] = None
    email: str
    telefon: Optional[str] = None
    uloga: Uloga


#preseljena iz routers/users.pypri izradi objektnog modela
class korisnikIzmjena(BaseModel):
    telefon: Optional[str] = None
    ime: Optional[str] = None
    prezime: Optional[str] = None
    uloga: Optional[Uloga] = None #povezivanje s Enum Uloga!

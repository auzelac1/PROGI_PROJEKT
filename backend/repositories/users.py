import os
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from db import get_connection

TAJNI_KLJUC = os.getenv("JWT_SECRET", "tajna")
ALGORITAM = os.getenv("JWT_ALGORITHM", "HS256")
FIRST_ADMIN_EMAIL = os.getenv("FIRST_ADMIN_EMAIL", "").lower()

shema_tokena = OAuth2PasswordBearer(tokenUrl="auth/prijava")

# --- DIO 1: RAD S BAZOM (Korisnici i Uloge) ---


def get_user_by_email(email: str):
    """Dohvat korisnika po emailu"""
    with get_connection() as conn:
        user = conn.execute(
            "select * from korisnik where email = %s", (email,)
        ).fetchone()
    return user


def get_or_create_google_user(google_data: dict):
    """
    Kriterij: Prva prijava. 
    Ako korisnik ne postoji, kreira se s ulogom klijent, 
    osim ako mu je email u .env kao FIRST_ADMIN_EMAIL (tada je admin).
    """
    email = google_data.get("email").lower()
    name = google_data.get("given_name", "")
    surname = google_data.get("family_name", "")
    uuid = google_data.get("sub")  # Google-ov jedinstveni ID

    # Provjeri postoji li već
    user = get_user_by_email(email)

    if not user:
        # Odredi ulogu malim slovima kako baza zahtijeva
        uloga = "admin" if email == FIRST_ADMIN_EMAIL else "klijent"

        with get_connection() as conn:
            conn.execute(
                "insert into korisnik (uuid, ime, prezime, email, uloga) values (%s, %s, %s, %s, %s)",
                (uuid, name, surname, email, uloga),
            )
            conn.commit()

        user = get_user_by_email(email)

    return user

def stvori_token(podaci: dict):
    skopirani_podaci = podaci.copy()
    istek = datetime.utcnow() + timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
    )
    skopirani_podaci.update({"exp": istek})
    return jwt.encode(skopirani_podaci, TAJNI_KLJUC, algorithm=ALGORITAM)







def dohvati_trenutnog_korisnika(token: str = Depends(shema_tokena)):
    greska_autorizacije = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Neispravan token ili je sesija istekla",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        sadrzaj = jwt.decode(token, TAJNI_KLJUC, algorithms=[ALGORITAM])
        email: str = sadrzaj.get("sub")
        if email is None:
            raise greska_autorizacije
    except JWTError:
        raise greska_autorizacije

    # Dohvat korisnika iz baze preko emaila iz tokena
    korisnik = get_user_by_email(email)
    if korisnik is None:
        raise greska_autorizacije
    #slika dolazi iz Google podacih spremljeni u JWT.
    korisnik["picture"] = sadrzaj.get("picture")
    return korisnik






def dohvati_sve_korisnike():
    with get_connection() as poveznica:
        with poveznica.cursor() as kursor:
            kursor.execute("SELECT uuid, ime, prezime, email, telefon, uloga FROM korisnik;")
            return kursor.fetchall()


def alter_user(uuid: str, telefon: str = None, ime: str = None, prezime: str = None, uloga: str = None):
    """Dinamički mijenja podatke korisnika u bazi (mijenja samo polja koja nisu None)"""
    polja = []
    vrijednosti = []
    
    if telefon is not None:
        polja.append("telefon = %s")
        vrijednosti.append(telefon)
    if ime is not None:
        polja.append("ime = %s")
        vrijednosti.append(ime)
    if prezime is not None:
        polja.append("prezime = %s")
        vrijednosti.append(prezime)
    if uloga is not None:
        polja.append("uloga = %s")
        vrijednosti.append(uloga)
        
    if not polja:
        return None  
        
    vrijednosti.append(uuid)
    upit = f"UPDATE korisnik SET {', '.join(polja)} WHERE uuid = %s RETURNING uuid, ime, prezime, email, telefon, uloga;"
    
    with get_connection() as poveznica:
        with poveznica.cursor() as kursor:
            kursor.execute(upit, tuple(vrijednosti))
            azurirani_korisnik = kursor.fetchone()
            poveznica.commit()
            return azurirani_korisnik




def provjeri_ulogu(trazena_uloga: str):
    def provjera(trenutni_korisnik=Depends(dohvati_trenutnog_korisnika)):
        if trenutni_korisnik["uloga"].lower() != trazena_uloga.lower():
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Pristup odbijen. Potrebna uloga: {trazena_uloga}",
            )
        return trenutni_korisnik

    return provjera

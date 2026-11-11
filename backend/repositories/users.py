from db import get_connection

#dohvat podataka o korisniku sa zadanim uuid (nakon prijave)
#with: commit za ispravan zahtjev, rollback za grešku i zatvara vezu

def get_user(uuid):

    with get_connection() as conn:
        user = conn.execute("select * from korisnik where uuid = %s", (uuid,)).fetchone()
    return user


def add_user(uuid, name, lastname, email):
    with get_connection() as conn:
        user = conn.execute("insert into korisnik (uuid, ime, prezime, email) values (%s, %s, %s, %s) returning *", (uuid, name, lastname, email)).fetchone()
    return user #ako je unos uspješan, vraća dodanog korisnika
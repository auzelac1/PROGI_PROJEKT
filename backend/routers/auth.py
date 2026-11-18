import os
from urllib.parse import urlencode

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse

from repositories.users import (
    dohvati_trenutnog_korisnika,
    get_or_create_google_user,
    provjeri_ulogu,
    stvori_token,
)

# Bez prefixa: putanje su pisane u cijelosti da rade i /auth/... i /api/me
router = APIRouter(tags=["Autentifikacija"])

# Inicijalizacija Authlib OAuth klijenta
oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/auth/login/google")
async def google_login(request: Request):
    redirect_uri = os.getenv(
        "GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback"
    )
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Google autentifikacija nije uspjela: {str(e)}"
        )

    user_info = token.get("userinfo")
    if not user_info:
        raise HTTPException(
            status_code=400, detail="Nema podataka o korisniku od Google-a"
        )

    korisnik = get_or_create_google_user(user_info)
    jwt_token = stvori_token(
        {"sub": korisnik["email"], "uloga": korisnik["uloga"]}
    )

    frontend_base = os.getenv("FRONTEND_URL", "http://localhost:5173")
    query = urlencode(
        {
            "token": jwt_token,
            "uloga": korisnik["uloga"],
            "email": korisnik["email"],
        }
    )
    return RedirectResponse(url=f"{frontend_base}/?{query}")


def _profil(trenutni_korisnik):
    return {
        "id": trenutni_korisnik["uuid"],
        "ime": trenutni_korisnik["ime"],
        "email": trenutni_korisnik["email"],
        "uloga": trenutni_korisnik["uloga"],
    }


@router.get("/auth/me")
def moj_profil(trenutni_korisnik=Depends(dohvati_trenutnog_korisnika)):
    return _profil(trenutni_korisnik)


# Alias: frontend koji zove /api/me i dalje radi
@router.get("/api/me")
def moj_profil_api(trenutni_korisnik=Depends(dohvati_trenutnog_korisnika)):
    return _profil(trenutni_korisnik)


@router.get("/auth/admin-samo", dependencies=[Depends(provjeri_ulogu("ADMIN"))])
def admin_samo_ruta():
    return {"poruka": "Dobrodošli u administrativni dio sustava!"}
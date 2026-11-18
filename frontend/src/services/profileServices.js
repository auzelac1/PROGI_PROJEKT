let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "/api";
}

export async function getMe() {
    let response;

    try {
        response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            credentials: "include"
        });
    } catch (err) {
        throw new Error(err.message);
    }

    if (!response.ok) {
        throw new Error("Korisnik nije prijavljen.");
    }

    return await response.json();
}

export async function changePhoneNumber(uuid, phone, ime, prezime) {
    let response;

    try {
        response = await fetch(`${API_URL}/users/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telefon: phone,
                ime: ime,
                prezime: prezime
            }),
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom promjene telefonskog broja.");
    }

    return await response.json();
    
}

export async function logout() {
    let response;

    try {
        response = await fetch(`${API_URL}/logout`, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Nismo se mogli odjaviti.");
    }

    return await response.json();
}

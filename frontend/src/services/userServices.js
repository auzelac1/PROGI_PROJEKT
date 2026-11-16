let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "http://localhost:8000/api";
}

export async function getUsers() {
    let response;

    try {
        response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o korisnicima.");
    }

    return await response.json();
}

export async function removeUser(uuid) {
    let response;

    try {
        response = await fetch(`${API_URL}/users/${uuid}`, {
            method: 'DELETE',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom uklanjanja korisnika.");
    }

    return await response.json();
}

export async function saveUser(uuid, phone, role) {
    let response;

    try {
        response = await fetch(`${API_URL}/users/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                telefon: phone,
                uloga: role
            }),
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom uređivanja korisnika.");
    }

    return await response.json();
    
}
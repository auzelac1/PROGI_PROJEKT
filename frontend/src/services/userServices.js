let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "/api";
}

export async function getUsers() {
    let response;

    try {
        response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o korisnicima.");
    }

    return await response.json();
}

export async function saveUser(uuid, phone, role) {
    let response;

    try {
        response = await fetch(`${API_URL}/users/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                telefon: phone,
                uloga: role
            })
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom uređivanja korisnika.");
    }

    return await response.json();
    
}

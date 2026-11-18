let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "http://localhost:8000/api";
}

export async function getMe() {
    let response;
    const token = localStorage.getItem('jwt_token'); // Dohvaćamo spremljeni JWT token

    try {
        response = await fetch(`${API_URL}/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Šaljemo token u zaglavlju da backend zna tko je prijavljen
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }

    if (!response.ok) {
        throw new Error("Korisnik nije prijavljen.");
    }

    return await response.json();
}

export async function changePhoneNumber(uuid, phone) {
    let response;
    const token = localStorage.getItem('jwt_token');

    try {
        response = await fetch(`${API_URL}/users/${uuid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // I ovdje nam treba token za autorizaciju
            },
            body: JSON.stringify({
                telefon: phone
            })
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
    // Budući da se radi o JWT tokenima, odjava se najčešće obavlja na frontendu brisanjem tokena.
    // Ako imate backend rutu za logout, šaljemo i tu token.
    const token = localStorage.getItem('jwt_token');
    
    try {
        await fetch(`${API_URL}/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch {
        // Čak i ako backend javi grešku, mi na frontendu obavezno brišemo token
    }

    // Uvijek očisti token iz lokalne memorije preglednika kod odjave
    localStorage.removeItem('jwt_token');
    
    return { success: true };
}
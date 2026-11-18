let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "/api";
}

export async function getFleet(params = {}) {
    let response;
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_URL}/boats?${query}` : `${API_URL}/boats`;

    try {
        response = await fetch(url, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o floti.");
    }

    return await response.json();
}

export async function getBoat(id) {
    let response;

    try {
        response = await fetch(`${API_URL}/boats/${id}`, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o brodu.");
    }

    return await response.json();
}

export async function getPorts() {
    let response;

    try {
        response = await fetch(`${API_URL}/ports`, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o lukama.");
    }

    return await response.json();
}

export async function getCategories() {
    let response;

    try {
        response = await fetch(`${API_URL}/categories`, {
            method: 'GET',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo dohvatiti podatke o kategorijama.");
    }

    return await response.json();
}

export async function checkReservations(id) {
    let response;

    try {
        response = await fetch(`${API_URL}/boats/${id}/reservations`, {
            method: 'GET',
            credentials: "include"
        });

        let reservationsToReturn;

        if (response.ok) {
            let reservations = await response.json();

            reservationsToReturn = {
                reservations: reservations.length
            };
        } else {
            reservationsToReturn = {
                reservations: 0
            };
        }

        return reservationsToReturn;
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.")
    }
}

export async function setBoatStatus(id, status) {
    let response;

    try {
        if (status === false) {
            let responseCheckReservations = await checkReservations(id);
            if (responseCheckReservations.reservations > 0) {
                throw new Error();
            }
        }

        response = await fetch(`${API_URL}/boats/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status
            }),
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom " + (status ? "aktivacije" : "deaktivacije") + " plovila.");
    }

    return await response.json();
}

export async function cancelAllReservations(id) {
    let response;

    try {
        response = await fetch(`${API_URL}/boats/${id}/reservations`, {
            method: 'DELETE',
            credentials: "include"
        });
    } catch {
        throw new Error("Trenutno ne možemo pristupiti poslužitelju.");
    }

    if (!response.ok) {
        throw new Error("Trenutno ne možemo otkazati rezervacije.");
    }

    return await response.json();
}
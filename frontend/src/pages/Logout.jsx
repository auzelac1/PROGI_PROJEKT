import { useEffect } from "react";

import { useProfileContext } from "../contexts/ProfileContext";

import { logout } from "../services/profileServices";

let API_URL = import.meta.env.VITE_API_URL;
if (API_URL === undefined) {
    API_URL = "https://progiprojekt.vercel.app/api";
}

let URL = import.meta.env.VITE_URL;
if (URL === undefined) {
    URL = "https://progiprojekt.vercel.app";
}

function Logout() {

    const {loggedUser, setLoggedUser} = useProfileContext();

    useEffect(() => { 
        async function handleLogout() {
            

            try {
                const data = await logout();
            } catch (err) {
                 //
            } finally {
                setLoggedUser({uloga: "korisnik"}); // i obriši kolačić
                window.location.href = `${URL}/`;
            }
        }

        handleLogout();
    }, []);


}

export default Logout
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProfileContext } from "../contexts/ProfileContext";
import Ucitavanje from "../components/Ucitavanje";

import { logout } from "../services/profileServices";

function Logout() {
    const {setLoggedUser} = useProfileContext();
    const navigate = useNavigate();

    useEffect(() => { 
        async function handleLogout() {
            try {
                await logout();
            } finally {
                setLoggedUser({uloga: "korisnik"});
                navigate("/", {replace: true});
            }
        }

        handleLogout();
    }, [setLoggedUser, navigate]);

    return <Ucitavanje />;
}

export default Logout

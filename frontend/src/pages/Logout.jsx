import { useEffect } from "react";

import { useProfileContext } from "../contexts/ProfileContext";

import { logout } from "../services/profileServices";

function Logout() {

    const {loggedUser, setLoggedUser} = useProfileContext();

    useEffect(() => { 
        async function handleLogout() {
            try {
                const data = await logout();
                setLoggedUser(null);
            } catch (err) {
                //setLoggedUser(null), obriši kolačić
            } finally {
                //
            }
        }

        handleLogout();
    }, []);


}

export default Logout
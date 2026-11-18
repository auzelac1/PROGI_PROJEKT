import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from '../services/profileServices'

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext)

export const ProfileProvider = ({children}) => {

    const defaultUser = {
        uloga: "korisnik"
    };

    const [loggedUser, setLoggedUser] = useState(defaultUser);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState("");
    const [successProfile, setSuccessProfile] = useState("");

    useEffect(() => { //Dohvaćanje prijavljenog korisnika
        async function loadLoggedUser() {
            try {
                const data = await getMe();
                if (data !== null) {
                    setLoggedUser(data);
                }
            } catch (err) {
                setErrorProfile(err.message);
            } finally {
                setLoadingProfile(false);
            }
        }

        loadLoggedUser();
    }, []);

    let value = {
        loggedUser, 
        setLoggedUser,
        loadingProfile,
        setLoadingProfile,
        errorProfile,
        setErrorProfile,
        successProfile,
        setSuccessProfile
    }
    
    return <ProfileContext.Provider value={value}>
        {children}
    </ProfileContext.Provider>
}
import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from '../services/profileServices'

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext)

export const ProfileProvider = ({children}) => {

    const [loggedUser, setLoggedUser] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState("");
    const [successProfile, setSuccessProfile] = useState("");

    useEffect(() => { //Dohvaćanje prijavljenog korisnika
        async function loadLoggedUser() {
            try {
                const data = await getMe();
                setLoggedUser(data);
            } catch (err) {
                setLoggedUser(null);
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
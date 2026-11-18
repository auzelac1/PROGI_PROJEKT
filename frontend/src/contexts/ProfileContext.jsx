import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from '../services/profileServices';

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState("");
    const [successProfile, setSuccessProfile] = useState("");

    useEffect(() => { 
        async function loadLoggedUser() {
            try {
                // 1. Uhvati token s URL-a kada se vratiš s Google-a
                const params = new URLSearchParams(window.location.search);
                const tokenFromUrl = params.get('token');
                
                if (tokenFromUrl) {
                    localStorage.setItem('jwt_token', tokenFromUrl);
                    // Očisti URL da token ne ostane u adresnoj traci
                    window.history.replaceState({}, document.title, window.location.pathname);
                }

                // 2. Provjeri imamo li spremljen token
                const savedToken = localStorage.getItem('jwt_token');
                if (!savedToken) {
                    setLoadingProfile(false);
                    return; // Nema tokena -> Korisnik je gost, sve u redu!
                }

                // 3. Ako token postoji, pošalji ga na backend kroz getMe()
                const data = await getMe();
                setLoggedUser(data);
            } catch (err) {
                // Ako je token nevažeći ili istekao, očisti ga
                localStorage.removeItem('jwt_token');
                setLoggedUser(null);
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
    };
    
    return <ProfileContext.Provider value={value}>
        {children}
    </ProfileContext.Provider>;
};
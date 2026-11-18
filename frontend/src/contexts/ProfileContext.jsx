import { createContext, useState, useContext, useEffect } from "react";
import { getMe } from '../services/profileServices';

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

const defaultUser = { uloga: "korisnik" };

export const ProfileProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(defaultUser);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState("");
    const [successProfile, setSuccessProfile] = useState("");

    useEffect(() => {
        async function loadLoggedUser() {
            try {
                // 1. Uhvati token s URL-a kada se vratiš s Google-a
                const url = new URL(window.location.href);
                const tokenFromUrl = url.searchParams.get('token');

                if (tokenFromUrl) {
                    localStorage.setItem('jwt_token', tokenFromUrl);
                    // Očisti URL da token ne ostane u adresnoj traci
                    url.searchParams.delete('token');
                    url.searchParams.delete('uloga');
                    url.searchParams.delete('email');
                    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
                }

                // 2. Provjeri imamo li spremljen token
                const savedToken = localStorage.getItem('jwt_token');
                if (!savedToken) {
                    setLoadingProfile(false);
                    return; // Nema tokena -> Korisnik je gost, sve u redu!
                }

                // 3. Ako token postoji, pošalji ga na backend kroz getMe()
                const data = await getMe();
                if (data !== null) {
                    setLoggedUser(data);
                }
            } catch (err) {
                // Ako je token nevažeći ili istekao, očisti ga
                localStorage.removeItem('jwt_token');
                setLoggedUser(defaultUser);
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
    };

    return <ProfileContext.Provider value={value}>
        {children}
    </ProfileContext.Provider>;
};

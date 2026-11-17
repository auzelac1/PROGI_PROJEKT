import { createContext, useState, useContext, useEffect } from "react";

import { getUsers } from "../services/userServices";

const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext)

export const UsersProvider = ({children}) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => { //Dohvaćanje korisnika
        async function loadUsers() {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    let value = {
        users, 
        setUsers,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess
    }
    
    return <UsersContext.Provider value={value}>
        {children}
    </UsersContext.Provider>
}
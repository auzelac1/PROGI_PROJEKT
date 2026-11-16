import { createContext, useState, useContext, useEffect } from "react";

import { getFleet } from '../services/fleetServices';

const FleetContext = createContext();

export const useFleetContext = () => useContext(FleetContext);

export const FleetProvider = ({children}) => {

    const [fleet, setFleet] = useState([]);
    const [loadingFleet, setLoadingFleet] = useState(true);
    const [errorFleet, setErrorFleet] = useState("");
    const [successFleet, setSuccessFleet] = useState("");
    const [activeBoat, setActiveBoat] = useState({
        basics: {
            id_brod: "",
            id_model: "",
            id_luka: "",
            naziv: "",
            godina_proizvodnje: "",
            cijena_dan: "",
            vrijeme_preuzimanja: "",
            vrijeme_povratka: "",
            aktivan: ""
        },
        model: {
            id_model: "",
            tip: "",
            kategorija: "",
            proizvodjac: "",
            model: "",
            kapacitet: "",
            broj_kabina: "",
            broj_lezajeva: ""
        },
        port: {
            id_luka: "",
            ime_luka: ""
        },
        equipment: [],
        services: [],
        photos: []
    });

    useEffect(() => { //Dohvaćanje flote
        async function loadFleet() {
            try {
                const data = await getFleet();
                setFleet(data);
            } catch (err) {
                setErrorFleet(err.message);
            } finally {
                setLoadingFleet(false);
            }
        }

        loadFleet();
    }, []);

    let value = {
        fleet, 
        setFleet,
        loadingFleet,
        setLoadingFleet,
        errorFleet,
        setErrorFleet,
        successFleet,
        setSuccessFleet,
        activeBoat,
        setActiveBoat
    }
    
    return <FleetContext.Provider value={value}>
        {children}
    </FleetContext.Provider>
}
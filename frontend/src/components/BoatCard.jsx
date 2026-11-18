import { useFleetContext } from "../contexts/FleetContext";

function BoatCard({brod}) {

    const {setActiveBoat} = useFleetContext();
    
    return (
        <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className={brod.basics.aktivan ? "card boat-card" : "card boat-card boat-deactivated"}>
                <img src={brod.photos[0].url_foto} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h2 className="card-title playfair fst-italic fw-bold mb-3">{brod.basics.naziv}</h2>
                    <p className="card-text mb-3">
                        KATEGORIJA: <span className="fw-bold">{brod.model.kategorija}</span>
                        <br />
                        GODINA PROIZVODNJE: <span className="fw-bold">{brod.basics.godina_proizvodnje}</span>
                        <br />
                        PREUZIMANJE: <span className="fw-bold">{brod.basics.vrijeme_preuzimanja}</span>
                        <br />
                        POVRATAK: <span className="fw-bold">{brod.basics.vrijeme_povratka}</span>
                        <br />
                        MATIČNA LUKA: <span className="fw-bold text-uppercase">{brod.port.ime_luka}</span>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={() => setActiveBoat(brod)} className="button-tertiary button-tertiary-primary p-0" data-bs-toggle="modal" data-bs-target="#BoatInfoModal">Vidi više</button>
                        <h3 className="text-end m-0 card-title fw-bold">{brod.basics.cijena_dan} €</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatCard
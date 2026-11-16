import { useFleetContext } from "../contexts/FleetContext";


function BoatInfoModal({isLoading, changeStatus}) {

    const {activeBoat, setActiveBoat} = useFleetContext();

    if (activeBoat === null) {
        return "";
    }

    return (
        <div className="modal fade" id="BoatInfoModal" tabindex="-1" aria-labelledby="BoatInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-2 playfair fw-bold fst-italic" id="exampleModalLabel">{activeBoat.basics.naziv}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body row poppins">
                        <div className="col-md-6">
                            <h5 className="color-primary fw-bold text-uppercase">Podatci o modelu</h5>
                            <p className="text-uppercase">
                                Tip: <span className="fw-bold">{activeBoat.model.tip}</span>
                                <br />
                                Kategorija: <span className="fw-bold">{activeBoat.model.kategorija}</span>
                                <br />
                                Proizvođač: <span className="fw-bold">{activeBoat.model.proizvodjac}</span>
                                <br />
                                Model: <span className="fw-bold">{activeBoat.model.model}</span>
                                <br />
                                Kapacitet: <span className="fw-bold">{activeBoat.model.kapacitet}</span>
                                <br />
                                Kabine: <span className="fw-bold">{activeBoat.model.broj_kabina}</span>
                                <br />
                                Ležajevi: <span className="fw-bold">{activeBoat.model.broj_lezajeva}</span>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="color-primary fw-bold text-uppercase">Podatci o brodu</h5>
                            <p className="text-uppercase">
                                Naziv: <span className="fw-bold">{activeBoat.basics.naziv}</span>
                                <br />
                                Godina proizvodnje: <span className="fw-bold">{activeBoat.basics.godina_proizvodnje}</span>
                                <br />
                                Luka: <span className="fw-bold">{activeBoat.port.ime_luka}</span>
                                <br />
                                Cijena po danu: <span className="fw-bold">{activeBoat.basics.cijena_dan} €</span>
                                <br />
                                Vrijeme preuzimanja: <span className="fw-bold">{activeBoat.basics.vrijeme_preuzimanja}</span>
                                <br />
                                Vrijeme povratka: <span className="fw-bold">{activeBoat.basics.vrijeme_povratka}</span>
                                <br />
                                Aktivan: <span className="fw-bold">{activeBoat.basics.aktivan ? "DA" : "NE"}</span>
                                <br />
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="color-primary fw-bold text-uppercase">Oprema</h5>
                            <div className="row">
                                <div className="col-6">
                                    <ul>
                                        {activeBoat.equipment.filter((item, index) => index % 2 === 0).map((item) => (
                                            <li key={item.id_opreme}>{item.naziv}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul>
                                        {activeBoat.equipment.filter((item, index) => index % 2 !== 0).map((item) => (
                                            <li key={item.id_opreme}>{item.naziv}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="color-primary fw-bold text-uppercase">Dodatne usluge</h5>
                            <div className="row">
                                <div className="col-6">
                                    <ul>
                                        {activeBoat.services.filter((item, index) => index % 2 === 0).map((item) => (
                                            <li key={item.id_dodatne_usluge}>{item.naziv} <strong>({item.cijena} €)</strong></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul>
                                        {activeBoat.services.filter((item, index) => index % 2 !== 0).map((item) => (
                                            <li key={item.id_dodatne_usluge}>{item.naziv} <strong>({item.cijena} €)</strong></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <h5 className="color-primary fw-bold text-uppercase">Fotografije</h5>
                            <div id="BoatInfoImagesCarousel" className="carousel slide">
                                <div className="carousel-inner">
                                    {activeBoat.photos.map((photo, index) => (
                                        <div key={index} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                            <img src={photo.url_foto} alt="" className="d-block w-100" />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#BoatInfoImagesCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon carousel-img-prev" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#BoatInfoImagesCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon carousel-img-next" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="button-danger button fw-bold px-4" disabled={isLoading}>Učini neraspoloživim</button>
                        {activeBoat.basics.aktivan && <button type="button" onClick={changeStatus} className="button-danger button fw-bold px-4" disabled={isLoading}>Deaktiviraj</button>}
                        {!activeBoat.basics.aktivan && <button type="button" onClick={changeStatus} className="button button-success fw-bold px-4" disabled={isLoading}>Aktiviraj</button>}
                        <button type="button" className="button-primary button fw-bold px-4" disabled={isLoading}>Uredi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoatInfoModal
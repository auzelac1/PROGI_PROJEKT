import { Link } from 'react-router-dom'
import { useProfileContext } from '../contexts/ProfileContext'
import NavBarLinks from './NavBarLinks';
import NavBar from './NavBar';

function PublicHeader() {
    const {loggedUser} = useProfileContext();

    return (
        <header className="pregled-header sticky-top">
            <div className="container">
                {loggedUser.uloga !== "korisnik" && <div className="d-none d-lg-block" id='additionalNavigation'>
                    <NavBar user={loggedUser} brand={false}/>
                </div>}
                <nav className="navbar navbar-expand-lg py-3">
                    <div className="container-fluid px-0">
                        <Link className="pregled-brand text-decoration-none" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Natalia Charter</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#publicNavBar" aria-controls="publicNavBar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="d-lg-flex align-items-center gap-4 ms-auto d-none">
                            <Link to="/#vrste" className="nav-link">Kategorije plovila</Link>
                            <Link to="/#luke" className="nav-link">Luke polaska</Link>
                            <Link to="/#kako-radi" className="nav-link">Kako rezervirati?</Link>
                        </div>
                        {loggedUser.uloga === "korisnik" && <Link to="/prijava" className="d-none d-lg-block ms-4 btn btn-prijava">Prijava</Link>}
                        <div className="collapse navbar-collapse" id="publicNavBar">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <Link to="/#vrste" className="nav-link">Kategorije plovila</Link>
                                <Link to="/#luke" className="nav-link">Luke polaska</Link>
                                <Link to="/#kako-radi" className="nav-link">Kako rezervirati?</Link>
                                {/* 
                                Tonko: maknut ovaj dio zbog duplog pregleda na mobilnim uredajima
                                {loggedUser.uloga === "korisnik" && <Link to="/prijava" className="nav-link btn btn-prijava">Prijava</Link>}
                                */}
                                <NavBarLinks user={loggedUser}/>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default PublicHeader
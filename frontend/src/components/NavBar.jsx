import { Link } from 'react-router-dom'

import NavBarLinks from "./NavBarLinks"

function NavBar({user}) {

    return (
        <nav className="navbar navbar-expand-lg poppins">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Natalia Yachting
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <NavBarLinks user={user} />
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
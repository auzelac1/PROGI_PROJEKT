import { Link } from "react-router-dom";

function NavBarLinks({ user }) {
    // Sigurnosna provjera: ako je user null, uloga će biti null i neće se rušiti
    const uloga = user?.uloga ? user.uloga.toUpperCase() : null;

    return (
        <>
            {uloga === "VODITELJ" && (
                <li className="nav-item">
                    <Link to="/statistics" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 20V10M12 20V4M6 20V14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Statistika
                    </Link>
                </li>
            )}
            
            {uloga === "ADMIN" && (
                <li className="nav-item">
                    <Link className="nav-link" to="/fleet">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.25 7.25C12.9069 7.25 14.25 5.90685 14.25 4.25C14.25 2.59315 12.9069 1.25 11.25 1.25C9.59315 1.25 8.25 2.59315 8.25 4.25C8.25 5.90685 9.59315 7.25 11.25 7.25ZM11.25 7.25V21.25M11.25 21.25C8.59784 21.25 6.0543 20.1964 4.17893 18.3211C2.30357 16.4457 1.25 13.9022 1.25 11.25H4.25M11.25 21.25C13.9022 21.25 16.4457 20.1964 18.3211 18.3211C20.1964 16.4457 21.25 13.9022 21.25 11.25H18.25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Flota
                    </Link>
                </li>
            )}

            {uloga === "ADMIN" && (
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_44_242)">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_44_242">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Korisnici
                    </Link>
                </li>
            )}

            {uloga === "ADMIN" && (
                <li className="nav-item">
                    <Link to="/reservations" className="nav-link">
                        <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.25 19.25L8.25 14.25L1.25 19.25V3.25C1.25 2.71957 1.46071 2.21086 1.83579 1.83579C2.21086 1.46071 2.71957 1.25 3.25 1.25H13.25C13.7804 1.25 14.2891 1.46071 14.6642 1.83579C15.0393 2.21086 15.25 2.71957 15.25 3.25V19.25Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Rezervacije
                    </Link>
                </li>
            )}

            {(uloga === "ADMIN" || uloga === "DJELATNIK") && (
                <li className="nav-item">
                    <Link to="/schedule" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Preuzimanja
                    </Link>
                </li>
            )}

            {uloga === "KLIJENT" && (
                <li className="nav-item">
                    <Link to="/my-reservations" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Moje rezervacije
                    </Link>
                </li>
            )}

            {user && (
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.25 19.25V17.25C17.25 16.1891 16.8286 15.1717 16.0784 14.4216C15.3283 13.6714 14.3109 13.25 13.25 13.25H5.25C4.18913 13.25 3.17172 13.6714 2.42157 14.4216C1.67143 15.1717 1.25 16.1891 1.25 17.25V19.25M13.25 5.25C13.25 7.45914 11.4591 9.25 9.25 9.25C7.04086 9.25 5.25 7.45914 5.25 5.25C5.25 3.04086 7.04086 1.25 9.25 1.25C11.4591 1.25 13.25 3.04086 13.25 5.25Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        {user.ime} {user.prezime}
                    </Link>
                </li>
            )}

            {user ? (
                <li className="nav-item">
                    <Link to="/logout" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 7L21 12L16 17M21 12H9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Odjavi se
                    </Link>
                </li>
            ) : (
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 7L15 12L10 17M15 12H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke="#012A4A"/>
                        </svg>
                        Prijava
                    </Link>
                </li>
            )}
        </>
    );
}

export default NavBarLinks;
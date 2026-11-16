import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function Layout({user}) {
    return (
        <>
            <NavBar user={user} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
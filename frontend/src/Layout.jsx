import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function Layout({user}) {
    return (
        <>
            <div id="styleCss">
                <NavBar user={user} />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout
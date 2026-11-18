import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { useStyles } from './useStyles';
import styleCss from './style.css?url';

function Layout({user}) {
    useStyles(styleCss);

    return (
        <>
            <div id="styleCss">
                <NavBar user={user} brand={true}/>
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout
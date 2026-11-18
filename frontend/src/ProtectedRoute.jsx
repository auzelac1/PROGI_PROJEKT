import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute({allowedRoles, user}) {

    if (!user || user.uloga?.toLowerCase() === "korisnik") {
       return <Navigate to="/prijava" replace/> 
    }

    if (!allowedRoles.some(role => role.toLowerCase() === user.uloga?.toLowerCase())) {
        return <Navigate to="/" replace />
    }

    return <Outlet />

}

export default ProtectedRoute

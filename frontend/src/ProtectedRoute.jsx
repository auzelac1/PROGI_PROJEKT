import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute({allowedRoles, user}) {

    if (!user) {
       return <Navigate to="/prijava" replace/> 
    }

    if (!allowedRoles.includes(user.uloga)) {
        return <Navigate to="/" replace />
    }

    return <Outlet />

}

export default ProtectedRoute
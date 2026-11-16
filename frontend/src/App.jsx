import './style.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './pages/Profile';
/* import Home from './pages/Home'; */
import Error404 from './pages/Error404';
import Users from './pages/Users'
import Login from './pages/Login'
import Fleet from './pages/Fleet'
import Logout from './pages/Logout'

import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout'

import { useProfileContext } from './contexts/ProfileContext';
import { UsersProvider } from './contexts/UsersContext';
import { FleetProvider } from './contexts/FleetContext';

function App() {

  const { loggedUser, setLoggedUser, loadingProfile } = useProfileContext();

  if (loadingProfile) {
    return <h1>Učitavanje profila...</h1>
  }

  let user = {
    uloga: "KORISNIK"
  }

  if (loggedUser !== null) {
    user = loggedUser;
  }

  return (
    
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["KORISNIK"]} user={user} />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<Layout user={user} />}>
            {/* <Route path='/' element={<Home />} /> */}
            <Route element={<ProtectedRoute allowedRoles={["KLIJENT", "ADMIN", "DJELATNIK", "VODITELJ"]} user={user} />}>
              <Route path='/profile' element={<Profile user={user} />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} user={user} />}>
              <Route path='/users' element={
                <UsersProvider>
                  <Users />
                </UsersProvider>
                } />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} user={user} />}>
              <Route path='/fleet' element={
                <FleetProvider>
                  <Fleet />
                </FleetProvider>
              } />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["KLIJENT", "ADMIN", "DJELATNIK", "VODITELJ"]} user={user} />}>
              <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='*' element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import Users from './pages/Users'
import Login from './pages/Login'
import Fleet from './pages/Fleet'
import Logout from './pages/Logout'

import HomePage from './pages/HomePage';
import ShipDetailsPage from './pages/ShipDetailsPage';

import { PretragaStranica, RezervacijaStranica } from './privremeno/Stranice';

import Ucitavanje from './components/Ucitavanje';

import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout'

import { useProfileContext } from './contexts/ProfileContext';
import { UsersProvider } from './contexts/UsersContext';
import { FleetProvider } from './contexts/FleetContext';

function App() {

  const { loggedUser, setLoggedUser, loadingProfile } = useProfileContext();

  if (loadingProfile) {
    return <Ucitavanje />
  }

  let user = loggedUser;

  return (
    
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={["KORISNIK"]} user={user} />}>
            <Route path='/prijava' element={<Login />} />
          </Route>
          <Route element={<Layout user={user} />}>
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
            {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} user={user} />}>
              <Route path='/fleet' element={
                <FleetProvider>
                  <Fleet />
                </FleetProvider>
              } />
            </Route> */}
            <Route element={<ProtectedRoute allowedRoles={["KLIJENT", "ADMIN", "DJELATNIK", "VODITELJ"]} user={user} />}>
              <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='*' element={<Error404 />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/plovila/:id" element={<ShipDetailsPage />} />
          <Route path="/plovila" element={<PretragaStranica />} />
          <Route path="/rezervacija/:id" element={<RezervacijaStranica />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App

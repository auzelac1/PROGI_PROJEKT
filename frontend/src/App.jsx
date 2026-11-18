
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import Users from './pages/Users'
import Login from './pages/Login'
import Logout from './pages/Logout'

import HomePage from './pages/HomePage';
import ShipDetailsPage from './pages/ShipDetailsPage';

import { PretragaStranica, RezervacijaStranica } from './privremeno/Stranice';

import Ucitavanje from './components/Ucitavanje';

import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout'

import { useProfileContext } from './contexts/ProfileContext';
import { UsersProvider } from './contexts/UsersContext';

function App() {

  const { loggedUser, loadingProfile } = useProfileContext();

  if (loadingProfile) {
    return <Ucitavanje />
  }

  let user = loggedUser;

  return (

      <BrowserRouter>
        <Routes>
          <Route path='/prijava' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Layout user={user} />}>
            <Route element={<ProtectedRoute allowedRoles={["klijent", "admin", "djelatnik", "voditelj"]} user={user} />}>
              <Route path='/profile' element={<Profile user={user} />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["admin"]} user={user} />}>
              <Route path='/users' element={
                <UsersProvider>
                  <Users />
                </UsersProvider>
                } />
            </Route>
            {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} user={user} />}>
              <Route path='/fleet' element={
                <FleetProvider>
                  <Fleet />
                </FleetProvider>
              } />
            </Route> */}
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<Error404 />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/plovila/:id" element={<ShipDetailsPage />} />
          <Route path="/plovila" element={<PretragaStranica />} />
          <Route path="/rezervacija/:id" element={<RezervacijaStranica />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App

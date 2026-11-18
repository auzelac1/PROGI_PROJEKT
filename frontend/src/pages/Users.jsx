import UsersTable from "../components/UsersTable"
import PageTitle from "../components/PageTitle"

import { useUsersContext } from "../contexts/UsersContext";

function Users() {
    
    const {users, error} = useUsersContext();

    let clients = 0;
    let admins = 0;
    let employees = 0;
    let managers = 0;

    if (!error) {
        users.map((user) => {
            if (user.uloga == 'klijent') {
                clients++;
            } else if (user.uloga == 'admin') {
                admins++;
            } else if (user.uloga == 'djelatnik') {
                employees++;
            } else if (user.uloga == 'voditelj') {
                managers++;
            }
        })
    }

    return (
        <>
            <PageTitle title="Korisnici" text={["KLIJENTI: ", <strong>{clients}</strong>, " | ADMINISTRATORI: ", <strong>{admins}</strong>, " | DJELATNICI: ", <strong>{employees}</strong>, " | VODITELJI: ", <strong>{managers}</strong>]}/>
            <UsersTable />
        </>
    )
}

export default Users
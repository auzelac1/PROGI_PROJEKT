import { useState } from 'react';

import EditUserModal from "./EditUserModal"
import Alert from './Alert';

import { useUsersContext } from '../contexts/UsersContext';
import { useProfileContext } from '../contexts/ProfileContext';

function UsersTable() {
    const {loggedUser} = useProfileContext();

    const {users, setUsers, loading, setLoading, error, setError, success, setSuccess} = useUsersContext();

    const [activeUser, setActiveUser] = useState({
        uuid: "",
        ime: "",
        prezime: "",
        email: "",
        uloga: "",
        telefon: ""
    });

    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchPhone, setSearchPhone] = useState("");
    const [searchRole, setSearchRole] = useState("");

    const filteredUsers = users.filter(user => {

        const fullName = `${user.ime ?? ""} ${user.prezime ?? ""}`;

        return (
            fullName.toLowerCase().includes(searchName.toLowerCase().trim()) &&
            user.email.toLowerCase().includes(searchEmail.toLowerCase().trim()) &&
            (user.telefon ?? "").toLowerCase().includes(searchPhone.toLowerCase().trim()) &&
            user.uloga.toLowerCase().includes(searchRole.toLowerCase())
        );
    });

    return (
        <div className="container poppins">
            {error && <Alert alertText={error} alertType="danger" onClose={() => {setError("")}}/>}
            {success && <Alert alertText={success} alertType="success" onClose={() => {setSuccess("")}}/>}
            <div className="row user-search">
                <div className="col-md-3 col-6">
                    <input type="text" className="form-control fw-bold" name='NameFamilyNameSearch' placeholder='Pretraži po nazivu' onChange={(e) => setSearchName(e.target.value)}/>
                </div>
                <div className="col-md-3 col-6">
                    <input type="text" className="form-control fw-bold" name='emailSearch' placeholder='Pretraži po emailu' onChange={(e) => setSearchEmail(e.target.value)}/>
                </div>
                <div className="col-md-3 col-6">
                    <input type="text" className="form-control fw-bold" name='phoneSearch' placeholder='Pretraži po telefonu' onChange={(e) => setSearchPhone(e.target.value)}/>
                </div>
                <div className="col-md-3 col-6">
                    <select name="roleSearch" className='form-control fw-bold' onChange={(e) => setSearchRole(e.target.value)}>
                        <option value="" defaultChecked>Pretraži po ulozi</option>
                        <option value="klijent">Klijent</option>
                        <option value="admin">Administrator</option>
                        <option value="djelatnik">Djelatnik</option>
                        <option value="voditelj">Voditelj</option>
                    </select>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Uloga</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr><td colSpan="6" className='text-center'>Dohvaćamo korisnike...</td></tr>}

                        {filteredUsers.map(user => (
                            <tr key={user.uuid}>
                                <td>{user.ime}</td>
                                <td>{user.prezime}</td>
                                <td>{user.email}</td>
                                <td>{user.telefon}</td>
                                <td>{user.uloga}</td>
                                {user.uuid !== loggedUser.uuid ?
                                <td>
                                    <button onClick={() => setActiveUser(user)} className="button-tertiary button-tertiary-primary" data-bs-toggle="modal" data-bs-target="#EditUserModal">
                                        Uredi
                                    </button>
                                </td> : <td></td>}
                            </tr>
                        ))}

                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Nema pronađenih korisnika.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <EditUserModal activeUser={activeUser} />
        </div>
    )

}

export default UsersTable
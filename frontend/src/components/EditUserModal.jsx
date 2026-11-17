import {useState, useEffect} from 'react';
import { Modal } from 'bootstrap';

import { saveUser } from '../services/userServices';

import Alert from './Alert';

import { useUsersContext } from '../contexts/UsersContext';
import { useProfileContext } from '../contexts/ProfileContext';

function EditUserModal({activeUser}) {

    const {loggedUser, setLoggedUser} = useProfileContext();

    const [phoneNumber, setPhoneNumber] = useState(activeUser.telefon);
    const [role, setRole] = useState(activeUser.uloga);

    const {setUsers, error, setError, success, setSuccess} = useUsersContext();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPhoneNumber(activeUser.telefon || "");
        setRole(activeUser.uloga);
    }, [activeUser.telefon]);

    const [phoneError, setPhoneError] = useState(false);

    async function saveChanges() {
        setLoading(true);
        setPhoneError(false);

        const formattedPhone = phoneNumber.replace(/[\s()-]/g, "");
        const phoneRegex = /^(\+[1-9]\d{7,14})?$/;
        if (!phoneRegex.test(formattedPhone)) {
            setPhoneError(true);
            setLoading(false);
            return;
        }

        try {
            setError("");
            setSuccess("");
            const data = await saveUser(activeUser.uuid, phoneNumber, role);
            setSuccess("Izmjene su uspješno pohranjene.");
            const modalElement = document.getElementById("EditUserModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }, 150);

            if (loggedUser.uuid === activeUser.uuid) {
                const editedUser = {
                    uuid: loggedUser.uuid,
                    ime: loggedUser.ime,
                    prezime: loggedUser.prezime,
                    email: loggedUser.email,
                    telefon: phoneNumber,
                    uloga: role
                }
                setLoggedUser(editedUser);
            }

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.uuid === activeUser.uuid
                        ? {
                            uuid: user.uuid,
                            ime: user.ime,
                            prezime: user.prezime,
                            email: user.email,
                            telefon: phoneNumber,
                            uloga: role
                        }
                        : user
                )
            );
        } catch (err) {
            const modalElement = document.getElementById("EditUserModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal fade" id="EditUserModal" tabIndex="-1" aria-labelledby="EditUserModal" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="EditUserModal">Uredi korisnika</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {phoneError && <Alert alertType="danger ms-0" alertText={["Broj telefona mora biti u obliku ", <strong>+1234567890</strong>, " i ne smije biti dulji od ", <strong>15</strong>, " znamenki."]} onClose={() => setPhoneError(false)} />}
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 ps-0">
                                    <label htmlFor="ime" className="ms-2 mb-2">Ime:</label>
                                    <input type="text" className="form-control fw-bold" name="ime" id="ime" value={activeUser.ime} disabled />
                                    <label htmlFor="prezime" className="ms-2 mb-2">Prezime:</label>
                                    <input type="text" className="form-control fw-bold" name="prezime" id="prezime" value={activeUser.prezime} disabled />
                                    <label htmlFor="uloga" className="ms-2 mb-2">Uloga:</label>
                                    <select name="uloga" id="uloga" className="form-control fw-bold" onChange={(e) => {e.target.blur(); setRole(e.target.value);}} disabled={loading}>
                                        <option value="KLIJENT" selected={activeUser.uloga.toLowerCase() === "klijent"}>Klijent</option>
                                        <option value="ADMIN" selected={activeUser.uloga.toLowerCase() === "admin"}>Administrator</option>
                                        <option value="DJELATNIK" selected={activeUser.uloga.toLowerCase() === "djelatnik"}>Djelatnik</option>
                                        <option value="VODITELJ" selected={activeUser.uloga.toLowerCase() === "voditelj"}>Voditelj</option>
                                    </select>
                                </div>
                                <div className="col-md-6 ps-0">
                                    <label htmlFor="email" className="ms-2 mb-2">Email:</label>
                                    <input type="text" className="form-control fw-bold" name="email" id="email" value={activeUser.email} disabled />
                                    <label htmlFor="phone" className="ms-2 mb-2">Telefon:</label>
                                    <input type="text" className="form-control fw-bold" name="phone" id="phone" placeholder='npr. +385 12 345 6789' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  disabled={loading}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={saveChanges} className="button-primary button fw-bold px-4" disabled={loading}>Potvrdi izmjene</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditUserModal
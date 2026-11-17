import { useState, useEffect } from "react"
import { Modal } from "bootstrap"

import { useProfileContext } from "../contexts/ProfileContext";

import { changePhoneNumber } from "../services/profileServices";

import Alert from "./Alert";

function PhoneNumberModal({uuid}) {

    const {loggedUser, setLoggedUser, setErrorProfile, setSuccessProfile} = useProfileContext();

    const [newPhone, setNewPhone] = useState(loggedUser.telefon);
    const [savingPhone, setSavingPhone] = useState(false);

    useEffect(() => {
        setNewPhone(loggedUser.telefon || "");
    }, [loggedUser.telefon]);

    const [phoneError, setPhoneError] = useState(false);

    async function handleChangePhoneNumber() {
        setSavingPhone(true);
        //setPhoneError(false);

        const formattedPhone = newPhone.replace(/[\s()-]/g, "");
        const phoneRegex = /^(\+[1-9]\d{7,14})?$/;
        if (!phoneRegex.test(formattedPhone)) {
            setPhoneError(true);
            setSavingPhone(false);
            return;
        }

        try {
            setErrorProfile("");
            setSuccessProfile("");
            const data = await changePhoneNumber(uuid, newPhone);
            const editedUser = {
                uuid: loggedUser.uuid,
                ime: loggedUser.ime,
                prezime: loggedUser.prezime,
                email: loggedUser.email,
                telefon: newPhone,
                uloga: loggedUser.uloga
            }
            setLoggedUser(editedUser);
            setSuccessProfile("Broj telefona uspješno je promijenjen.");
            const modalElement = document.getElementById("PhoneNumberModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
            setPhoneError(false);
        } catch (err) {
            const modalElement = document.getElementById("PhoneNumberModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
            setErrorProfile(err.message);
        } finally {
            setSavingPhone(false);
        }
    }

    return (
        <div className="modal fade" id="PhoneNumberModal" tabindex="-1" aria-labelledby="PhoneNumberModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="PhoneNumberModal">Uredi broj telefona</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {phoneError && <Alert alertType="danger" alertText={["Broj telefona mora biti u obliku ", <strong>+1234567890</strong>, " i ne smije biti dulji od ", <strong>15</strong>, " znamenki."]} onClose={() => setPhoneError(false)} />}
                        <label htmlFor="phone-number" className="ms-2 mb-2">Broj telefona:</label>
                        <input type="text" className="form-control fw-bold" name="phoneNumber" id="phone-number" placeholder="npr. +385 12 345 6789" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} disabled={savingPhone}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={() => handleChangePhoneNumber()} className="button button-primary fw-bold px-4" disabled={savingPhone}>Potvrdi izmjene</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PhoneNumberModal
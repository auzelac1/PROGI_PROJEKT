import { useState } from "react";
import { Modal } from "bootstrap";

import PageTitle from "../components/PageTitle"
import Alert from "../components/Alert";
import BoatCard from "../components/BoatCard";
import BoatInfoModal from "../components/BoatInfoModal";
import DeleteModal from "../components/DeleteModal";

import {useFleetContext} from '../contexts/FleetContext'

import { checkReservations, setBoatStatus, cancelAllReservations } from "../services/fleetServices";

function Fleet() {

    const {fleet, setFleet, loadingFleet, setLoadingFleet, errorFleet, setErrorFleet, successFleet, setSuccessFleet, activeBoat, setActiveBoat} = useFleetContext();

    const [loadingBoatState, setLoadingBoatState] = useState(false);
    const [reservationsToCancel, setReservationsToCancel] = useState(0);

    async function handleSetBoatStatus(id, status) {
        try {
            setErrorFleet("");
            setSuccessFleet("");
            setLoadingBoatState(true);
            let data;
            if (status === false) {
                data = await checkReservations(id);
                if (data.reservations > 0) {
                    setReservationsToCancel(data.reservations);
                    const boatInfoModalElement = document.getElementById("BoatInfoModal");
                    const deleteModalElement = document.getElementById("DeleteModal");

                    const boatInfoModal = Modal.getInstance(boatInfoModalElement);
                    const deleteModal = Modal.getOrCreateInstance(deleteModalElement);

                    boatInfoModalElement.addEventListener("hidden.bs.modal", function () {
                        deleteModal.show();
                    }, { once: true });

                    boatInfoModal.hide();
                    return;
                }
            }

            data = await setBoatStatus(id, status);
            setSuccessFleet(["Plovilo ", <strong>{fleet.find((brod) => brod.basics.id_brod === id).basics.naziv}</strong>," uspješno je " + (status ? "aktivirano." : "deaktivirano.")]);
            setFleet(prevFleet =>
                prevFleet.map(brod => {
                    if (brod.basics.id_brod !== id) return brod;
                    return {
                        ...brod,
                        basics: {
                            ...brod.basics,
                            aktivan: status
                        }
                    };
                })
            );
            const modalElement = document.getElementById("BoatInfoModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalElement.addEventListener('hidden.bs.modal', () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }, { once: true });
            modalInstance?.hide();
        } catch (err) {
            setErrorFleet(err.message);
            const modalElement = document.getElementById("BoatInfoModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalInstance?.hide();
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            }, 200);
        } finally {
            setLoadingBoatState(false);
        }
    }

    async function handleReservationCanceling() {
        try {
            setErrorFleet("");
            setSuccessFleet("");
            setLoadingBoatState(true);
            let data = await cancelAllReservations(activeBoat.basics.id_brod);
            data = await setBoatStatus(activeBoat.basics.id_brod, false);
            setSuccessFleet(["Plovilo ", <strong>{fleet.find((brod) => brod.basics.id_brod === activeBoat.basics.id_brod).basics.naziv}</strong>," uspješno je deaktivirano."]);
            setFleet(prevFleet =>
                prevFleet.map(brod => {
                    if (brod.basics.id_brod !== activeBoat.basics.id_brod) return brod;
                    return {
                        ...brod,
                        basics: {
                            ...brod.basics,
                            aktivan: false
                        }
                    };
                })
            );
            const modalElement = document.getElementById("DeleteModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalElement.addEventListener('hidden.bs.modal', () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }, { once: true });
            modalInstance?.hide();
        } catch (err) {
            setErrorFleet(err.message);
            const modalElement = document.getElementById("DeleteModal");
            const modalInstance = Modal.getInstance(modalElement);
            modalElement.addEventListener('hidden.bs.modal', () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }, { once: true });
            modalInstance?.hide();
        } finally {
            setLoadingBoatState(false);
        }
    }

    let active = 0;
    let inactive = 0;

    fleet.map(boat => {
        if (boat.basics.aktivan) {
            active++;
        } else {
            inactive++;
        }
    })

    return (
        <>
            <PageTitle title="Flota" text={['BRODOVI U FLOTI: ', <strong>{fleet.length}</strong>, " | AKTIVNI: ", <strong>{active}</strong>, " | NEAKTIVNI: ", <strong>{inactive}</strong>]}/>
            <div className="container poppins">
                {errorFleet && <Alert alertText={errorFleet} alertType="danger" onClose={() => setErrorFleet("")} />}
                {successFleet && <Alert alertText={successFleet} alertType="success" onClose={() => setSuccessFleet("")} />}
                <div className="row">
                    {fleet.map(boat => (
                        <BoatCard key={boat.basics.id_brod} brod={boat} />
                    ))}
                </div>
            </div>
            <BoatInfoModal isLoading={loadingBoatState} changeStatus={() => handleSetBoatStatus(activeBoat.basics.id_brod, !activeBoat.basics.aktivan)}/>
            <DeleteModal title="Deaktivacija broda" text={['Deaktivacijom broda ', <strong>{activeBoat.basics.naziv}</strong>, ' otkazat će se sljedeći broj rezervacija: ', <strong>{reservationsToCancel}</strong>, "."]} onConfirm={() => handleReservationCanceling()}/>
        </>
    )
}

export default Fleet
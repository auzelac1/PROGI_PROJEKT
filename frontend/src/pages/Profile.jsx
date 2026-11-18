import Alert from "../components/Alert";
import ProfileInfo from "../components/ProfileInfo";
import PageTitle from "../components/PageTitle";

import { useProfileContext } from "../contexts/ProfileContext";

function Profile() {
    const {loggedUser, errorProfile, setErrorProfile, successProfile, setSuccessProfile} = useProfileContext();

    return (
        <>
            <PageTitle title="Moj profil" />
            <div className="container poppins">
                {errorProfile && <Alert alertText={errorProfile} alertType="danger" onClose={() => {setErrorProfile("")}}/>}
                {successProfile && <Alert alertText={successProfile} alertType="success" onClose={() => {setSuccessProfile("")}}/>}
                {(loggedUser.telefon === null || loggedUser.telefon === "") && <Alert alertType="warning" alertText={[<strong>Molimo unesite broj telefona!</strong>, " Bez unesenog broja telefona nećete biti u mogućnosti napraviti rezervaciju!"]}/>}
            </div>
            <ProfileInfo user={loggedUser} />
        </>
    )
}

export default Profile
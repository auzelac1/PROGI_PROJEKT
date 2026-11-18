import { useState } from "react";
import PhoneNumberModal from "./PhoneNumberModal"

function ProfileInfo({user}) {
    const [failedPicture, setFailedPicture] = useState(null);
    const showPicture = user.picture && user.picture !== failedPicture;
    //regex za pronalazenje slike u google urlu, slaba je bila kvaliteta prije
    const googlePictureSizePattern = /=s\d+(?=-|$)/;
    //prije je google slao 96x96 rezoluciju, sada se trazi od 552px
    const profilePictureUrl = user.picture?.replace(googlePictureSizePattern, "=s552");

    return (
        <div className="container profile poppins">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-picture">
                        {showPicture ? (
                            <img
                                src={profilePictureUrl}
                                alt="Profilna slika"
                                referrerPolicy="no-referrer"
                                onError={() => setFailedPicture(user.picture)}
                            />
                        ) : (
                            <p className="m-0">
                                {user.ime?.charAt(0).toUpperCase() ?? ""}
                                {user.prezime?.charAt(0).toUpperCase() ?? ""}
                            </p>
                        )}
                    </div>
                </div>
                <div className="col-md-8 profile-info">
                    <div>
                        <span className="fw-bold">
                            {user.ime} {user.prezime}
                        </span>
                        <br />
                        <span className="email">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.3332 7.99992C29.3332 6.53325 28.1332 5.33325 26.6665 5.33325H5.33317C3.8665 5.33325 2.6665 6.53325 2.6665 7.99992M29.3332 7.99992V23.9999C29.3332 25.4666 28.1332 26.6666 26.6665 26.6666H5.33317C3.8665 26.6666 2.6665 25.4666 2.6665 23.9999V7.99992M29.3332 7.99992L15.9998 17.3333L2.6665 7.99992" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#012A4A"/>
                            </svg>
                            {user.email}
                        </span>
                        <br />
                        <span className="phone">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.3334 22.56V26.56C29.3349 26.9313 29.2589 27.2989 29.1101 27.6391C28.9613 27.9793 28.7431 28.2848 28.4695 28.5358C28.1959 28.7868 27.8728 28.9779 27.5211 29.0969C27.1693 29.2159 26.7966 29.2601 26.4267 29.2266C22.3239 28.7808 18.3827 27.3788 14.9201 25.1333C11.6985 23.0862 8.96719 20.3549 6.92007 17.1333C4.66671 13.6549 3.2644 9.69463 2.82674 5.5733C2.79342 5.20459 2.83724 4.83298 2.95541 4.48213C3.07357 4.13128 3.2635 3.80889 3.51309 3.53546C3.76269 3.26204 4.06648 3.04358 4.40513 2.894C4.74378 2.74441 5.10986 2.66698 5.48007 2.66663H9.48007C10.1271 2.66026 10.7545 2.8894 11.2451 3.31134C11.7357 3.73328 12.0562 4.31923 12.1467 4.95997C12.3156 6.24006 12.6287 7.49694 13.0801 8.70663C13.2595 9.18387 13.2983 9.70252 13.1919 10.2011C13.0856 10.6998 12.8386 11.1574 12.4801 11.52L10.7867 13.2133C12.6848 16.5514 15.4487 19.3152 18.7867 21.2133L20.4801 19.52C20.8426 19.1615 21.3003 18.9144 21.7989 18.8081C22.2975 18.7018 22.8162 18.7406 23.2934 18.92C24.5031 19.3714 25.76 19.6845 27.0401 19.8533C27.6878 19.9447 28.2793 20.2709 28.7021 20.77C29.125 21.269 29.3496 21.9061 29.3334 22.56Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#012A4A"/>
                            </svg>
                            {user.telefon}
                        </span>
                        <br />
                        <span className="role">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.0002 29.3334C16.0002 29.3334 26.6668 24.0001 26.6668 16.0001V6.66675L16.0002 2.66675L5.3335 6.66675V16.0001C5.3335 24.0001 16.0002 29.3334 16.0002 29.3334Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#012A4A"/>
                            </svg>
                            {user.uloga.toLowerCase()}
                        </span>
                        <br />
                        <button type="button" className="change-phone button-tertiary button-tertiary-primary p-0" data-bs-toggle="modal" data-bs-target="#PhoneNumberModal">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6665 5.33331H5.33317C4.62593 5.33331 3.94765 5.61426 3.44755 6.11436C2.94746 6.61446 2.6665 7.29273 2.6665 7.99998V26.6666C2.6665 27.3739 2.94746 28.0522 3.44755 28.5523C3.94765 29.0524 4.62593 29.3333 5.33317 29.3333H23.9998C24.7071 29.3333 25.3854 29.0524 25.8855 28.5523C26.3856 28.0522 26.6665 27.3739 26.6665 26.6666V17.3333M24.6665 3.33331C25.1969 2.80288 25.9164 2.50488 26.6665 2.50488C27.4166 2.50488 28.1361 2.80288 28.6665 3.33331C29.1969 3.86374 29.4949 4.58316 29.4949 5.33331C29.4949 6.08346 29.1969 6.80288 28.6665 7.33331L15.9998 20L10.6665 21.3333L11.9998 16L24.6665 3.33331Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="#012A4A"/>
                            </svg>
                            Uredi profil
                        </button>
                    </div>
                </div>
            </div>
            <PhoneNumberModal uuid={user.uuid} />
        </div>
    )
}

export default ProfileInfo
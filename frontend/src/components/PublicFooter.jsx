
function PublicFooter() {
    return (
        <footer className="site-footer">
          <div className="container poppins px-4 px-md-0">
            <div className="row">
              <div className="col-md-4 d-flex align-items-start">
                <img src="../boat-blue.svg" alt="" className='mx-md-4 me-4' width="15%"/>
                <div className='pt-2 pt-md-1'>
                  <h3 className="fw-bold mb-0">Natalia Charter</h3>
                  <p>Sva prava pridržana &copy; 2026.</p>
                </div>
              </div>
              <div className="col-md-4 mt-4 mt-md-0">
                <p className="fw-bold text-uppercase pb-2">Kontakt</p>
                <div className="footer-location">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_53_185)">
                      <path d="M28 13.3333C28 22.6666 16 30.6666 16 30.6666C16 30.6666 4 22.6666 4 13.3333C4 10.1507 5.26428 7.09841 7.51472 4.84797C9.76516 2.59753 12.8174 1.33325 16 1.33325C19.1826 1.33325 22.2348 2.59753 24.4853 4.84797C26.7357 7.09841 28 10.1507 28 13.3333ZM20 13.3333C20 15.5424 18.2091 17.3333 16 17.3333C13.7909 17.3333 12 15.5424 12 13.3333C12 11.1241 13.7909 9.33325 16 9.33325C18.2091 9.33325 20 11.1241 20 13.3333Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_53_185">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="footer-white">
                    Medulićeva ulica 14C<br />
                    10 000 Zagreb<br />
                    Hrvatska
                  </p>
                </div>
                <div className="footer-phone">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3334 22.56V26.56C29.3349 26.9313 29.2589 27.2989 29.1101 27.6391C28.9613 27.9793 28.7431 28.2848 28.4695 28.5358C28.1959 28.7868 27.8728 28.9779 27.5211 29.0969C27.1693 29.2159 26.7966 29.2601 26.4267 29.2266C22.3239 28.7808 18.3827 27.3788 14.9201 25.1333C11.6985 23.0862 8.96719 20.3549 6.92007 17.1333C4.66671 13.6549 3.2644 9.69463 2.82674 5.5733C2.79342 5.20459 2.83724 4.83298 2.95541 4.48213C3.07357 4.13128 3.2635 3.80889 3.51309 3.53546C3.76269 3.26204 4.06648 3.04358 4.40513 2.894C4.74378 2.74441 5.10986 2.66698 5.48007 2.66663H9.48007C10.1271 2.66026 10.7545 2.8894 11.2451 3.31134C11.7357 3.73328 12.0562 4.31923 12.1467 4.95997C12.3156 6.24006 12.6287 7.49694 13.0801 8.70663C13.2595 9.18387 13.2983 9.70252 13.1919 10.2011C13.0856 10.6998 12.8386 11.1574 12.4801 11.52L10.7867 13.2133C12.6848 16.5514 15.4487 19.3152 18.7867 21.2133L20.4801 19.52C20.8426 19.1615 21.3003 18.9144 21.7989 18.8081C22.2975 18.7018 22.8162 18.7406 23.2934 18.92C24.5031 19.3714 25.76 19.6845 27.0401 19.8533C27.6878 19.9447 28.2793 20.2709 28.7021 20.77C29.125 21.269 29.3496 21.9061 29.3334 22.56Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                  </svg>
                  <a href="tel:" className="footer-white">
                    +385 1 234 567
                  </a>
                </div>
                <div className="footer-mail">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3332 7.99992C29.3332 6.53325 28.1332 5.33325 26.6665 5.33325H5.33317C3.8665 5.33325 2.6665 6.53325 2.6665 7.99992M29.3332 7.99992V23.9999C29.3332 25.4666 28.1332 26.6666 26.6665 26.6666H5.33317C3.8665 26.6666 2.6665 25.4666 2.6665 23.9999V7.99992M29.3332 7.99992L15.9998 17.3333L2.6665 7.99992" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="white" />
                  </svg>
                  <a href="mailto:" className="footer-white">
                    info@company.com
                  </a>
                </div>
              </div>
              <div className="col-md-4 mt-4 mt-md-0">
                <p className="fw-bold text-uppercase pb-2">Društvene mreže</p>
                <div className="social-media-footer py-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.9999 2.6665H19.9999C18.2318 2.6665 16.5361 3.36888 15.2859 4.61913C14.0356 5.86937 13.3333 7.56506 13.3333 9.33317V13.3332H9.33325V18.6665H13.3333V29.3332H18.6666V18.6665H22.6666L23.9999 13.3332H18.6666V9.33317C18.6666 8.97955 18.8071 8.64041 19.0571 8.39036C19.3072 8.14031 19.6463 7.99984 19.9999 7.99984H23.9999V2.6665Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="white"/>
                  </svg>
                  <a href="" className="footer-white">Facebook</a>
                </div>
                <div className="social-media-footer py-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3334 8.6665H23.3468M9.33342 2.6665H22.6667C26.3486 2.6665 29.3334 5.65127 29.3334 9.33317V22.6665C29.3334 26.3484 26.3486 29.3332 22.6667 29.3332H9.33342C5.65152 29.3332 2.66675 26.3484 2.66675 22.6665V9.33317C2.66675 5.65127 5.65152 2.6665 9.33342 2.6665ZM21.3334 15.1598C21.498 16.2695 21.3084 17.4028 20.7918 18.3985C20.2751 19.3943 19.4576 20.2017 18.4556 20.7061C17.4536 21.2104 16.318 21.386 15.2105 21.2077C14.1029 21.0295 13.0798 20.5066 12.2865 19.7134C11.4933 18.9202 10.9704 17.897 10.7922 16.7895C10.614 15.6819 10.7895 14.5464 11.2938 13.5443C11.7982 12.5423 12.6057 11.7248 13.6014 11.2082C14.5971 10.6915 15.7304 10.502 16.8401 10.6665C17.972 10.8344 19.0199 11.3618 19.829 12.1709C20.6381 12.98 21.1656 14.0279 21.3334 15.1598Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="white"/>
                  </svg>
                  <a href="" className="footer-white">Instagram</a>
                </div>
                <div className="social-media-footer py-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_25_139)">
                      <path d="M30.0533 8.56016C29.8949 7.92738 29.5723 7.34759 29.1182 6.87937C28.664 6.41115 28.0943 6.07108 27.4666 5.8935C25.1733 5.3335 15.9999 5.3335 15.9999 5.3335C15.9999 5.3335 6.82662 5.3335 4.53328 5.94683C3.90561 6.12441 3.33592 6.46448 2.88174 6.9327C2.42757 7.40093 2.105 7.98071 1.94662 8.6135C1.5269 10.9409 1.3216 13.3019 1.33328 15.6668C1.31832 18.0496 1.52364 20.4286 1.94662 22.7735C2.12123 23.3866 2.45102 23.9444 2.90414 24.3928C3.35726 24.8412 3.91838 25.1652 4.53328 25.3335C6.82662 25.9468 15.9999 25.9468 15.9999 25.9468C15.9999 25.9468 25.1733 25.9468 27.4666 25.3335C28.0943 25.1559 28.664 24.8158 29.1182 24.3476C29.5723 23.8794 29.8949 23.2996 30.0533 22.6668C30.4698 20.3569 30.6751 18.0139 30.6666 15.6668C30.6816 13.2841 30.4763 10.9051 30.0533 8.56016ZM12.9999 20.0268L20.6666 15.6668L12.9999 11.3068V20.0268Z" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_25_139">
                        <rect width="32" height="32" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <a href="" className="footer-white">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
    )
}

export default PublicFooter
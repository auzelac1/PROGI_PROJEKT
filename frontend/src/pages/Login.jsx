function Login() {

    function LoginUser() {
        // Ispravljen port na 8000 i točna backend ruta /auth/login/google
        window.location.href = 'http://localhost:8000/auth/login/google';
    }
    
    return (
        <div className="login-page">
            <div className="login-container text-center poppins">
                    <h1 className="syncopate fw-bold">Prijava</h1>
                    <hr className="divider" />
                <button className="button button-primary mt-3" onClick={LoginUser}>
                    <img src="src/assets/google-icon.png" alt="" height="30px" />
                    Prijavi se s Googleom
                </button>
            </div>
        </div>
    )

}

export default Login
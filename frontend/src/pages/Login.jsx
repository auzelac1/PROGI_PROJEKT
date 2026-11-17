import { useStyles } from '../useStyles';
import styleCss from '../style.css?url';
import '../style.css'

function Login() {
    useStyles(styleCss);

    function LoginUser() {
        window.location.href = 'http://localhost:3000/auth/google';
    }
    
    return (
        <div id="styleCss">
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
        </div>
    )

}

export default Login
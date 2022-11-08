import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {

    const navigate = useNavigate();

    return (
        <div className="login-main">
            <div className='login-main-form'>
                <div className='login-main-form-padding base-form'>
                    <div className="logo-middle"><img src='./logotype.svg' /></div>
                    <div className='login-mar'>
                        <input placeholder='Login' type="text" />
                        <input placeholder='Password' type="password" />
                    </div>
                    <div className='button-section login-mar'>
                        <button onClick={() => navigate('/main')}  className='primary-button'>Login</button>
                        <button onClick={() => navigate('/register')} className='secondary-button'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

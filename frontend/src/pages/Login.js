import './login.css';

export function Login() {
    return (
        <div className="login-main">
            <div className='login-main-form'>
                <div className='login-main-form-padding base-form'>
                    <div>LOGOTYPE</div>
                    <input placeholder='Login' type="text" />
                    <input placeholder='Password' type="password" />
                    <div className='button-section'>
                        <button className='primary-button'>Login</button>
                        <button className='secondary-button'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

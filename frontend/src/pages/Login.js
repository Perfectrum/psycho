import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNullOrWhitespace } from "../utils/strings";
import * as connector from '../logic/connector';
import './login.css';

export function Login() {

    const navigate = useNavigate();

    const loginInput = createRef();
    const passwordInput = createRef();

    function login() {

        const values = {
            username : loginInput.current.value,
            password : passwordInput.current.value 
        };

        for (const valName in values) {
            if (isNullOrWhitespace(values[valName])) {
                return console.error("WHITESPACE FIELD!");
            }
        }

        connector.login(values)
            .then((res) => {
                if (!res) return console.error("ERROR!");
                navigate('/main');
            })
    }

    return (
        <div className="login-main">
            <div className='login-main-form'>
                <div className='login-main-form-padding base-form'>
                    <div className="logo-middle"><img src='./logotype.svg' /></div>
                    <div className='login-mar'>
                        <input ref={loginInput} placeholder='Login' type="text" />
                        <input ref={passwordInput} placeholder='Password' type="password" />
                    </div>
                    <div className='button-section login-mar'>
                        <button onClick={login}  className='primary-button'>Login</button>
                        <button onClick={() => navigate('/register')} className='secondary-button'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

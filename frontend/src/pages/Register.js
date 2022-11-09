import { createRef } from "react";
import { useNavigate } from "react-router-dom";
import { isNullOrWhitespace } from "../utils/strings";
import * as connector from '../logic/connector';
import "./register.css";

export function Register() {

    const navigate = useNavigate();

    const nameInput = createRef();
    const usernameInput = createRef();
    const passwordInput = createRef();
    const password2Input = createRef();

    function register() {
        const values = {
            name : nameInput.current.value,
            username : usernameInput.current.value,
            password : passwordInput.current.value,
            password2 : password2Input.current.value   
        };

        for (const valName in values) {
            if (isNullOrWhitespace(values[valName])) {
                return console.error("WHITESPACE FIELD!");
            }
        }

        connector.registerNewUser(values)
            .then((res) => {
                if (!res) return console.error("ERROR!");
                navigate('/');
            })
    }

    return (
        <div className="register-main">
            <div className='register-main-form'>
                <div className='register-main-form-padding base-form'>
                    <div className="logo-small"><img src='./logotype.svg' /></div>
                    <p>Welcome to our brand new cool application for time managment! Please answer theese simple questions below</p>
                    <div className="register-mar">
                        <input ref={nameInput} placeholder='Name' type="text" />
                        <input ref={usernameInput} placeholder='Username' type="text" />
                        <input ref={passwordInput} placeholder='Password' type="password" />
                        <input ref={password2Input} placeholder='Password again' type="password" />
                    </div>
                    <div className='button-section register-mar'>
                        <button onClick={register} className='primary-button'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

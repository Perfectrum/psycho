import "./register.css";

export function Register() {
    return (
        <div className="register-main">
            <div className='register-main-form'>
                <div className='register-main-form-padding base-form'>
                    <div className="logo-small"><img src='./logotype.svg' /></div>
                    <p>Welcome to our brand new cool application for time managment! Please answer theese simple questions below</p>
                    <div className="register-mar">
                        <input placeholder='Name' type="text" />
                        <input placeholder='Username' type="text" />
                        <input placeholder='Password' type="password" />
                        <input placeholder='Password again' type="password" />
                    </div>
                    <div className='button-section register-mar'>
                        <button className='primary-button'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

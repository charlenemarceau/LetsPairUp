import React, { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

// configuration of modals to whether log in or sign up
function Log( props ) {
    const [RegisterModal, setRegisterModal] = useState(props.register);
    const [LogInModal, setLogInModal] = useState(props.login);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setLogInModal(false);
            setRegisterModal(true);
        } else if (e.target.id === "login") {
            setLogInModal(true);
            setRegisterModal(false);
        }
    }

    return (
        <div className="connection-form">
            <div className="container-form">
                <ul>
                    <li onClick={handleModals} id="register" className={RegisterModal ? "active-btn" : null}>Sign Up</li>
                    <li onClick={handleModals} id="login" className={LogInModal ? "active-btn" : null}>Log In</li>
                </ul>
                {RegisterModal && <Register />}
                {LogInModal && <Login />}
            </div>
        </div>
    );
};

export default Log;

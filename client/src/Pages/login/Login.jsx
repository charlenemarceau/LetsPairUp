import "./login.css";
import {useRef, useContext} from 'react';
import {loginCall} from "../../apiCalls";
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext)


  const handleClick = (e) => {
    e.preventDefault()
    loginCall({email:email.current.value, password:password.current.value}, dispatch);
  };
  
  return (
    <div className="login">
          {/* <div className="AppName">
            <h3 className="loginName">Let's Pair Up</h3>
          </div> */}
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src="/assets/surface1.png" alt="" />
          <span className="loginDesc">
          Une application qui te permet de rencontrer des Au Pairs francophones aux Etats-Unis.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
            <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
            <button className="loginButton"type="submit" disabled={isFetching}>{isFetching ? (<CircularProgress color="white" size="18px"/> ): ("Se connecter")}</button>
            <span className="loginForgot">Mot de passe oublié ?</span>
            <button className="loginRegisterButton">
            {isFetching ? (<CircularProgress color="white" size="18px"/> ): ("Crée un compte")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
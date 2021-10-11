import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from 'react-router'

export default function Register() {
  const username = useRef();
  const email = useRef();
  const city = useRef();
  const arrivedDate = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()
    if(passwordConfirmation.current.value !== password.current.value) {
      passwordConfirmation.current.setCustomValidity("Les mots de passes ne correspondent pas")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
        history.push("/login")
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src="/assets/surface1.png" alt="" />
          <span className="loginDesc">
          Une application qui te permet de rencontrer des Au Pairs francophones aux Etats-Unis.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBoxRegister" onSubmit={handleClick}>
            <input placeholder="Prénom" required className="loginInputRegister" ref={username}/>
            <input placeholder="Email" type="email" required className="loginInputRegister" ref={email}/>
            <input placeholder="Ville d'accueil aux Etats-Unis" type="text" required className="loginInputRegister" ref={city}/>
            <input placeholder="Date d'arrivé aux Etats-Unis" type="date" required className="loginInputRegister" ref={arrivedDate}/>
            <input placeholder="Mot de passe" type="password" required minLength="6"className="loginInputRegister" ref={password}/>
            <input placeholder="Confirmer mot de passe" type="password" required className="loginInputRegister" ref={passwordConfirmation}/>
            <button className="loginButton" type="submit">S'inscrire</button>
            <button className="loginRegisterButton">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
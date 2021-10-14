import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const age = useRef();
  const avatar = useRef();
  const city = useRef();
  const from = useRef();
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
        avatar: avatar.current.value,
        city: city.current.value,
        from: from.current.value,
        age: age.current.value,
        arrivedDate: arrivedDate.current.value,
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
    <div className="loginRegister">
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
            <input placeholder="D'où venez vous ?" type="text" required className="loginInputRegister" ref={from}/>
            <input placeholder="Votre âge" type="number" min="18" required className="loginInputRegister" ref={age}/>
            <input placeholder="Date d'arrivé aux Etats-Unis" type="date" required className="loginInputRegister" ref={arrivedDate}/>
            <input placeholder="Mot de passe" type="password" required minLength="6"className="loginInputRegister" ref={password}/>
            <input placeholder="Confirmer mot de passe" type="password" required className="loginInputRegister" ref={passwordConfirmation}/>
            <button className="loginButton" type="submit">S'inscrire</button>
            <Link to="/login">
              <button className="loginRegisterButton"> Se connecter </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
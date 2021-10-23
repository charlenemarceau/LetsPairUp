import axios from "axios";
import { useState } from "react";
import "./register.css";
import { Link } from 'react-router-dom';
import Login from "../Login/Login";

export default function Register() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(''); 
  const [city, setCity] = useState(''); 
  const [from, setFrom] = useState(''); 
  const [arrivedDate, setArrivedDate] = useState(''); 
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();
      const terms = document.getElementById("terms");
      const usernameError = document.querySelector(".username.error");
      const emailError = document.querySelector(".email.error");
      const ageError = document.querySelector(".age.error");
      const passwordError = document.querySelector(".password.error");
      const passwordConfirmError = document.querySelector(
        ".password-confirm.error"
  );
  const termsError = document.querySelector(".terms.error");

  passwordConfirmError.innerHTML = "";
  termsError.innerHTML = "";

  if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword) {
      passwordConfirmError.innerHTML =
        "Les mots de passes ne sont pas identiques"; 
      } 
      if (!age) {
      ageError.innerHTML = "Vous devez sélectionner un âge";
      } 
      if (!terms.checked) {
          termsError.innerHTML = "Les conditions générales doivent être acceptées.";
      }
  } else {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/register`,
      data: {
        username,
        email,
        password,
        age,
        city,
        from,
        arrivedDate,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          usernameError.innerHTML = res.data.errors.username;
          emailError.innerHTML = res.data.errors.email;
          ageError.innerHTML = res.data.errors.dateOfBirth;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  }
};

  return (
    <>
    { formSubmit ? (
      <>
      
      < Login />
      <h4 className="success">Votre profil a bien été crée. Vous pouvez dés à présent vous connecter.</h4>
      
      </>
    ) : (
    <div className="loginRegister">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src="/assets/surface1.png" alt="" />
          <span className="loginDesc">
          Une application qui te permet de rencontrer des Au Pairs francophones aux Etats-Unis.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBoxRegister" onSubmit={handleRegister}>
            <h3 className="AuthTitle">Inscription</h3>
            <input placeholder="Nom d'utilisateur" required className="loginInputRegister"id="username"
             onChange={(e) => setUsername(e.target.value)} value={username}/>
            <div className="pseudo error"></div>
            <input placeholder="Email" type="email" required className="loginInputRegister" id="email"
             onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="email error"></div>
            <input placeholder="Ville d'accueil aux Etats-Unis" type="text" required className="loginInputRegister"
             onChange={(e) => setCity(e.target.value)} value={city}/>
            <input placeholder="D'où venez vous ?" type="text" required className="loginInputRegister"
             onChange={(e) => setFrom(e.target.value)} value={from}/>
            <input placeholder="Votre âge" type="number" min="18" required className="loginInputRegister"
             onChange={(e) => setAge(e.target.value)} value={age}/>
            <div className="age error"></div>
            <input placeholder="Date d'arrivé aux Etats-Unis" type="date" required className="loginInputRegister"
              onChange={(e) => setArrivedDate(e.target.value)} value={arrivedDate}/>
            <input placeholder="Mot de passe" type="password" required minLength="6" className="loginInputRegister" 
            onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className="password error"></div>
            <input placeholder="Confirmer mot de passe" type="password" required className="loginInputRegister" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
            <div className="password-confirm error"></div>
            <br />
            <div className="terms">
            <input type="checkbox" id="terms" className="termsLabel"/>
            <label htmlFor="terms" className="termsLabel">
            &ensp;J'accepte les&nbsp;
              <a href="/" target="_blank" rel="noopener noreferrer" className='termsLink'>
                 conditions générales
              </a>
            </label>
            <div className="terms error"></div>

            </div>
            <br />
            <button className="loginButton" type="submit">S'inscrire</button>
            <Link to="/login">
              <button className="loginRegisterButton"> Se connecter </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
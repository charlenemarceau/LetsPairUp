import "./login.css";
import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <form className="loginBox" onSubmit={handleLogin}>
            <h3 className="AuthTitle">Se connecter</h3>
            <input placeholder="Email" type="email" required className="loginInput" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <div className="email error"></div>
            <input placeholder="Password" type="password" required minLength="6" className="loginInput" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <div className="password error"></div>
            <button className="loginButton"type="submit">Se connecter</button>
            <span className="loginForgot">Mot de passe oublié ?</span>
            <Link to="/register">
            <button className="loginRegisterButton">
            Crée un compte
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
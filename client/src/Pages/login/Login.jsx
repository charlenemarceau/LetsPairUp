import "./login.css";

export default function Login() {
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
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Se connecter</button>
            <span className="loginForgot">Mot de passe oublié ?</span>
            <button className="loginRegisterButton">
              Crée un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
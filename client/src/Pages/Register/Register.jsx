import "./register.css";

export default function Register() {
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
            <input placeholder="Prénom" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Mot de passe" className="loginInput" />
            <input placeholder="Confirmer mot de passe" className="loginInput" />
            <button className="loginButton">S'inscrire</button>
            <button className="loginRegisterButton">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
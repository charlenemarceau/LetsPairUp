import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user} = useContext(AuthContext);
  return (
      <Router>
        <Switch>
          <Route exact path="/"> 
          {/*if user is connected, app will go to homepage. If not connected, app will go to register page*/}
            {user ? <Home/> : <Register/>}
          </Route>
          <Route path="/login">
          {/*if user is connected, app will go to homepage. If not connected, app will go to login page*/}
            {user ? <Redirect to ="/"/> : <Login/>}
          </Route>
          <Route path="/register">
          {/*if user is connected, app will go to homepage. If not connected, app will go to register page*/}
            {user ? <Redirect to ="/"/> : <Register/>}
          </Route>
          <Route path="/profile/:username">
            <Profile/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;

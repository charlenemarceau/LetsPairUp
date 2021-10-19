import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Map from "./Pages/Map/Map";
import Question from './Pages/Questions/Questions';
// import { AuthContext } from "./context/AuthContext";

function App() {

  // const {user} = useContext(AuthContext);
  return (
      <Router>
        <Switch>
          <Route exact path="/"> 
          <Home/>
          {/*if user is connected, app will go to homepage. If not connected, app will go to register page*/}
            {/* {user ? <Home/> : <Register/>} */}
          </Route>
          <Route path="/login">
          {/*if user is connected, app will go to homepage. If not connected, app will go to login page*/}
            {/* {user ? <Redirect to ="/"/> : <Login/>} */}
            <Login/>
          </Route>
          <Route path="/register">
          {/*if user is connected, app will go to homepage. If not connected, app will go to register page*/}
            {/* {user ? <Redirect to ="/"/> : <Register/>} */}
            <Register/>
          </Route>
          <Route path="/profile/:username">
            <Profile/>
          </Route>
          <Route path="/map">
            <Map/>
          </Route>
          <Route path="/questions">
            <Question/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;

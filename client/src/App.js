import React, { useState, useDispatch, useEffect } from "react";
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
import { UidContext } from './components/AppContext';
import axios from "axios";


function App() {
  const [uid, setUid] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
      methods: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      setUid(res.data);
    }) 
    .catch((err) => console.log("No token  "+ err ));
    }
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        {!uid ? (
        <Route path="/login">
            <Login/>
          </Route>) : (
            <>
            <Switch>
          <Route exact path="/"> 
          <Home/>
          </Route>
          <Route path="/register">
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
          <Redirect to='/login'/>
        </Switch>
            </>)}
      </Router>
    </UidContext.Provider>
  );
}

export default App;

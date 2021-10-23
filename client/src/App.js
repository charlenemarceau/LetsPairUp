import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Map from "./Pages/Map/Map";
import Question from './Pages/Questions/Questions';
import { useDispatch } from 'react-redux';
import { UidContext } from './components/AppContext';
import axios from "axios";
import { getUser } from "./actions/user.actions";


function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); // dispatch will start the action and will get the datas

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
      methods: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
    .then((res) => {
      // console.log(res);
      setUid(res.data);
    }) 
    .catch((err) => console.log("No token  "+ err ));
    }
    fetchToken();
    if (uid) {
      dispatch(getUser(uid)) // to get the user data 
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        {!uid ? (
        <>
          <Redirect exact from="/" to="/login"/>
          <Route path="/login">
              <Login/>
          </Route>
          <Route path="/register">
              <Register/>
          </Route>
        </>
          ) : (
        <>
          <Redirect exact from="/" to="/home"/>
            <Route path="/home">
              <Home/>
            </Route>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
          </Switch>
          <Route path="/profile/:username">
            <Profile/>
          </Route>
          <Route path="/map">
            <Map/>
          </Route>
          <Route path="/questions">
            <Question/>
          </Route>
          <Switch/>
        </>)}
      </Router>
    </UidContext.Provider>
  );
}

export default App;

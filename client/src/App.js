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
          <>
          <Switch>
            {!uid ? (
              <>
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/></>
            ) : ( 
              <>
              <Route path="/" exact component={Home} />
              <Route path="/profil" exact component={Profile} />
              <Route path="/map" exact component={Map} />
              <Route path="/questions" exact component={Question} /></>
            )}
            <Redirect to="/" />
          </Switch>
          </>
      </Router>
    </UidContext.Provider>
  );
}

export default App;

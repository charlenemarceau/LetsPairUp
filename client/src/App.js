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
import Questions from './Pages/Questions/Questions';
import { useDispatch } from 'react-redux';
import { UidContext } from './components/AppContext';
import axios from "axios";
import { getUser } from "./actions/user.actions";
import Advice from "./Pages/Advice/Advice";


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
            {/** check if user is connected. User can't access the app if not connected */}
            {!uid ? (
              <>
              <Route path="/" exact component={Login} />
              <Route path="/login" exact component={Login}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/conseils" exact component={Advice} />
              <Route path="/questions" exact component={Login} />
              <Route path="/map" exact component={Login} />
              <Route path="/profil:username" exact component={Login} />
              </>
            ) : ( 
              <>
              <Route path="/" exact component={Home} />
              <Route path="/profil:username" exact component={Profile} />
              <Route path="/map" exact component={Map} />
              <Route path="/questions" exact component={Questions} />
              <Route path="/conseils" exact component={Advice} />
              </>
            )}
            <Redirect to="/" />
          </Switch>
          </>
      </Router>
    </UidContext.Provider>
  );
}

export default App;

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import { UidContext } from '../../components/AppContext';
import Log from '../../components/log';



export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const uid = useContext(UidContext);


  useEffect (() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data)
    };
    fetchUser();
}, [username])
  
  return (
    <>
      { uid ? (
      <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div className="profileCoverImg">
              <img className="profileUserImg" src={user.avatar ? PF + user.avatar : PF + "random-user.jpg"} alt=""/>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.bio}</span>
            </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div> 
      </div>
      </>
      ) : (
        <>
         <Log login={false} register={true}/> 
        </>
      )}
    </>
  );
}
import React, {useState, useEffect } from 'react';
import './rightbar.css';
import Follow from '../follow/Follow';
import { dateParser } from '../../Utils';
import { useSelector } from "react-redux";
import FriendsHint from '../friendsHint/FriendsHint';
import axios from 'axios';
import { useParams } from "react-router";



export default function ProfilInfoOther() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  

    return (
      <>
        <h4 className="rightbarTitle">Informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville au USA:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville en France:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age</span>
            <span className="rightbarInfoValue">{user.age}</span>
          </div>
        </div>
        <div className="rightbarFollowings">
            < Follow />
            < FriendsHint />
        </div>
      </>
    );
};

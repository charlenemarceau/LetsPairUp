import React, {useContext, useEffect, useState} from 'react';
import './rightbar.css';
import Follow from '../follow/Follow';
import { dateParser } from '../../Utils';
import axios from "axios";
import {Link} from 'react-router-dom';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { useSelector } from "react-redux";
import { UidContext } from '../../components/AppContext';


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userData = useSelector((state) => state.userReducer)
  const uid = useContext(UidContext);
  
    const HomeRightbar = () => {
    return (
      <>
      {/* <div className="mapContainer">
        <Map />
      </div> */}
      </>
    );
}

const ProfileRightbar = () => {

    return (
      <>
      {/* {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleFollow}>
          {isFollowed ? "Ne plus suivre" : "Suivre"}
          {isFollowed ? < RemoveCircle /> : < AddCircle />}
        </button>
      )} */}
        <h4 className="rightbarTitle">Informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville au USA:</span>
            <span className="rightbarInfoValue">{userData.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville en France:</span>
            <span className="rightbarInfoValue">{userData.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Arrivé.e aux USA :</span>
            <span className="rightbarInfoValue">{ dateParser(userData.arrivedDate)}</span>
          </div>
        </div>
        
        <div className="rightbarFollowings">
            < Follow />
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {uid ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
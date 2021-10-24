import React from 'react';
import './rightbar.css';
import Follow from '../follow/Follow';
import { dateParser } from '../../Utils';
import { useSelector } from "react-redux";
import FriendsHint from '../friendsHint/FriendsHint'

export default function RightbarProfil() {
  const userData = useSelector((state) => state.userReducer);
  
    return (
      <>
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
            < FriendsHint />
        </div>
      </>
    );
  };

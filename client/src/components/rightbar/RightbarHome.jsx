import React from 'react';
import './rightbar.css';
import { useSelector } from "react-redux";
import FriendsHint from '../friendsHint/FriendsHint';
import Trend from '../trend/Trend';

export default function RightbarHome() {
  const userData = useSelector((state) => state.userReducer);
  
    return (
      <>
        <div className="rightbar">
          < Trend />
          < FriendsHint />
        </div>
      </>
    );
  };

import React, { useContext } from 'react';
import "./topbar.css"
import {AccountCircleOutlined, ChatOutlined, Notifications} from '@material-ui/icons';
import {NavLink} from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const uid = useContext(UidContext); // get the context
  const userData = useSelector((state) => state.userReducer); // get the data from the userReducer

    return (
      <>
      {uid ? (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <img className="logoImg" src="/assets/logo-letspairup.png" alt="" />
                <NavLink to="/" style={{textDecoration:"none"}}>
                  <span className="logo">Let's Pair Up</span>
                </NavLink>
            </div>
            <div className="topbarCenter">
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                  <div className="topbarIconItem">
                    <AccountCircleOutlined/>
                    <span className="topbarIconBadge">1</span>
                  </div>
                  <div className="topbarIconItem">
                    < ChatOutlined />
                    <span className="topbarIconBadge">2</span>
                  </div>
                  <div className="topbarIconItem">
                    <Notifications />
                    <span className="topbarIconBadge">1</span>
                  </div>
                </div>
                <NavLink to={`/profile/${userData.username}`}>
                <img src={userData.avatar ? PF + userData.avatar : PF + "random-user.jpg"} alt="" className='topbarImg' />
                </NavLink>
                <Logout/>
            </div>
            </div>
            ) : (
            <div className='topbarContainer'>
            <div className="topbarLeft">
                <img className="logoImg" src="/assets/logo-letspairup.png" alt="" />
                <NavLink to="/" style={{textDecoration:"none"}}>
                  <span className="logo">Let's Pair Up</span>
                </NavLink>
            </div>
            </div>
            )}
    </>
    )
}

export default Topbar

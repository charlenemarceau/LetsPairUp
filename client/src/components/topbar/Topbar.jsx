import React, { useContext } from 'react';
import "./topbar.css"
import {AccountCircleOutlined, ChatOutlined, Notifications} from '@material-ui/icons';
import {NavLink} from "react-router-dom";
import { UidContext } from "../AppContext";
import Logout from '../Logout/Logout';

function Topbar() {
  const uid = useContext(UidContext)

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
                <NavLink to={`/profile/`}>
                {/* <img src={user.avatar ? PF + user.avatar : PF + "random-user.jpg"} alt="" className='topbarImg' /> */}
                Valeur dynamique
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

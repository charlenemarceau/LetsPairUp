import React, { useContext } from 'react';
import "./topbar.css"
import {Search, AccountCircleOutlined, ChatOutlined, Notifications} from '@material-ui/icons';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function Topbar() {
  // use of the context to get the user
  const {user} = useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <img className="logoImg" src="/assets/logo-letspairup.png" alt="" />
                <Link to="/" style={{textDecoration:"none"}}>
                  <span className="logo">Let's Pair Up</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input placeholder='Rechercher un.e ami.e ou un post' className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                  <span className="topbarLink">Homepage</span>
                  <span className="topbarLink">Timeline</span>
                </div>
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
                <Link to={`/profile/${user.username}`}>
                <img src={user.avatar ? PF + user.avatar : PF + "random-user.jpg"} alt="" className='topbarImg' />
                </Link>
            </div>
        </div>
    )
}

export default Topbar

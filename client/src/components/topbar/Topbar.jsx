import React from 'react';
import "./topbar.css"
import {Search, AccountCircleOutlined, ChatOutlined, Notifications} from '@material-ui/icons';


function Topbar() {
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <img className="logoImg" src="/assets/logo-letspairup.png" alt="" />
                <span className="logo">Let's Pair Up</span>
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
                <img src="/assets/random-user.jpg" alt="" className='topbarImg' />
            </div>
        </div>
    )
}

export default Topbar

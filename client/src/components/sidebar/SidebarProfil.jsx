import React, {useContext} from 'react';
import './sidebar.css';
import { HelpOutlineOutlined, CardTravelOutlined, PersonOutlineOutlined, ChatOutlined, MapOutlined, InfoOutlined } from '@material-ui/icons';
import {Link} from "react-router-dom";
import { UidContext } from "../AppContext";
import { useSelector } from 'react-redux';
import Trend from '../trend/Trend';

function SidebarProfil() {
    const uid = useContext(UidContext); // get the context
    const userData = useSelector((state) => state.userReducer); // get the data from the userReducer
  
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    { uid ? (
                    <li className="sidebarListItem">
                        < PersonOutlineOutlined className='sidebarIcon' />
                        <Link to={`/profile/${userData.username}`} style={{textDecoration:"none"}}>
                            <span className="sidebarListItemText">Profil</span>
                        </Link>
                    </li>
                    ) : (
                    <li className="sidebarListItem">
                    < PersonOutlineOutlined className='sidebarIcon' />
                    <Link to={`/login`} style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Profil</span>
                    </Link>
                    </li>
                    )}
                    <li className="sidebarListItem">
                        < ChatOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Messages</span>
                    </li>
                    <li className="sidebarListItem">
                        < HelpOutlineOutlined className='sidebarIcon' />
                        <Link to="/questions" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Le coin questions</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        < MapOutlined className='sidebarIcon' />
                        <Link to="/map" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Carte des Au Pairs</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        < InfoOutlined className='sidebarIcon' />
                        <Link to="/Advice" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Les conseils</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        < CardTravelOutlined className='sidebarIcon' />
                        <Link to="/travel" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Invitations voyages</span>
                        </Link>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                    <div className="trendingWrapper">
                        <Trend />
                    </div>
            </div>
        </div>
    )
}

export default SidebarProfil;

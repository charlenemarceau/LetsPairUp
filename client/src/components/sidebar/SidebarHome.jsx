import React, {useContext} from 'react';
import './sidebar.css';
import { HelpOutlineOutlined, CardTravelOutlined, PersonOutlineOutlined, ChatOutlined, MapOutlined, InfoOutlined } from '@material-ui/icons';
import {NavLink} from "react-router-dom";
import { UidContext } from "../AppContext";
// import { useSelector } from 'react-redux';
import Follow from '../follow/Follow';

function SidebarHome() {
    const uid = useContext(UidContext); // get the context
    // const userData = useSelector((state) => state.userReducer); // get the data from the userReducer
  
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    { uid ? (
                    <li className="sidebarListItem">
                        < PersonOutlineOutlined className='sidebarIcon' />
                        <NavLink exact to="/profil" style={{textDecoration:"none"}}>
                            <span className="sidebarListItemText">Profil</span>
                        </NavLink>
                    </li>
                    ) : (
                    <li className="sidebarListItem">
                    < PersonOutlineOutlined className='sidebarIcon' />
                    <NavLink to={`/login`} style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Profil</span>
                    </NavLink>
                    </li>
                    )}
                    <li className="sidebarListItem">
                        < ChatOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Messages</span>
                    </li>
                    <li className="sidebarListItem">
                        < HelpOutlineOutlined className='sidebarIcon' />
                        <NavLink to="/questions" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Le coin questions</span>
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        < MapOutlined className='sidebarIcon' />
                        <NavLink to="/map" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Carte des Au Pairs</span>
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        < InfoOutlined className='sidebarIcon' />
                        <NavLink to="/Advice" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Les conseils</span>
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        < CardTravelOutlined className='sidebarIcon' />
                        <NavLink to="/travel" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Invitations voyages</span>
                        </NavLink>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                    <div className="followWrapper">
                        < Follow />
                    </div>
            </div>
        </div>
    )
}

export default SidebarHome;

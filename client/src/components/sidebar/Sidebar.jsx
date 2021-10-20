import React from 'react';
import './sidebar.css';
import { HelpOutlineOutlined, CardTravelOutlined, PersonOutlineOutlined, ChatOutlined, MapOutlined } from '@material-ui/icons';
import { Users } from "../../dummyData";
import Followings from '../followers/Followings';
import {Link} from "react-router-dom";
// import {AuthContext} from "../../context/AuthContext";



function Sidebar() {
     // use of the context to get the user
//   const {user} = useContext(AuthContext); 
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        < PersonOutlineOutlined className='sidebarIcon' />
                        {/* <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}> */}
                            <span className="sidebarListItemText">Profil</span>
                        {/* </Link> */}
                    </li>
                    <li className="sidebarListItem">
                        < ChatOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Messages</span>
                    </li>
                    <li className="sidebarListItem">
                        < HelpOutlineOutlined className='sidebarIcon' />
                        <Link to="/questions" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Questions</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        < MapOutlined className='sidebarIcon' />
                        <Link to="/map" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Carte des Au Pairs</span>
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
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <Followings key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar

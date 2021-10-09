import React from 'react';
import './sidebar.css';
import { RssFeedOutlined, HelpOutlineOutlined, EventOutlined, CardTravelOutlined, PersonOutlineOutlined, ChatOutlined } from '@material-ui/icons';
import { Users } from "../../dummyData";
import Followings from '../followers/Followings';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        < RssFeedOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Timeline</span>
                    </li>
                    <li className="sidebarListItem">
                        < PersonOutlineOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Profil</span>
                    </li>
                    <li className="sidebarListItem">
                        < ChatOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Messages</span>
                    </li>
                    <li className="sidebarListItem">
                        < HelpOutlineOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        < EventOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Evenements</span>
                    </li>
                    <li className="sidebarListItem">
                        < CardTravelOutlined className='sidebarIcon' />
                        <span className="sidebarListItemText">Invitations voyages</span>
                    </li>
                </ul>
                <button className="sidebarButton">Voir plus</button>
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

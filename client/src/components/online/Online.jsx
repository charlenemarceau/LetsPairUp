import React from 'react'
import './online.css'

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online

import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './follow.css';
import { useSelector } from "react-redux";
import { CloseOutlined } from '@material-ui/icons';
import FollowHandler from '../followHandler/FollowHandler';

function Follow() {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='followContainer'>
            <h3 className="rightbarTitle">Abonnements</h3>
            <h4 onClick={() => setFollowingPopup(true) & setFollowersPopup(false)}>Abonnements : {userData.following ? userData.following.length - 1: "0"}</h4>
            <h4 onClick={() => setFollowersPopup(true) & setFollowingPopup(false)}>Abonnés : {userData.followers ? userData.followers.length - 1: "0"}</h4>

            {followingPopup && 
                <div className="popup-profil-container">
                    <div className="modal">
                        <h2>Followings</h2>
                        <span className="cross" onClick={() => setFollowingPopup(false)}>< CloseOutlined /></span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 1; i < userData.following.length; i++) {
                                    if (user._id === userData.following[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img className="user-avatar" src={user.avatar ? PF + user.avatar : PF + "random-user.jpg"} alt=""/>
                                                <h3>{user.username}</h3>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow={user._id} type={"suggestion"}/>
                                                </div>
                                            </li>
                                        )
                                    } 
                                
                                }return null;
                            })}
                        </ul>
                    </div>
                </div>
                    }
                 {followersPopup && 
                <div className="popup-profil-container">
                    <div className="modal">
                        <h2>Followers</h2>
                        <span className="cross" onClick={() => setFollowersPopup(false)}>< CloseOutlined /></span>
                        <ul>
                            {usersData.map((user) => {
                                for (let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return (
                                            <li key={user._id}>
                                                <img className="user-avatar" src={user.avatar ? PF + user.avatar : PF + "random-user.jpg"} alt=""/>
                                                <h3>{user.username}</h3>
                                                <div className="follow-handler">
                                                <FollowHandler idToFollow={user._id} type={"suggestion"}/>
                                                </div>
                                            </li>
                                        );
                                    }
                                } return null;
                            })}
                        </ul>
                    </div>
                </div>
                    }
        </div>
    )
}

export default Follow

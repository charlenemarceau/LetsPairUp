import React, {useContext, useEffect, useState} from 'react';
import './rightbar.css';
// import { Users } from "../../dummyData";
// import Online from '../online/Online';
import { dateParser } from '../../Utils';
import axios from "axios";
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AddCircle, RemoveCircle } from '@material-ui/icons';


export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user:currentUser, dispatch} = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState(currentUser.following?.includes(user?._id));
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
          try {
              const friendList = await axios.get("/users/friends/" + user._id);
              setFriends(friendList.data);
          } catch (err) {
            console.log(err)
          }
      }
      getFriends();
    }, [user])

    const handleFollow = async () => {
      try {
        if (isFollowed) {
          await axios.put(`/users/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`/users/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
        setIsFollowed(!isFollowed);
      } catch (err) {
      }
    };


    const HomeRightbar = () => {
    return (
      <>
      {/* <div className="mapContainer">
        <Map />
      </div> */}
      </>
    );
}

const ProfileRightbar = () => {

    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleFollow}>
          {isFollowed ? "Ne plus suivre" : "Suivre"}
          {isFollowed ? < RemoveCircle /> : < AddCircle />}
        </button>
      )}
        <h4 className="rightbarTitle">Informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville au USA:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville en France:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Arrivé.e aux USA :</span>
            <span className="rightbarInfoValue">{ dateParser(user.arrivedDate)}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Abonnements</h4>
        <div className="rightbarFollowings">
            {friends.map((friend) => (
          <div className="rightbarFollowing">
            <Link to={`/profile/${friend.username}`}>
            <img src={friend.avatar ? PF+friend.avatar : PF + "random-user.jpg"} alt="" className="rightbarFollowingImg" />
            </ Link >
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
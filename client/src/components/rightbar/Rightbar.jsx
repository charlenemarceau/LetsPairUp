import React from 'react';
import './rightbar.css';
import { Users } from "../../dummyData";
import Online from '../online/Online';


export default function Rightbar({ profile }) {
    const HomeRightbar = () => {
      return (
        <>
          <div className="birthdayContainer">
            <img className="birthdayImg" src="assets/random-user.jpg" alt="" />
            <span className="birthdayText">
              <b>Stef Deluca</b> et <b>4 autres</b> fêtent leurs anniversaires aujourd'hui
            </span>
          </div>
          <h4 className="rightbarTitle">Amies en ligne</h4>
          <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </>
      );
}

const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville au USA:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville en France:</span>
            <span className="rightbarInfoValue">Marseille</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Arrivé.e aux USA :</span>
            <span className="rightbarInfoValue">12 septembre</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/random-user.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
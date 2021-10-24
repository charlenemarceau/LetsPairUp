import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import SidebarProfil from "../../components/sidebar/SidebarProfil";
import React, {useState, useContext } from 'react';
import { useSelector } from "react-redux";
import { UidContext } from '../../components/AppContext';
import UpdateProfil from "../../components/profil/UpdateProfil";
import Thread from "../../components/thread/Thread";
import RightbarProfil from "../../components/rightbar/rightbarProfil";

export default function Profile() {
  const userData = useSelector((state) => state.userReducer)
  const uid = useContext(UidContext);
  const [updateProfilModal, setUpdateProfilModal] = useState(false);

  return (
    <>
      <Topbar />
      <div className="profile">
        <SidebarProfil />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div className="profileCoverImg">
              <img className="profileUserImg" src={userData.avatar} alt=""/>
            <div className="profileInfo">
                <h4 className="profileInfoName">{userData.username}</h4>
                <span className="profileInfoDesc">{userData.bio}</span>
                {uid === userData._id && (
                  <button className='changeProfilButton profile' onClick={() => setUpdateProfilModal(true)}>
                    Changer votre profil
                  </button> )}
                  { updateProfilModal && (
                    < UpdateProfil />
                  )}
            </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Thread username={userData.username}/>
            <div className="profilRight">
          < RightbarProfil />
          </div>
          </div>
        </div> 
          
      </div>
      </>
  );
}
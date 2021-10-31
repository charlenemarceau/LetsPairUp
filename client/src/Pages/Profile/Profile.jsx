import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import SidebarProfil from "../../components/sidebar/SidebarProfil";
import React, { useState, useContext, useEffect } from "react";
import { UidContext } from "../../components/AppContext";
import UpdateProfil from "../../components/profil/UpdateProfil";
import Thread from "../../components/thread/Thread";
import RightbarProfil from "../../components/rightbar/rightbarProfil";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector} from 'react-redux';


export default function AProfile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const userData = useSelector((state) => state.userReducer) // get user data
  const uid = useContext(UidContext);
  const [updateProfilModal, setUpdateProfilModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <SidebarProfil />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div className="profileCoverImg">
                <img className="profileUserImg" src={user.avatar} alt="" />
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.bio}</span>
                  {(uid === user._id || userData.isAdmin === true) && (
                    <button
                      className="changeProfilButton profile"
                      onClick={() => setUpdateProfilModal(true)}
                    >
                      Changer votre profil
                    </button>
                  )}
                  {updateProfilModal && <UpdateProfil />}
                </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Thread username={user.username} />
            <div className="profilRight">
              <RightbarProfil />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

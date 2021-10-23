import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import React, {useState} from 'react';
import { useSelector } from "react-redux";
// import { UidContext } from '../../components/AppContext';
import UpdateProfil from "../../components/profil/UpdateProfil";
import Thread from "../../components/thread/Thread";



export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userData = useSelector((state) => state.userReducer)
  // const uid = useContext(UidContext);
  const [updateProfilModal, setUpdateProfilModal] = useState(false);

  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <div className="profileCoverImg">
              <img className="profileUserImg" src={userData.avatar ? PF + userData.avatar : PF + "random-user.jpg"} alt=""/>
            <div className="profileInfo">
                <h4 className="profileInfoName">{userData.username}</h4>
                {/* <p>{errors.maxSize}</p>
                <p>{errors.format}</p> */}
                <span className="profileInfoDesc">{userData.bio}</span>
                <button className='changeProfilButton profile' onClick={() => setUpdateProfilModal(true)}>
                  Changer votre profil
                </button>
                { updateProfilModal && (
                  < UpdateProfil />
                )}
            </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Thread username={userData.username}/>
            <Rightbar/>
          </div>
        </div> 
      </div>
      </>
  );
}
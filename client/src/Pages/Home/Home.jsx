import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Thread from '../../components/thread/Thread';
import RightbarHome from '../../components/rightbar/RightbarHome';
import { useSelector } from "react-redux";
import SidebarHome from '../../components/sidebar/SidebarHome';
import './home.css';

function Home() {
  const userData = useSelector((state) => state.userReducer)
    return (
        <>
          <Topbar/>
          <div className="homeContainer">
            <SidebarHome/>
            <Thread username={userData.username}/>
            <RightbarHome />
          </div>
        </>
    )
}

export default Home

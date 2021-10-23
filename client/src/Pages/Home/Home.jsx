import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Thread from '../../components/thread/Thread';
import Rightbar from '../../components/rightbar/Rightbar';
import { useSelector } from "react-redux";

import './home.css';

function Home() {
  const userData = useSelector((state) => state.userReducer)
    return (
        <>
          <Topbar/>
          <div className="homeContainer">
            <Sidebar/>
            <Thread username={userData.username}/>
            <Rightbar />
          </div>
        </>
    )
}

export default Home
